import { findPostsBySlugCached } from "@/lib/post/queries";

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostsBySlugCached(slug);

  return (
    <div>
      <h1>Post: {post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
