import { findPostsBySlugCached } from "@/lib/post/queries";
import Image from "next/image";
import { PostDate } from "../PostDate";
import { PostHeading } from "../PostHeading";

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostsBySlugCached(slug);

  return (
    <article className="mb-16">
      <header className="group flex flex-col gap-4 mb-4">
        <Image
          className="rounded-xl"
          src={post.coverImageUrl}
          alt={post.title}
          width={1200}
          height={720}
        />
        <PostHeading url={`/post/${post.slug}`} as={"h1"}>
          {post.title}
        </PostHeading>

        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className="mb-4 text-xl text-slate-600">{post.excerpt}</p>
      <div>{post.content}</div>
    </article>
  );
}
