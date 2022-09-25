import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProductById,
  getProductById,
} from "../controllers/products.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.post("/", [verifyToken], createProduct);

router.put("/:productId", [verifyToken], updateProductById);

export default router;
