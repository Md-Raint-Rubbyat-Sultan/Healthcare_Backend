import { excludedField } from "../constants/constants";

export class PrismaQueryBuilder<TWhere, TSelect, TOrderBy> {
  public where: TWhere | any = {};
  public select?: TSelect;
  public orderBy?: TOrderBy;
  public skip?: number;
  public take?: number;

  constructor(public readonly query: Record<string, string>) {}

  filter(): this {
    const filter = { ...this.query };

    for (const field of excludedField) {
      delete filter[field];
    }

    Object.keys(filter).forEach((key) => {
      this.where[key] = filter[key];
    });

    return this;
  }

  search(searchableFields: string[]): this {
    const searchTerm = this.query?.searchTerm;
    if (!searchTerm) return this;

    const orConditions: any[] = [];
    const relationMap: Record<string, any[]> = {};

    for (const field of searchableFields) {
      // relation field → doctor.name
      if (field.includes(".")) {
        const [relation, nestedField] = field.split(".");

        if (!relationMap[relation]) {
          relationMap[relation] = [];
        }

        relationMap[relation].push({
          [nestedField]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        });
      }
      // normal field → email
      else {
        orConditions.push({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        });
      }
    }

    // push relation ORs
    for (const relation in relationMap) {
      orConditions.push({
        [relation]: {
          OR: relationMap[relation],
        },
      });
    }

    this.where.OR = orConditions;
    return this;
  }

  sort(): this {
    const sort = this.query?.sort || "-createdAt";

    const orderBy = sort.startsWith("-")
      ? { [sort.slice(1)]: "desc" }
      : { [sort]: "asc" };

    this.orderBy = orderBy as TOrderBy;
    return this;
  }

  fields(): this {
    if (!this.query.fields) return this;

    this.select = this.query.fields.split(",").reduce((acc: any, field) => {
      acc[field] = true;
      return acc;
    }, {});

    return this;
  }

  paginate(): this {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;

    this.skip = (page - 1) * limit;
    this.take = limit;

    return this;
  }

  async getMeta(prismaModel: any) {
    const total = await prismaModel.count({
      where: this.where,
    });

    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;

    return {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    };
  }

  build() {
    return {
      where: this.where,
      select: this.select,
      orderBy: this.orderBy,
      skip: this.skip,
      take: this.take,
    };
  }
}
