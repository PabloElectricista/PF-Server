import {Router} from 'express'
const router = Router()
import productRoutes from "./products.routes.js";
import usersRoutes from "./user.routes.js";
import orderRouter from "./orders.routes.js"
import nodemailerRoutes from "./nodemailer.routes.js";
router.get("/", (req, res) => {
  res.send(`
        <br/><br/><br/>
        <center><h4>Server running ok</h4></center>
  `);
});

router.use("/products", productRoutes);

router.use("/users", usersRoutes);

router.use("/orders", orderRouter)

router.use("/mail",nodemailerRoutes)
export default router
