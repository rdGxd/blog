import z from 'zod';

// Uma base para a validação do usuário
// Criei essa base para usar .refine e .transform
// e validar se a duas senhas são iguais e remover
// a repetição da senha
const CreateUserBase = z.object({
  name: z.string().trim().min(4, 'Nome precisa ter pelo menos 4 caracteres'),
  email: z.email({ message: 'Email inválido' }).trim(),
  password: z
    .string()
    .min(6, 'Senha precisa ter pelo menos 6 caracteres')
    .trim(),
  password2: z
    .string()
    .min(6, 'Confirmação de senha precisa ter pelo menos 6 caracteres')
    .trim(),
});

export const CreateUserSchema = CreateUserBase.refine(
  data => {
    // Confirma se password e password2 são iguais
    return data.password === data.password2;
  },
  {
    path: ['password2'],
    message: 'As senhas não conferem',
  },
).transform(({ name, email, password }) => {
  // Remove o campo password2
  return {
    name,
    email,
    password,
  };
});

export const PublicUserSchema = z.object({
  id: z.string().default(''),
  name: z.string().default(''),
  email: z.string().default(''),
});

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Senha atual precisa ter pelo menos 6 caracteres')
      .trim(),
    newPassword: z
      .string()
      .min(6, 'Nova senha precisa ter pelo menos 6 caracteres')
      .trim(),
    newPassword2: z
      .string()
      .min(6, 'Confirmação de nova senha precisa ter pelo menos 6 caracteres')
      .trim(),
  })
  .refine(data => {
    // Confirma se newPassword e newPassword2 são iguais
    return data.newPassword === data.newPassword2;
  })
  .transform(({ currentPassword, newPassword }) => {
    // Remove o campo newPassword2
    return {
      currentPassword,
      newPassword,
    };
  });

export const UpdateUserSchema = CreateUserBase.omit({
  password: true,
  password2: true,
}).extend({});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type PublicUserDto = z.infer<typeof PublicUserSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
