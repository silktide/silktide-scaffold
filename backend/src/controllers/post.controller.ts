import type { Request, Response, NextFunction } from "express";
import * as postService from "../services/post.service.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    res.json(await postService.listPosts(page, limit));
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) { res.status(404).json({ error: "Post not found" }); return; }
    res.json({ data: post });
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createPostSchema.parse(req.body);
    res.status(201).json({ data: await postService.createPost(input) });
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updatePostSchema.parse(req.body);
    res.json({ data: await postService.updatePost(req.params.id, input) });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await postService.deletePost(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
}
