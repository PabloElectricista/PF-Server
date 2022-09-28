import { Router } from "express";
import Product from "../models/Product.js"
import {
  getProducts,
  createProduct,
  updateProductById,
  getProductById,
  createProductReview
} from "../controllers/products.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.post("/", [verifyToken], createProduct);

router.post("/:id/reviews", [verifyToken], createProductReview)

router.put("/:productId", [verifyToken], updateProductById);

export default router;
