'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { PublicPostForApiDto } from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const isAuthenticated = await getLoginSessionForApi();

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

  const postResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!postResponse.success) {
    return {
      error: 'Erro ao encontrar o post',
    };
  }

  const deleteResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!deleteResponse.success) {
    return {
      error: 'Erro ao deletar o post',
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${postResponse.data.slug}`);

  return {
    error: '',
  };
}
