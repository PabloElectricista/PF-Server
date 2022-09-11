import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category:
            [{ type: String }],
        price: {
            type: Number,
            default: 0,
        },
        images: 
            [{ type: String }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Product", productSchema);
