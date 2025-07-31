import { UpdateUserForm } from '@/components/admin/UpdateUserForm';
import { SpinLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Usuário - Admin',
};

export default function UserPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <UpdateUserForm />
    </Suspense>
  );
}
