'use server';

import { postRepository } from '@/repositories/post';
import { logColor } from '@/utils/log-color';
import { revalidateTag } from 'next/cache';

export async function updatePostAction(id: string) {
  // TODO: checar login do usuário

  logColor(`Updating post with ID: ${id}`, 'red');
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

  // TODO: revalidateTag ou revalidatePath
  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
