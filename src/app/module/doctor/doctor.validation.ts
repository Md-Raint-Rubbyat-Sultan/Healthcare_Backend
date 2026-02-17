import z from "zod";
import { Gender } from "../../../../prisma/generated/prisma/enums";

export const doctorUpdateZodValidation = z.object({
  email: z.email().optional(),
  contactNumber: z.string().optional(),
  gender: z.enum(Gender).optional(),
  appointmentFee: z.number().nonnegative().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  registrationNumber: z.string().optional(),
  experience: z.number().nonnegative().optional(),
  qualification: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
  specialties: z
    .array(
      z.object({
        specialtyId: z.string(),
        isDeleted: z.boolean().optional(),
      }),
    )
    .optional(),
});
