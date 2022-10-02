import {Router} from "express";
import Order from "../models/Order.js";
import {postOrders, getOrders,putOrder,orderByUser,orderById} from "../controllers/order.controller.js"
import { verifyToken, verifyUser } from "../middlewares/authJwt.js";

const router = Router();


router.get("/",[verifyToken], getOrders)
  
router.get('/user/:userId', [verifyUser], orderByUser)

router.get("/:id",[verifyUser], orderById) 

router.post("/",[verifyUser],postOrders)

router.put('/:id/pay', [verifyUser], putOrder)



export default router;