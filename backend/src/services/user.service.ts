import { requirePrisma } from "../lib/prisma.js";
import type { CreateUserInput, UpdateUserInput } from "../schemas/user.schema.js";

export async function listUsers(page = 1, limit = 20) {
  const db = requirePrisma();
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    db.user.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
    db.user.count(),
  ]);
  return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
}

export async function getUserById(id: string) {
  return requirePrisma().user.findUnique({ where: { id }, include: { posts: true } });
}

export async function createUser(input: CreateUserInput) {
  return requirePrisma().user.create({ data: input });
}

export async function updateUser(id: string, input: UpdateUserInput) {
  return requirePrisma().user.update({ where: { id }, data: input });
}

export async function deleteUser(id: string) {
  return requirePrisma().user.delete({ where: { id } });
}
