import { postRepository } from '@/repositories/post';
import { cache } from 'react';

export const findPostsByIdAdmin = cache(async (id: string) => {
  return postRepository.findById(id);
});

export const findAllPostsAdmin = cache(async () => {
  return postRepository.findAll();
});
