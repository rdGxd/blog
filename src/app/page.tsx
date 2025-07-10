import Container from "@/components/Container";
import { Header } from "@/components/Header";
import { PostFeatured } from "@/components/PostFeatured";
import PostsLists from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<SpinLoader />}></Suspense>

      <PostFeatured />
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
