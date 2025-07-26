'use server';

import { asyncDelay } from '@/utils/async-delay';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  await asyncDelay(5000); // Vou manter

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  // Dados que o usuário enviou
  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  // Checaria se o usuário existe na base de dados
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = password === process.env.LOGIN_PASSWORD;

  if (isUsernameValid && isPasswordValid) {
    return {
      username,
      error: '',
    };
  }

  return {
    username: '',
    error: 'Usuário ou senha inválidos',
  };
}
