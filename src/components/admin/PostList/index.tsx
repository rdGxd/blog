import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import Link from 'next/link';
import { DeletePostButtonAdmin } from '../DeletePostButton';

export const PostListAdmin = async () => {
  const posts = await findAllPostsAdmin();

  return (
    <div className='mb-16'>
      {posts.map(post => {
        return (
          <div
            key={post.id}
            className={`px-2 py-2 ${!post.published && 'bg-slate-600'} flex items-center justify-between gap-2`}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className='text-xs text-slate-300 italic'>
                (Não publicado)
              </span>
            )}

            <DeletePostButtonAdmin title={post.title} id={post.id} />
          </div>
        );
      })}
    </div>
  );
};
