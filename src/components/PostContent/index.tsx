import { formatDateTime, formatDistanceToNow } from "@/utils/format-datetime";
import { PostHeading } from "../PostHeading";

type PostContentProps = {
  title: string;
  createdAt: string;
  slug: string;
  excerpt: string;
};

export function PostContent({
  title,
  createdAt,
  slug,
  excerpt,
}: PostContentProps) {
  return (
    <div className="flex flex-col gap-4 sm:justify-center">
      <time dateTime={createdAt} className="text-slate-600 text-sm/tight block">
        {formatDateTime(createdAt)} - {formatDistanceToNow(createdAt)}
      </time>
      <PostHeading url={slug} as="h2">
        {title}
      </PostHeading>
      <p>{excerpt}</p>
    </div>
  );
}
