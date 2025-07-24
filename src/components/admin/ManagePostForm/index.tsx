'use client';

import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useState } from 'react';

export function ManagePostForm() {
  const [content, setContent] = useState('');

  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText placeholder='Digite seu nome' labelText='Nome' />
        <InputText placeholder='Digite seu email' labelText='Email' />
        <InputCheckbox labelText='Aceito os termos' />
        <MarkdownEditor
          labelText='Conteúdo'
          value={content}
          disabled={false}
          setValue={setContent}
          textAreaName='content'
        />
      </div>
      <div className='mt-6'>
        <Button variant={'default'} size='lg' className='w-full' type='submit'>
          Enviar
        </Button>
      </div>
    </form>
  );
}
