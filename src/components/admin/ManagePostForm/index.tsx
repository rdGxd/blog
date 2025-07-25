'use client';

import { createPostAction } from '@/actions/post/create-post-action';
import { updatePostAction } from '@/actions/post/update-post-action';
import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ImageUploader } from '../ImageUploader';

type ManagePostFormUpdateProps = {
  publicPost: PublicPost;
  mode: 'update';
};

type ManagePostFormCreateProps = {
  publicPost?: PublicPost;
  mode: 'create';
};
type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;

  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    create: createPostAction,
    update: updatePostAction,
  }[mode];

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const [state, action, isPending] = useActionState(actionsMap, initialState);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => {
        toast.error(error);
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso!');
    }
  }, [state.success]);

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Post criado com sucesso!');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [created, router]);

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

        <ImageUploader disabled={isPending} />

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
