import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 4000;
export const SECRET = process.env.PASS_SEC;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

// mongosh "mongodb+srv://cluster0.ufzb9wj.mongodb.net/myFirstDatabase" --apiVersion 1 --username bgoode

// MONGODB_URI = "mongodb+srv://bgoode:bgoode@cluster0.ufzb9wj.mongodb.net/?retryWrites=true&w=majority"