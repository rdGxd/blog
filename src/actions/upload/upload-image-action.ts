'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

type UploadImageActionResult = {
  url: string;
  error: string;
};

const uploadMaxSize =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 1048576;

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    return makeResult({
      error: 'Faça login em outra aba antes de fazer o upload da imagem',
    });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  if (file.size > uploadMaxSize) {
    return makeResult({
      error: `O tamanho máximo permitido para o upload é de ${uploadMaxSize / 1024 / 1024} MB.`,
    });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({
      error: 'Tipo de arquivo inválido. Apenas imagens são permitidas.',
    });
  }

  const uploadResponse = await authenticatedApiRequest<{ url: string }>(
    `/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!uploadResponse.success) {
    return makeResult({ error: uploadResponse.errors[0] });
  }
  const url = `${process.env.IMAGE_SERVER_URL}${uploadResponse.data.url}`;
  return makeResult({ url });
}
