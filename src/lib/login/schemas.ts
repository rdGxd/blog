import z from 'zod';

export const LoginSchema = z.object({
  email: z.email({ message: 'Email inválido' }).trim(),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .trim(),
});
