import { Router } from "express";
import {postOrders, getOrders,putOrder,orderByUser} from "../controllers/order.controller.js"
import { verifyToken, verifyUser } from "../middlewares/authJwt.js";

const router=Router();

router.post('/', [verifyUser], postOrders)

router.get('/', [verifyToken], getOrders)

router.put('/:id', [verifyUser], putOrder)

router.get('/user/:userId', [verifyUser], orderByUser)

export default router;
