import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import { Trash2Icon } from 'lucide-react';
import Link from 'next/link';

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

            <button
              className={`cursor-pointer text-red-500 transition hover:scale-110 hover:text-red-700 [&_svg]:h-4 [&_svg]:w-4`}
              aria-label={`Excluir post ${post.title}`}
              title={`Excluir post ${post.title}`}
            >
              <Trash2Icon />
            </button>
          </div>
        );
      })}
    </div>
  );
};
