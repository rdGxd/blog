'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { postRepository } from '@/repositories/post';
import { asyncDelay } from '@/utils/async-delay';
import { logColor } from '@/utils/log-color';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  // TODO: checar login do usuário

  // TODO: remover linhas abaixo
  await asyncDelay(2000);
  logColor(`Deleting post with ID: ${id}`, 'red');
  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos. ID do post não fornecido ou inválido.',
    };
  }

  const post = await postRepository.findById(id).catch(() => null);

  if (!post) {
    return {
      error: 'Post não encontrado.',
    };
  }

  // TODO: Mover esse método para o repositório
  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

  // TODO: revalidateTag ou revalidatePath
  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
