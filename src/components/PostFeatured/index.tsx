import { PostContent } from "../PostContent";
import { PostCoverImage } from "../PostCoverImage";

export function PostFeatured() {
  const slug = "featured-post";
  const postLink = `/posts/${slug}`;

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
          href: postLink,
        }}
      />

      <PostContent
        title="Featured Post Title"
        createdAt="2023-01-01T10:00:00Z"
        slug={slug}
        excerpt="1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
    </div>
  );
}
