'use client';

import { loginAction } from '@/actions/login/login-action';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { LogInIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const initialState = {
    username: '',
    error: '',
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast.dismiss();
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className='mx-auto mt-16 mb-32 flex max-w-sm items-center justify-center'>
      <form className='flex flex-1 flex-col gap-6' action={action}>
        <InputText
          type='text'
          name='username'
          placeholder='Seu usuário'
          autoComplete='username'
          labelText='Usuário'
          disabled={isPending}
          defaultValue={state.username}
        />

        <InputText
          type='password'
          name='password'
          placeholder='Sua senha'
          autoComplete='current-password'
          labelText='Senha'
          disabled={isPending}
        />

        <Button type='submit' className='mt-4' disabled={isPending}>
          <LogInIcon />
          Entrar
        </Button>

        {state.error && <p className='text-red-600'>{state.error}</p>}
      </form>
    </div>
  );
}
