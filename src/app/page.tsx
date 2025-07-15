import { PostFeatured } from '@/components/PostFeatured';
import PostsLists from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader className='mb-16 min-h-20' />}>
        <PostFeatured />

        <PostsLists />
      </Suspense>
    </>
  );
}
