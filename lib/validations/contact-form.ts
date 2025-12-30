// lib/validations/email.ts
import { z } from "zod";

// support: 03x, 05x, 07x, 08x, 09x (10 số)
// support: +84, 84, 0084 prefix
const vietnamesePhoneRegex =
  /^(\+84|84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])\d{7}$/;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(vietnamesePhoneRegex, "Số điện thoại không hợp lệ")
    .transform((val) => {
      // Normalize to E.164 format (+84xxxxxxxxx)
      if (val.startsWith("0")) {
        return "+84" + val.slice(1);
      }
      if (val.startsWith("84") && !val.startsWith("+")) {
        return "+" + val;
      }
      return val;
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
