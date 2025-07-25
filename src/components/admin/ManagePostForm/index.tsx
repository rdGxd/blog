'use client';

import { createPostAction } from '@/actions/post/create-post-action';
import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => {
        toast.error(error);
      });
    }
  }, [state.errors]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(formState.content || '');

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          placeholder='ID gerado automaticamente'
          labelText='ID'
          name='id'
          type='text'
          defaultValue={formState.id}
          disabled={isPending}
          readOnly
        />

        <InputText
          placeholder='SLUG gerado automaticamente'
          labelText='SLUG'
          name='slug'
          type='text'
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          disabled={isPending}
          defaultValue={formState.author}
        />

        <InputText
          placeholder='Digite o título do post'
          labelText='Título'
          name='title'
          disabled={isPending}
          type='text'
          defaultValue={formState.title}
        />

        <InputText
          placeholder='Digite o resumo do post'
          labelText='Excerto'
          name='excerpt'
          disabled={isPending}
          type='text'
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
          disabled={isPending}
        />

        <ImageUploader />

        <InputText
          placeholder='Digite a URL da imagem de capa'
          labelText='URL da imagem de capa '
          name='coverImageUrl'
          type='text'
          disabled={isPending}
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          disabled={isPending}
          type='checkbox'
          name='published'
          labelText='Publicar?'
          defaultChecked={formState.published}
        />
      </div>
      <div className='mt-6'>
        <Button variant={'default'} type='submit' disabled={isPending}>
          Enviar
        </Button>
      </div>
    </form>
  );
}
