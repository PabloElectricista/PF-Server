import { Router } from "express";
const router=Router();

import {filterProduct} from "../controllers/filter.controller.js";

router.get('/',filterProduct);

export default router;

