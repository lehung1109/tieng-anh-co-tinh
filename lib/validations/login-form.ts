import { z } from "zod";

export const loginFormSchema = z
  .object({
    email: z.email("Email không hợp lệ"),
    pass: z.string().min(8, "Password must be at least 8 characters"),
  });

export type LoginFormData = z.infer<typeof loginFormSchema>;
