import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import fileUpload from "express-fileupload"
import initialfunction from "./libs/initialfunction.js"
import jwt_decode from "jwt-decode";
import {errorMail} from './controllers/nodemailer/send-mail.js'

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

app.use(async (error, req, res, next)=>{
  
  const {status,message} = error;
  console.log(req.body)
  const token = req.headers["credentials"];

  const decoded = jwt_decode(token)
  if(decoded) await errorMail(decoded.email, message)
  
  res.status(status||500).send({message})

})

export default app;
