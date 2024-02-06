import { verifyToken } from "../utils/verifyUser.js"
import { create, update } from "../controllers/post.controller.js";
import express from "express";

const router = express.Router();

router.post('/create', verifyToken, create);
router.put('/update/:userId', verifyToken, update);

export default router;