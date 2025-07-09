import Container from "@/components/Container";
import { Header } from "@/components/Header";
import { PostCoverImage } from "@/components/PostCoverImage";
import { PostHeading } from "@/components/PostHeading";
import PostsLists from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <PostCoverImage
          imageProps={{
            src: "/images/bryen_5.png",
            width: 1200,
            height: 600,
            alt: "A beautiful landscape",
            priority: true,
          }}
          linkProps={{
            href: "#",
          }}
        />
        <div className="flex flex-col gap-4 sm:justify-center">
          <time
            dateTime="2023-01-01"
            className="text-slate-600 text-sm/tight block"
          >
            January 1, 2023 10:100
          </time>
          <PostHeading url="#" as="h1">
            Featured Post Title
          </PostHeading>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            ab dolorum nobis non aperiam nam, exercitationem accusantium vel
            obcaecati sint sit ipsum molestias! Beatae recusandae harum, aliquid
            necessitatibus eos enim.
          </p>
        </div>
      </section>

      <main>
        <Suspense fallback={<SpinLoader />}>
          <PostsLists />
        </Suspense>
      </main>
      <footer className="text-center py-4">
        <p className="text-gray-500">© 2023 My Blog</p>
      </footer>
    </Container>
  );
}
