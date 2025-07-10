import { postRepository } from "@/repositories/post";
import { PostContent } from "../PostContent";
import { PostCoverImage } from "../PostCoverImage";

export default async function PostsLists() {
  const posts = await postRepository.findAll();
  const postLink = (slug: string) => `/posts/${slug}`;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
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
              href: postLink(post.slug),
            }}
          />

          <PostContent
            title={post.title}
            createdAt={post.createdAt}
            slug={postLink(post.slug)}
            excerpt={post.excerpt}
          />
        </div>
      ))}
    </div>
  );
}
