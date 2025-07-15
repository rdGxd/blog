import Image from 'next/image';
import Link from 'next/link';

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};

export function PostCoverImage({ imageProps, linkProps }: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className={`h-full w-full overflow-hidden rounded-xl ${linkProps.className}`}
    >
      <Image
        {...imageProps}
        className={`h-full w-full object-cover object-center transition group-hover:scale-105 ${imageProps.className}`}
      />
    </Link>
  );
}
