import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must be at most 50 characters long")
    .regex(
      /^[A-Za-z'-]+$/,
      "First name can only contain letters, apostrophes, and hyphens",
    ),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must be at most 50 characters long")
    .regex(
      /^[A-Za-z'-]+$/,
      "Last name can only contain letters, apostrophes, and hyphens",
    ),
});

export const dateOfBirthSchema = z.object({
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format")
    .refine(
      (date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18 && age <= 120;
      },
      { message: "You must be at least 18 years old" },
    ),
});

export const credentialsSchema = z
  .object({
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signUpSchema = personalInfoSchema
  .merge(dateOfBirthSchema)
  .merge(credentialsSchema);

export const signInSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
export type DateOfBirthForm = z.infer<typeof dateOfBirthSchema>;
export type CredentialsForm = z.infer<typeof credentialsSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
export type SignInForm = z.infer<typeof signInSchema>;
