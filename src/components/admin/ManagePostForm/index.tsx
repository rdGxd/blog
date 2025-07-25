'use client';

import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useState } from 'react';
import { ImageUploader } from '../ImageUploader';

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState<string>('');

  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          placeholder='ID gerado automaticamente'
          labelText='ID'
          name='id'
          type='text'
          defaultValue={''}
          readOnly
        />

        <InputText
          placeholder='SLUG gerado automaticamente'
          labelText='SLUG'
          name='slug'
          type='text'
          defaultValue={''}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          defaultValue={''}
        />

        <InputText
          placeholder='Digite o título do post'
          labelText='Título'
          name='title'
          type='text'
          defaultValue={''}
        />

        <InputText
          placeholder='Digite o resumo do post'
          labelText='Excerto'
          name='excerpt'
          type='text'
          defaultValue={''}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
          disabled={false}
        />

        <ImageUploader />

        <InputText
          placeholder='Digite a URL da imagem de capa'
          labelText='URL da imagem de capa '
          name='coverImageUrl'
          type='text'
          defaultValue={''}
        />

        <InputCheckbox type='checkbox' name='published' labelText='Publicar?' />
      </div>
      <div className='mt-6'>
        <Button variant={'default'} size='lg' className='w-full' type='submit'>
          Enviar
        </Button>
      </div>
    </form>
  );
}
