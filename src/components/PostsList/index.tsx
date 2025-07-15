import { findAllPublicPosts } from "@/lib/post/queries";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";

export default async function PostsLists() {
  const posts = await findAllPublicPosts();

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const postLink = `/posts/${post.slug}`;
        return (
          <div key={post.id} className="flex flex-col gap-4 group">
            <PostCoverImage
              imageProps={{
                src: post.coverImageUrl,
                width: 1200,
                height: 720,
                alt: post.title,
                priority: false,
              }}
              linkProps={{
                href: postLink,
              }}
            />

            <PostSummary
              title={post.title}
              createdAt={post.createdAt}
              link={postLink}
              excerpt={post.excerpt}
              postHeading="h2"
            />
          </div>
        );
      })}
    </div>
  );
}
