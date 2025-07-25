'use client';

import { createPostAction } from '@/actions/post/create-post-action';
import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import Image from 'next/image';
import { useActionState, useState } from 'react';
import { ImageUploader } from '../ImageUploader';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );

  const { formState } = state;
  const [contentValue, setContentValue] = useState(formState.content);

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          placeholder='ID gerado automaticamente'
          labelText='ID'
          name='id'
          type='text'
          defaultValue={formState.id}
          readOnly
        />

        <InputText
          placeholder='SLUG gerado automaticamente'
          labelText='SLUG'
          name='slug'
          type='text'
          defaultValue={formState.slug}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          defaultValue={formState.author}
        />

        <InputText
          placeholder='Digite o título do post'
          labelText='Título'
          name='title'
          type='text'
          defaultValue={formState.title}
        />

        <InputText
          placeholder='Digite o resumo do post'
          labelText='Excerto'
          name='excerpt'
          type='text'
          defaultValue={formState.excerpt}
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
          defaultValue={formState.coverImageUrl}
        />

        <Image
          src={formState.coverImageUrl}
          alt={formState.title}
          width={1200}
          height={700}
        />

        <InputCheckbox
          type='checkbox'
          name='published'
          labelText='Publicar?'
          defaultChecked={formState.published}
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
