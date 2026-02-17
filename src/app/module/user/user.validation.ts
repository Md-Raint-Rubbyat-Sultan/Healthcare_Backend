import z from "zod";
import { Gender } from "../../../../prisma/generated/prisma/enums";

const createPatientValidationSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string().trim(),
    email: z.email(),
    contactNumber: z.string().trim(),
    address: z.string().trim().optional(),
  }),
});

const createDoctorValidationSchema = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string().trim(),
    email: z.email(),
    address: z.string().trim(),
    contactNumber: z.string().trim(),
    registrationNumber: z.string().trim(),
    experience: z.number().default(0),
    gender: z.enum(Gender),
    appoinmentFee: z.number(),
    qualification: z.string().trim(),
    currentWorkingPlace: z.string().trim(),
    designation: z.string().trim(),
  }),
});

const createAdminValidationSchema = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string().trim(),
    email: z.email(),
    contactNumber: z.string().trim(),
  }),
});

export const userValidation = {
  createPatientValidationSchema,
  createDoctorValidationSchema,
  createAdminValidationSchema,
};
