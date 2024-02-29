import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createMassage, getMassages } from '../controllers/createMassage.controller.js'

const router = express.Router();

router.post('/create', verifyToken, createMassage);
router.get('/get', verifyToken, getMassages);

export default router;