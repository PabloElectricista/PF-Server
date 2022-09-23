import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import fileUpload from "express-fileupload"
import initialfunction from "./libs/initialfunction.js"
// Routes
import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import orderRouter from "./routes/orders.routes.js"
const app = express();
initialfunction()
// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads"
}));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", indexRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders",orderRouter)
export default app;
