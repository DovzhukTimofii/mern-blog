import { test, updateuser, deleteuser, signout, getusers, getuser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import express from "express";

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateuser);
router.delete('/delete/:userId', verifyToken, deleteuser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getusers);
router.get('/:userId', getuser);

export default router;