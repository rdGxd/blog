'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Button } from '@/components/Button';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { toast } from 'react-toastify';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current || !fileInputRef.current.files) return;

    const file = fileInputRef.current.files[0];

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      toast.error(
        `O tamanho máximo permitido para o upload é de ${IMAGE_UPLOAD_MAX_SIZE / 1024 / 1024} MB.`,
      );
      fileInputRef.current.value = '';
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
        return;
      }
      // TODO: Aqui você pode fazer algo com a URL retornada, como armazená-la no estado do componente pai ou enviar para o servidor.
      toast.success(`Imagem enviada com sucesso: ${result.url}`);
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
      >
        <ImageUpIcon />
        Envie uma imagem
      </Button>
      <input
        onChange={handleChange}
        type='file'
        name='file'
        className='hidden'
        accept='image/*'
        ref={fileInputRef}
      />
    </div>
  );
}
