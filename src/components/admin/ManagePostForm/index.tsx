'use client';

import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { PublicPost } from '@/dto/post/dto';
import Image from 'next/image';
import { useState } from 'react';
import { ImageUploader } from '../ImageUploader';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState<string>(
    publicPost?.content || '',
  );

  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          placeholder='ID gerado automaticamente'
          labelText='ID'
          name='id'
          type='text'
          defaultValue={publicPost?.id || ''}
          readOnly
        />

        <InputText
          placeholder='SLUG gerado automaticamente'
          labelText='SLUG'
          name='slug'
          type='text'
          defaultValue={publicPost?.slug || ''}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          defaultValue={publicPost?.author || ''}
        />

        <InputText
          placeholder='Digite o título do post'
          labelText='Título'
          name='title'
          type='text'
          defaultValue={publicPost?.title || ''}
        />

        <InputText
          placeholder='Digite o resumo do post'
          labelText='Excerto'
          name='excerpt'
          type='text'
          defaultValue={publicPost?.excerpt || ''}
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
          defaultValue={publicPost?.coverImageUrl || ''}
        />

        <Image
          src={publicPost?.coverImageUrl || ''}
          alt={publicPost?.title || ''}
          width={1200}
          height={700}
        />

        <InputCheckbox
          type='checkbox'
          name='published'
          labelText='Publicar?'
          defaultChecked={publicPost?.published || false}
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
