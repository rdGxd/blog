'use server';

import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return makeResult({
      error: `O tamanho máximo permitido para o upload é de ${IMAGE_UPLOAD_MAX_SIZE / 1024 / 1024} MB.`,
    });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({
      error: 'Tipo de arquivo inválido. Apenas imagens são permitidas.',
    });
  }

  return makeResult({ url: 'URL' });
}
