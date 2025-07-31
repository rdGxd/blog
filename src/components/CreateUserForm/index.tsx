'use client';

import { createUserAction } from '@/actions/user/create-user-action';
import { PublicUserSchema } from '@/lib/user/schemas';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';
import { HoneypotInput } from '../HoneypotInput';
import { InputText } from '../InputText';

export function CreateUserForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  return (
    <div className='mx-auto mt-16 mb-32 flex max-w-sm items-center justify-center text-center'>
      <form action={action} className='flex flex-1 flex-col gap-6'>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Seu Nome'
          disabled={isPending}
          defaultValue={state.user.name}
          required
        />
        <InputText
          type='email'
          name='email'
          labelText='Email'
          placeholder='Seu Email'
          disabled={isPending}
          defaultValue={state.user.email}
          required
        />
        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua Senha'
          disabled={isPending}
          required
        />
        <InputText
          type='password'
          name='password2'
          labelText='Confirmar Senha'
          placeholder='Confirme sua Senha'
          disabled={isPending}
          defaultValue={''}
          required
        />

        <HoneypotInput />

        <Button disabled={isPending} type='submit' className='mt-4'>
          <UserRoundIcon />
          {!isPending ? 'Criar Usuário' : 'Carregando...'}
        </Button>
        <p className='text-sm/tight'>
          <Link href='/login'>Já possui uma conta? Faça login</Link>
        </p>
      </form>
    </div>
  );
}
