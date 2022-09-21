import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";
import { getUser, getUsers, getUserEmail, putUser } from "../controllers/user.controller.js"
 
const router = Router();

router.get("/", getUsers)

router.get("/byEmail/:email", getUserEmail)

router.get("/byId/:id", getUser)

router.post("/", createUser);

router.put("/", [verifyToken, checkExistingUser], putUser)

export default router;
