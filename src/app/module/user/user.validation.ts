import z from "zod";
import { Gender } from "../../../../prisma/generated/prisma/enums";

const createPatientValidationSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string(),
    email: z.email(),
    address: z.string().optional(),
  }),
});

const createDoctorValidationSchema = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string(),
    email: z.email(),
    address: z.string(),
    contactNumber: z.string(),
    registrationNumber: z.string(),
    experience: z.number().default(0),
    gender: z.enum(Gender),
    appoinmentFee: z.number(),
    qualification: z.string(),
    currentWorkingPlace: z.string(),
    designation: z.string(),
  }),
});

const createAdminValidationSchema = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string(),
    email: z.email(),
    contactNumber: z.string(),
  }),
});

export const userValidation = {
  createPatientValidationSchema,
  createDoctorValidationSchema,
  createAdminValidationSchema,
};
