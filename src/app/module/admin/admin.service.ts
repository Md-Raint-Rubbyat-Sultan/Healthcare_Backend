import { Request } from "express";
import { PrismaQueryBuilder } from "../../utils/queryBuilder";
import { Prisma } from "../../../../prisma/generated/prisma/client";
import { prisma } from "../../utils/prisma";
import { adminSearchableFields } from "./admin.constant";

const getAllFromDb = async (payload: Request) => {
  const qb = new PrismaQueryBuilder<
    Prisma.AdminWhereInput,
    Prisma.AdminOrderByWithRelationInput
  >(payload.query as Record<string, string>)
    .filter()
    .search(adminSearchableFields)
    .sort()
    .paginate();

  const result = prisma.patient.findMany(qb.build());

  const [data, meta] = await Promise.all([result, qb.getMeta(prisma.patient)]);

  return {
    data,
    meta,
  };
};

export const AdminServices = {
  getAllFromDb,
};
