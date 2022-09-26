import { Router } from "express";
import {emailClaim} from '../controllers/nodemailer/send-mail.js'

const router = Router();

router.post('/send-claim',emailClaim)

export default router