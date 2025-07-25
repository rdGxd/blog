'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Button } from '@/components/Button';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [imgUrl, setImageUrl] = useState<string>();

  function handleChooseFile() {
    if (!fileInputRef.current) {
      setImageUrl('');
      toast.error('Erro ao acessar o seletor de arquivos.');
      return;
    }

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current || !fileInputRef.current.files) {
      setImageUrl('');
      toast.error('Nenhum arquivo selecionado.');
      return;
    }

    const file = fileInputRef.current.files[0];

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      toast.error(
        `O tamanho máximo permitido para o upload é de ${IMAGE_UPLOAD_MAX_SIZE / 1024 / 1024} MB.`,
      );
      fileInputRef.current.value = '';
      setImageUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setImageUrl('');
        return;
      }
      // TODO: Aqui você pode fazer algo com a URL retornada, como armazená-la no estado do componente pai ou enviar para o servidor.
      setImageUrl(result.url);
      toast.success(`Imagem enviada com sucesso`);
    });

    fileInputRef.current.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button
        variant='default'
        type='button'
        className='self-start'
        onClick={handleChooseFile}
        disabled={isPending || disabled}
      >
        <ImageUpIcon />
        Envie uma imagem
      </Button>

      {imgUrl && (
        <div className='flex flex-col gap-2'>
          <p>
            <b>URL:</b> {imgUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img src={imgUrl} className='rounded-lg' />
        </div>
      )}

      <input
        onChange={handleChange}
        type='file'
        name='file'
        className='hidden'
        accept='image/*'
        ref={fileInputRef}
        disabled={isPending || disabled}
      />
    </div>
  );
}
