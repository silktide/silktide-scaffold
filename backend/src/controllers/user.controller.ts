import type { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    res.json(await userService.listUsers(page, limit));
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) { res.status(404).json({ error: "User not found" }); return; }
    res.json({ data: user });
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const input = createUserSchema.parse(req.body);
    res.status(201).json({ data: await userService.createUser(input) });
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const input = updateUserSchema.parse(req.body);
    res.json({ data: await userService.updateUser(req.params.id, input) });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
}
