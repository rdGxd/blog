import Container from "@/components/Container";
import PostsLists from "@/components/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";

export default async function HomePage() {
  return (
    <Container>
      <header>
        <h1 className="text-6xl font-bold text-center py-8">Blog</h1>
      </header>

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
