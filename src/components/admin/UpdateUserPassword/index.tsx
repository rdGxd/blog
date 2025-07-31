'use client';

import { updatePasswordAction } from '@/actions/user/update-password-action';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { LockKeyholeIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function UpdateUserPassword() {
  const [state, action, isPending] = useActionState(updatePasswordAction, {
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();

    if (state.errors.length > 0) {
      state.errors.forEach(error => {
        toast.error(error);
      });
    }

    if (state.success) {
      toast.success('Password updated successfully!');
    }
  }, [state]);

  return (
    <div className='mx-auto mt-16 mb-32 flex max-w-sm items-center justify-center text-center'>
      <form action={action} className='flex flex-1 flex-col gap-6'>
        <InputText
          name='currentPassword'
          type='password'
          labelText='Senha atual'
          placeholder='Digite sua senha atual'
          disabled={isPending}
          defaultValue={''}
          required
        />

        <InputText
          name='newPassword'
          type='password'
          labelText='Nova Senha'
          placeholder='Digite sua nova senha'
          disabled={isPending}
          defaultValue={''}
          required
        />

        <InputText
          name='newPassword2'
          type='password'
          labelText='Confirmar Senha'
          placeholder='Confirme sua nova senha'
          disabled={isPending}
          defaultValue={''}
          required
        />
        <div className='mt-4 flex items-center justify-center'>
          <Button size='md' disabled={isPending} type='submit'>
            <LockKeyholeIcon />
            Atualizar senha
          </Button>
        </div>
      </form>
    </div>
  );
}
