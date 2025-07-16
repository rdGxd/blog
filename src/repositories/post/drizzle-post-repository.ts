import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { PostModel } from '@/models/post/post-model';
import { and, desc, eq } from 'drizzle-orm';
import { PostRepository } from './post-repository';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    return await drizzleDb.query.posts.findMany({
      where: eq(postsTable.published, true),
      orderBy: desc(postsTable.createdAt),
    });
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const query = await drizzleDb.query.posts.findFirst({
      where: and(eq(postsTable.slug, slug), eq(postsTable.published, true)),
    });
    if (query) return query;
    throw new Error(`Post with slug ${slug} not found`);
  }

  async findById(id: string): Promise<PostModel> {
    const query = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });
    if (query) return query;
    throw new Error(`Post with id ${id} not found`);
  }

  async findAll(): Promise<PostModel[]> {
    return await drizzleDb.query.posts.findMany({
      orderBy: desc(postsTable.createdAt),
    });
  }
}
