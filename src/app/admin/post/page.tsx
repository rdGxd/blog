import { PostListAdmin } from '@/components/admin/PostListAdmin';
import { SpinLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin - Posts',
};

export default async function AdminPostPage() {
  return (
    <div className='py-16'>
      <Suspense fallback={<SpinLoader />}>
        <PostListAdmin />
      </Suspense>
    </div>
  );
}
