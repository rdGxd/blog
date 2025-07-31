'use server';

import { deleteLoginSession } from '@/lib/login/manage-login';
import { getUserFromApi } from '@/lib/user/api/ger-user';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { redirect } from 'next/navigation';

type DeleteUserActionState = {
  errors: string[];
  success: boolean;
};

export async function deleteUserAction() {
  const user = await getUserFromApi();

  if (!user) {
    await deleteLoginSession();
    return {
      errors: [
        'Usuário não encontrado. Você será redirecionado para a página de login.',
      ],
      success: false,
    };
  }

  const deleteUserResponse =
    await authenticatedApiRequest<DeleteUserActionState>(`/user/me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  if (!deleteUserResponse.success) {
    return {
      errors: deleteUserResponse.errors,
      success: false,
    };
  }

  await deleteLoginSession();
  redirect('/');
}
