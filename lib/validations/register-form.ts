import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Email không hợp lệ"),
    pass: z.string().min(8, "Password must be at least 8 characters"),
    confirmPass: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.pass === data.confirmPass, {
    path: ["confirmPass"],
    message: "Password and confirm password must match",
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;
