import Link from "next/link";

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export function PostHeading({ children, url, as: Tag }: PostHeadingProps) {
  const headingClassesMap = {
    h1: "text-2xl/tight font-extrabold sm:text-4xl",
    h2: "text-xl/tight font-bold sm:text-3xl",
    h3: "text-lg/tight font-semibold sm:text-2xl",
    h4: "text-base/tight font-medium sm:text-xl",
    h5: "text-sm/tight font-medium sm:text-lg",
    h6: "text-xs/tight font-medium sm:text-base",
  };

  return (
    <Tag className={headingClassesMap[Tag]}>
      <Link href={url}>{children}</Link>
    </Tag>
  );
}
