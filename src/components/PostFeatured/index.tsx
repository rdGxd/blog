import { findAllPublicPosts } from "@/lib/post/queries";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";

export async function PostFeatured() {
  const posts = await findAllPublicPosts();
  const post = posts[0];

  return (
    <div className="flex flex-col gap-4 group mb-5">
      <PostCoverImage
        imageProps={{
          src: "/images/bryen_0.png",
          width: 1200,
          height: 720,
          alt: "Featured Post",
          priority: true,
        }}
        linkProps={{
          href: post.slug,
        }}
      />

      <PostSummary
        title={post.title}
        createdAt={post.createdAt}
        link={post.slug}
        excerpt={post.excerpt}
        postHeading="h1"
      />
    </div>
  );
}
