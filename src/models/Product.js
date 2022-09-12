import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        colors:
            [{ type: String }],
        category:
            [{ type: String }],
        images:
            [{ type: String }],
        brand: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            default: 1,
        },
        price: {
            type: Number,
            default: 0,
        },
        summary: {
            type: String
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Product", productSchema);
