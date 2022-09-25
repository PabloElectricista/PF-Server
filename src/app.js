import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import fileUpload from "express-fileupload"
import initialfunction from "./libs/initialfunction.js"
// Routes
import indexRoutes from "./routes/index.routes.js";

const app = express();
initialfunction()
// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(cors());

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

app.use((error, req, res, next)=>{
  const {status, message} = error;
  console.log(`error: ${error}`)
  //console.log(res)
  res.status(status).send(message)
})

export default app;
