'use server';

import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

const uploadMaxSize =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 1048576;

const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads';

const imgServerURL =
  process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  // TODO: Verificar login de usuário

  const makeResult = ({ url = '', error = '' }) => ({ url, error });

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

  const imageExtension = extname(file.name).toLowerCase();
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(process.cwd(), 'public', uploadDir);

  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const url = `${imgServerURL}/${uniqueImageName}`;

  // TODO: Aqui você deve implementar a lógica para enviar o arquivo para o servidor
  return makeResult({ url });
}
