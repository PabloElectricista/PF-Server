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

router.post("/", 
// [verifyToken], 
createProduct);

router.post("/reviews/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
})

router.put("/:productId", [verifyToken], updateProductById);

export default router;
