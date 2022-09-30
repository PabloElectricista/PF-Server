import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProductById,
  getProductById,
  createProductReview
} from "../controllers/products.controller.js";
import { verifyToken, verifyUser } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.post("/", [verifyToken], createProduct);

router.post("/:id/reviews", [verifyUser], createProductReview)

router.put("/:productId", [verifyToken], updateProductById);

export default router;
