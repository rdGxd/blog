import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  const post = posts[0];

  return (
    <div className='group mb-5 flex flex-col gap-4'>
      <PostCoverImage
        imageProps={{
          src: post.coverImageUrl,
          width: 1200,
          height: 720,
          alt: post.title,
          priority: true,
        }}
        linkProps={{
          href: `/post/${post.slug}`,
        }}
      />

      <PostSummary
        title={post.title}
        createdAt={post.createdAt}
        link={post.slug}
        excerpt={post.excerpt}
        postHeading='h1'
      />
    </div>
  );
}
