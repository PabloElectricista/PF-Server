import {Router} from 'express'
import filtersRoutes from './filters.routes.js'
const router = Router()

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Products API"
  });
});
router.use("/filter",filtersRoutes)

export default router