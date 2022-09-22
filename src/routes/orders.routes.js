import { Router } from "express";
import {postOrders, getOrders} from "../controllers/order.controller.js"

const router=Router();

router.post('/',postOrders)
router.get('/',getOrders)

export default router;
