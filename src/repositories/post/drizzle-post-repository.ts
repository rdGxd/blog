import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { PostModel } from '@/models/post/post-model';
import { asyncDelay } from '@/utils/async-delay';
import { and, desc, eq, or } from 'drizzle-orm';
import { PostRepository } from './post-repository';

const simulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(simulateWaitMs, true);
    return await drizzleDb.query.posts.findMany({
      where: eq(postsTable.published, true),
      orderBy: desc(postsTable.createdAt),
    });
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(simulateWaitMs, true);
    const query = await drizzleDb.query.posts.findFirst({
      where: and(eq(postsTable.slug, slug), eq(postsTable.published, true)),
    });
    if (query) return query;
    throw new Error(`Post with slug ${slug} not found`);
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(simulateWaitMs, true);
    const query = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });
    if (query) return query;
    throw new Error(`Post with id ${id} not found`);
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(simulateWaitMs, true);
    return await drizzleDb.query.posts.findMany({
      orderBy: desc(postsTable.createdAt),
    });
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: or(eq(postsTable.slug, post.slug), eq(postsTable.id, post.id)),
    });

    if (postExists) throw new Error('Post with slug already exists');

    await drizzleDb.insert(postsTable).values(post);
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'createdAt' | 'slug' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });

    if (!oldPost) throw new Error(`Post with id ${id} not found`);

    const updatedAt = new Date().toISOString();

    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };

    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }

  async delete(id: string): Promise<void> {
    const post = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });

    if (!post) throw new Error(`Post with id ${id} not found`);

    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
  }
}
