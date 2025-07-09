import Image from "next/image";
import Link from "next/link";

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};

export function PostCoverImage({ imageProps, linkProps }: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className={`w-full h-full overflow-hidden rounded-xl ${linkProps.className}`}
    >
      <Image
        {...imageProps}
        className={`group-hover:scale-105 transition w-full h-full object-cover object-center ${imageProps.className}`}
      />
    </Link>
  );
}
