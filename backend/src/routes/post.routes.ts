import { Router } from "express";
import * as posts from "../controllers/post.controller.js";

const router = Router();
router.get("/", posts.list);
router.get("/:id", posts.getById);
router.post("/", posts.create);
router.put("/:id", posts.update);
router.delete("/:id", posts.remove);

export default router;
