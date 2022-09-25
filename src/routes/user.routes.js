import { Router } from "express";
import { verifyToken, verifyUser } from "../middlewares/authJwt.js";
import { createUser, getUser, getUsers  } from "../controllers/user.controller.js"
import { getUserEmail, putUser } from "../controllers/user.controller.js"
 
const router = Router();

router.get("/", [verifyToken], getUsers)

router.get("/byEmail/:email", [verifyToken], getUserEmail)

router.get("/byId/:id", [verifyToken], getUser)

router.post("/", createUser);

router.put("/", [verifyUser], putUser)

export default router;
