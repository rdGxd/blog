import ErrorMessage from '@/components/ErrorMessage';
import { UpdateUserForm } from '../UpdateUserForm';
import { getUserFromApi } from '@/lib/user/api/ger-user';

export async function UpdateUser() {
  const user = await getUserFromApi();

  if (!user) {
    return (
      <ErrorMessage
        content='Usuário não encontrado. Verifique se você está logado e tente novamente.'
        contentTitle='😢'
      />
    );
  }

  return <UpdateUserForm user={user} />;
}
