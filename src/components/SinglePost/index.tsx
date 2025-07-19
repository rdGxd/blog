import { findPublicPostsBySlugCached } from '@/lib/post/queries/public';
import Image from 'next/image';
import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';
import { SafeMarkdown } from '../SafeMarkdown';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostsBySlugCached(slug);

  return (
    <article className='mb-16'>
      <header className='group mb-4 flex flex-col gap-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          alt={post.title}
          width={1200}
          height={720}
        />
        <PostHeading url={`/post/${post.slug}`} as={'h1'}>
          {post.title}
        </PostHeading>

        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className='mb-4 text-xl text-slate-600'>{post.excerpt}</p>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
