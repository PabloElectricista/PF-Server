import { Router } from "express";
import {postOrders, getOrders,putOrder,orderByUser} from "../controllers/order.controller.js"
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";
const router=Router();

router.post('/',[verifyToken], postOrders)
router.get('/',[verifyToken, isAdmin], getOrders)
router.put('/:id',[verifyToken, isAdmin], putOrder)
router.get('/user/:userId',orderByUser)
export default router;
