import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';
import { SafeMarkdown } from '../SafeMarkdown';
import { findPublicPostsBySlugFromApiCached } from '@/lib/post/queries/public';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const postRes = await findPublicPostsBySlugFromApiCached(slug);

  if (!postRes.success) {
    notFound();
  }

  const post = postRes.data;

  return (
    <article className='mb-16'>
      <header className='group mb-4 flex flex-col gap-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          alt={post.title}
          width={1200}
          height={720}
          priority
        />
        <PostHeading url={`/post/${post.slug}`} as={'h1'}>
          {post.title}
        </PostHeading>

        <p>
          {post.author.name} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className='mb-4 text-xl text-slate-600'>{post.excerpt}</p>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
