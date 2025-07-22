import { findAllPostsAdmin } from '@/lib/post/queries/admin';

export const PostListAdmin = async () => {
  const posts = await findAllPostsAdmin();

  return (
    <div className='py-16'>
      {posts.map(post => {
        return <div key={post.id}>{post.title}</div>;
      })}
    </div>
  );
};
