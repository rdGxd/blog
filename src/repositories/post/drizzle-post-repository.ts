import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';
import { PostModel } from '@/models/post/post-model';
import { asyncDelay } from '@/utils/async-delay';
import { logColor } from '@/utils/log-color';
import { and, desc, eq } from 'drizzle-orm';
import { PostRepository } from './post-repository';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findAllPublic called', Date.now());
    return await drizzleDb.query.posts.findMany({
      where: eq(postsTable.published, true),
      orderBy: desc(postsTable.createdAt),
    });
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findBySlugPublic called', Date.now());
    const query = await drizzleDb.query.posts.findFirst({
      where: and(eq(postsTable.slug, slug), eq(postsTable.published, true)),
    });
    if (query) return query;
    throw new Error(`Post with slug ${slug} not found`);
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findById called', Date.now());
    const query = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });
    if (query) return query;
    throw new Error(`Post with id ${id} not found`);
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    logColor('findAll called', Date.now());
    return await drizzleDb.query.posts.findMany({
      orderBy: desc(postsTable.createdAt),
    });
  }
}
