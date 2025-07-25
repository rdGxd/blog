import { PostModel } from '@/models/post/post-model';

export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePublicPostDto = (post: PostModel): PublicPost => {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImageUrl: post.coverImageUrl,
    published: post.published,
    createdAt: post.createdAt,
    author: post.author,
  };
};
