import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },        
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        }
    },
    {
        timestamps: true
    }
);

 export default model("Review", reviewSchema)