import {Router} from "express";
import Order from "../models/Order.js";
import {postOrders, getOrders,putOrder,orderByUser,orderById} from "../controllers/order.controller.js"
import { verifyToken, verifyUser } from "../middlewares/authJwt.js";

const router = Router();


router.get("/",[verifyToken], getOrders)
  
router.get('/user/:userId', [verifyToken], orderByUser)

router.get("/:id",[verifyToken], orderById) 

router.post("/",[verifyUser],postOrders)

router.put('/:id/pay', [verifyToken], putOrder)

export default router;