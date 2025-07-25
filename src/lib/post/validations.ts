import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import sanitize from 'sanitize-html';
import { z } from 'zod';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Título deve ter, no mínimo, 3 caractere')
    .max(10, 'Título deve ter, no máximo, 10 caracteres'),
  content: z
    .string()
    .trim()
    .min(3, 'Conteúdo não pode ser vazio')
    .transform(val => sanitize(val)),
  author: z
    .string()
    .trim()
    .min(3, 'Autor deve ter, no mínimo, 3 caracteres')
    .max(100, 'Autor deve ter, no máximo, 100 caracteres'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'Excerto deve ter, no mínimo, 3 caracteres')
    .max(200, 'Excerto deve ter, no máximo, 200 caracteres'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message:
      'URL da imagem de capa deve ser uma URL válida ou caminho relativo',
  }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === 'on' || val === true || val === 'true'),
});

// PostCreateSchema: igual a base por enquanto
export const PostCreateSchema = PostBaseSchema;

// PostUpdateSchema: pode incluir campos extras no futuro (ex: id)
export const PostUpdateSchema = PostBaseSchema.extend({
  // id: z.string().uuid('ID inválido'),
});
