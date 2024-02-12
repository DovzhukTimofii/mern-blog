import { test, updateuser, deleteuser, signout, getusers } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import express from "express";

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateuser);
router.delete('/delete/:userId', verifyToken, deleteuser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getusers);

export default router;