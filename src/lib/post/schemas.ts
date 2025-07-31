import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import sanitize from 'sanitize-html';
import { z } from 'zod';
import { PublicUserSchema } from '../user/schemas';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Título deve ter, no mínimo, 3 caractere')
    .max(100, 'Título deve ter, no máximo, 100 caracteres'),
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

export const CreatePostForApiSchema = PostBaseSchema.omit({
  author: true,
  published: true,
}).extend({});

export const UpdatePostForApiSchema = PostBaseSchema.omit({
  author: true,
}).extend({});

export const PublicPostForApiSchema = PostBaseSchema.extend({
  id: z.string().default(''),
  slug: z.string().default(''),
  title: z.string().default(''),
  excerpt: z.string().default(''),
  author: PublicUserSchema.optional().default({
    id: '',
    email: '',
    name: '',
  }),
  content: z.string().default(''),
  coverImageUrl: z.string().default(''),
  createdAt: z.string().default(''),
});

export type CreatePostForApiDto = z.infer<typeof CreatePostForApiSchema>;
export type UpdatePostForApiDto = z.infer<typeof UpdatePostForApiSchema>;
export type PublicPostForApiDto = z.infer<typeof PublicPostForApiSchema>;
