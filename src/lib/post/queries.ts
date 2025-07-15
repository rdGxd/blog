import { postRepository } from "@/repositories/post";
import { cache } from "react";

export const findAllPublicPostsCached = cache(async () =>
  postRepository.findAllPublic()
);

export const findPostsBySlugCached = cache(async (slug: string) =>
  postRepository.findBySlug(slug)
);

export const findPostsByIdCached = cache(async (id: string) =>
  postRepository.findById(id)
);
