'use server';

import { deleteLoginSession } from '@/lib/login/manage-login';
import { getUserFromApi } from '@/lib/user/api/ger-user';
import {
  PublicUserDto,
  PublicUserSchema,
  UpdateUserSchema,
} from '@/lib/user/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { redirect } from 'next/navigation';

type UpdateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function updateUserAction(
  state: UpdateUserActionState,
  formData: FormData,
) {
  const user = await getUserFromApi();

  if (!user) {
    await deleteLoginSession();
    return {
      user: state.user,
      errors: [
        'Usuário não encontrado. Você será redirecionado para a página de login.',
      ],
      success: false,
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ['Dados inválidos.'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = UpdateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: state.user,
      errors: getZodErrorMessages(parsedFormData.error),
      success: false,
    };
  }

  const updateResponse = await authenticatedApiRequest<PublicUserDto>(
    '/user/me',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!updateResponse.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: updateResponse.errors,
      success: false,
    };
  }
  if (user.email !== updateResponse.data.email) {
    await deleteLoginSession();
    redirect('/login?userChanged=1');
  }

  return {
    user: PublicUserSchema.parse(formObj),
    errors: [],
    success: true,
  };
}
