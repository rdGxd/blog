import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin - Posts',
};

export default async function AdminPostPage() {
  const posts = await findAllPostsAdmin();

  return (
    <div className='py-16'>
      {posts.map(post => {
        return <div key={post.id}>{post.title}</div>;
      })}
    </div>
  );
}
