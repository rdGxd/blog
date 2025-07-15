import { postRepository } from "@/repositories/post";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublicPostsCached = cache(async () =>
  postRepository.findAllPublic()
);

export const findPostsBySlugCached = cache(async (slug: string) => {
  const post = await postRepository.findBySlug(slug).catch(() => undefined);

  if (!post) notFound();

  return post;
});

export const findPostsByIdCached = cache(async (id: string) =>
  postRepository.findById(id)
);
