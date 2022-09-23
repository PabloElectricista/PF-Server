import { Router } from "express";
import {postOrders, getOrders,putOrder} from "../controllers/order.controller.js"
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";
const router=Router();

router.post('/',[verifyToken], postOrders)
router.get('/',/*[verifyToken, isAdmin],*/ getOrders)
router.put('/',/*[verifyToken, isAdmin],*/ putOrder)

export default router;
