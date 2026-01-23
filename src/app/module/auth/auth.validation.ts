import z from "zod";

const loginValidationSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const authValidation = {
  loginValidationSchema,
};
