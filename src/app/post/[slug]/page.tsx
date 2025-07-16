import { SinglePost } from '@/components/SinglePost';
import { SpinLoader } from '@/components/SpinLoader';
import {
  findAllPublicPostsCached,
  findPostsBySlugCached,
} from '@/lib/post/queries';
import { Metadata } from 'next';
import { Suspense } from 'react';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPostsBySlugCached(slug);
  return {
    title: `${post.title}`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await findAllPublicPostsCached();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<SpinLoader className='mb-16 min-h-20' />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
