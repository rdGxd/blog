import { SpinLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trocar senha - Admin',
};

export default function UserPasswordPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <h1>Update password form</h1>
    </Suspense>
  );
}
