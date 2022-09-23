import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductById,
} from "../controllers/products.controller.js";
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.post("/", [verifyToken], createProduct);

router.put("/:productId", [verifyToken], updateProductById);

// router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

export default router;
