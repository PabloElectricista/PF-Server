import { model, Schema } from "mongoose";

const productSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
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
        },
        status:{
            type:String,
            enum:["New","Used"],
            default:"New"
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Product", productSchema);
