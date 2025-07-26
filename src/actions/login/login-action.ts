'use server';

import { verifyPassword } from '@/lib/login/manage-login';
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
  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username: username,
      error: 'Usuário e senha são obrigatórios',
    };
  }

  // Checaria se o usuário existe na base de dados
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASSWORD || '',
  );

  if (!isUsernameValid && !isPasswordValid) {
    return {
      username,
      error: 'Usuário ou senha inválidos',
    };
  }

  // TODO: abaixo
  // Aqui o usuário está logado com sucesso
  // Criar cookie de sessão, JWT, etc.
  // Redirecionar para a página de administração
  return {
    username: '',
    error: 'Usuário logado com sucesso',
  };
}
