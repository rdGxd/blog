import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  findById(id: string): Promise<PostModel>;

  // Mutation:
  create(post: PostModel): Promise<PostModel>;
  update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'createdAt' | 'slug' | 'updatedAt'>,
  ): Promise<PostModel>;
  delete(id: string): Promise<void>;
}
