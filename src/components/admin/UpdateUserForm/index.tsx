'use client';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { HoneypotInput } from '@/components/HoneypotInput';
import { InputText } from '@/components/InputText';
import { asyncDelay } from '@/utils/async-delay';
import { LockKeyhole, OctagonXIcon, UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';

export function UpdateUserForm() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isTransitioning, startTransition] = useTransition();
  const safetyDelay = 5000;
  const isElementsDisabled = isTransitioning;

  function showDeleteAccountDialog(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();
    setIsDialogVisible(true);

    startTransition(async () => {
      await asyncDelay(safetyDelay);
    });
  }

  function handleDeleteUserAccount() {}

  return (
    <div className='mx-auto mb-32 flex max-w-sm items-center justify-center text-center'>
      <form className='flex flex-1 flex-col gap-6'>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Seu Nome'
          disabled={isElementsDisabled}
          defaultValue={'state.user.name'}
          required
        />
        <InputText
          type='email'
          name='email'
          labelText='Email'
          placeholder='Seu Email'
          disabled={isElementsDisabled}
          defaultValue={'state.user.email'}
          required
        />

        <HoneypotInput />
        <Link
          href={'/admin/user/password'}
          className='flex items-center justify-center gap-2'
        >
          <LockKeyhole />
          Alterar Senha
        </Link>

        <Link
          href={'/admin/user/delete'}
          className='flex items-center justify-center gap-2 text-red-600 transition hover:text-red-700'
          onClick={showDeleteAccountDialog}
        >
          <OctagonXIcon />
          Apagar a conta
        </Link>

        <Button disabled={isElementsDisabled} type='submit' className='mt-4'>
          <UserRoundIcon />
          {!false ? 'Atualizar Usuário' : 'Carregando...'}
        </Button>
      </form>

      <Dialog
        content={
          <p>
            Ao apagar sua conta, todos os seus dados serão removidos
            permanentemente. Você tem certeza que deseja continuar? Clique em{' '}
            <strong>OK</strong> para prosseguir ou <strong>Cancelar</strong>{' '}
            para voltar.
            <br />
            Os botões abaixo serão liberados após {safetyDelay / 1000} segundos.
          </p>
        }
        disabled={isElementsDisabled}
        isVisible={isDialogVisible}
        onConfirm={() => setIsDialogVisible(false)}
        onCancel={() => setIsDialogVisible(false)}
        title={'Apagar meu usuário'}
      />
    </div>
  );
}
