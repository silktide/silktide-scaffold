import { requirePrisma } from "../lib/prisma.js";
import type { CreatePostInput, UpdatePostInput } from "../schemas/post.schema.js";

const withRelations = { include: { author: true, categories: true } } as const;

export async function listPosts(page = 1, limit = 20) {
  const db = requirePrisma();
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    db.post.findMany({ skip, take: limit, orderBy: { createdAt: "desc" }, ...withRelations }),
    db.post.count(),
  ]);
  return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
}

export async function getPostById(id: string) {
  return requirePrisma().post.findUnique({ where: { id }, ...withRelations });
}

export async function createPost(input: CreatePostInput) {
  return requirePrisma().post.create({ data: input, include: { author: true } });
}

export async function updatePost(id: string, input: UpdatePostInput) {
  return requirePrisma().post.update({ where: { id }, data: input, include: { author: true } });
}

export async function deletePost(id: string) {
  return requirePrisma().post.delete({ where: { id } });
}
