'use client';

import { loginAction } from '@/actions/login/login-action';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const initialState = {
    email: '',
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  return (
    <div className='mx-auto mt-16 mb-32 flex max-w-sm items-center justify-center text-center'>
      <form className='flex flex-1 flex-col gap-6' action={action}>
        <InputText
          type='email'
          name='email'
          placeholder='Email do usuário'
          autoComplete='email'
          labelText='Email'
          disabled={isPending}
          defaultValue={state.email}
          required
        />

        <InputText
          type='password'
          name='password'
          placeholder='Sua senha'
          autoComplete='current-password'
          labelText='Senha'
          disabled={isPending}
          required
        />

        <Button type='submit' className='mt-4' disabled={isPending}>
          <LogInIcon />
          Entrar
        </Button>

        <p className='text-sm/tight'>
          <Link href='/user/new'>Criar uma conta</Link>
        </p>
      </form>
    </div>
  );
}
