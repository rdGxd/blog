import { CreateUserForm } from '@/components/CreateUserForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Criar Usuário',
};

export default function CreateUserPage() {
  return <CreateUserForm />;
}
