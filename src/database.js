import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

try {
  await mongoose.connect(MONGODB_URI);
} catch (error) {
  console.error(error.message);
}
