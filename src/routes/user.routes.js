import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";
import { getUser, getUsers, getUserEmail } from "../controllers/user.controller.js"
 
const router = Router();

router.get("/", getUsers)
router.get("/byEmail/:email", getUserEmail)
router.get("/byId/:id", getUser)
router.post("/", [verifyToken, isAdmin, checkExistingUser], createUser);

export default router;
