import { postRepository } from "@/repositories/post";

export default async function PostsLists() {
  const posts = await postRepository.findAll();
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
