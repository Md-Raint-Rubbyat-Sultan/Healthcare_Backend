import z from "zod";

export const doctorScheduleVaildationShcema = z.object({
  scheduleIds: z.array(z.string()),
});
