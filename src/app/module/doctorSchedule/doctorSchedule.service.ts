import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../utils/prisma";

const insertIntoDb = async (
  user: JwtPayload,
  payload: { scheduleIds: string[] },
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    select: {
      id: true,
    },
  });

  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });

  return result;
};

export const doctorScheduleService = {
  insertIntoDb,
};
