import LoginForm from '@/components/LoginForm';
import ErrorMessage from '@/components/ErrorMessage';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  return (
    <>
      {allowLogin && <LoginForm />}

      {!allowLogin && (
        <ErrorMessage
          contentTitle='Login Desativado'
          content='O login está desativado neste momento.'
        />
      )}
    </>
  );
}
