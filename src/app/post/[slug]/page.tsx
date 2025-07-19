import { SinglePost } from '@/components/SinglePost';
import { SpinLoader } from '@/components/SpinLoader';
import { findPublicPostsBySlugCached } from '@/lib/post/queries/public';
import { Metadata } from 'next';
import { Suspense } from 'react';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPublicPostsBySlugCached(slug);
  return {
    title: `${post.title}`,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<SpinLoader className='mb-16 min-h-20' />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
