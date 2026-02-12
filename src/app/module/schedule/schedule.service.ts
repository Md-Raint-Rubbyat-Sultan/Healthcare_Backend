import { addMinutes } from "date-fns";
import { dateTimeConverter } from "../../utils/date-calculation";
import { prisma } from "../../utils/prisma";
import { Request } from "express";
import { PrismaQueryBuilder } from "../../utils/queryBuilder";
import { Prisma } from "../../../../prisma/generated/prisma/client";

const insertIntoDb = async (paylod: any) => {
  const { startTime, endTime, startDate, endDate, interval } = paylod;

  const schedules = [];

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const startDateTime = dateTimeConverter.convertIntoDateTime(
      currentDate,
      startTime,
    );

    const endDateTime = dateTimeConverter.convertIntoDateTime(
      currentDate,
      endTime,
    );

    while (startDateTime < endDateTime) {
      const slotStartDateTime = startDateTime; // 10:30
      const slotEndDateTime = addMinutes(startDateTime, interval); // 11:00

      const scheduleData = {
        startDateTime: slotStartDateTime,
        endDateTime: slotEndDateTime,
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: scheduleData,
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + interval);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const scheduleForDoctor = async (payload: Request) => {
  const qb = new PrismaQueryBuilder<
    Prisma.ScheduleWhereInput,
    Prisma.ScheduleOrderByWithRelationInput
  >(payload.query as Record<string, string>)
    .paginate()
    .sort();

  const rangeWhere: Prisma.ScheduleWhereInput = {
    AND: [
      {
        startDateTime: {
          gte: payload.query.startDateTime as string,
        },
      },
      {
        endDateTime: {
          lte: payload.query.endDateTime as string,
        },
      },
    ],
  };

  const result = prisma.schedule.findMany({
    ...qb.build(),
    where: {
      ...rangeWhere,
    },
  });

  const total = await prisma.schedule.count({
    where: {
      ...rangeWhere,
    },
  });

  const totalPage = Math.ceil(total / (Number(payload.query.limit) || 10));

  const meta = {
    page: Number(payload.query.page) || 1,
    limit: Number(payload.query.limit) || 10,
    total,
    totalPage,
  };

  const [data] = await Promise.all([result]);

  return {
    data,
    meta,
  };
};

export const scheduleService = {
  insertIntoDb,
  scheduleForDoctor,
};
