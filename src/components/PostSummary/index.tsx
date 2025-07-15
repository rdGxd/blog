import { PostDate } from "../PostDate";
import { PostHeading } from "../PostHeading";

type PostSummaryProps = {
  title: string;
  createdAt: string;
  link: string;
  excerpt: string;
  postHeading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export function PostSummary({
  title,
  createdAt,
  link,
  excerpt,
  postHeading,
}: PostSummaryProps) {
  return (
    <div className="flex flex-col gap-4 sm:justify-center">
      <PostDate dateTime={createdAt} />
      <PostHeading url={link} as={postHeading}>
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
