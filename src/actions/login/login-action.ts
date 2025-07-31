'use server';

import { LoginSchema } from '@/lib/login/schemas';
import { apiRequest } from '@/utils/api-request';
import { asyncDelay } from '@/utils/async-delay';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      email: '',
      errors: ['Login desativado'],
    };
  }

  await asyncDelay(2000); // Vou manter

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString().trim() || '';
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formEmail,
      errors: getZodErrorMessages(parsedFormData.error),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!loginResponse.success) {
    return {
      email: formEmail,
      errors: loginResponse.errors,
    };
  }

  console.log('Login realizado com sucesso:', loginResponse.data);

  return {
    email: formEmail,
    errors: ['success'],
  };
  // await createLoginSession(email);
  // redirect('/admin/post');
}
