'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return {
      errors: 'Faça login em outra aba antes de salvar',
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos. ID do post não fornecido ou inválido.',
    };
  }

  let post;
  try {
    post = await postRepository.findById(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: 'Erro ao deletar o post.',
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
