import Container from "@/components/Container";
import { Header } from "@/components/Header";
import PostsLists from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <Link href="#" className="w-full h-full overflow-hidden rounded-xl">
          <Image
            className="group-hover:scale-105 transition w-full h-full object-cover object-center"
            src="/images/bryen_0.png"
            alt="Description of image"
            width={1200}
            height={720}
            priority
          />
        </Link>
        <div className="flex flex-col gap-4 sm:justify-center">
          <time
            dateTime="2023-01-01"
            className="text-slate-600 text-sm/tight block"
          >
            January 1, 2023 10:100
          </time>
          <h1 className="text-2xl/tight font-extrabold sm:text-4xl ">
            <Link href="#" className="text-3xl font-bold hover:underline">
              Featured Post Title
            </Link>
          </h1>
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
