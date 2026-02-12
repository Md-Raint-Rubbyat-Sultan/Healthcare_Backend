import z from "zod";

export const scheduleValidation = z.object({
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  interval: z.number().positive().default(30).optional(),
});
