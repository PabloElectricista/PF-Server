import mongoose, { model, Schema } from "mongoose";

const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User',
             },
     },
    {
      timestamps: true,
    }
)

const productSchema = new Schema(
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
        },
        status:{
            type:String,
            enum:["New","Used"],
            default:"New"
        },
        isDisabled:{
            type: Boolean,
            default:false
        },
        reviews: [reviewSchema],
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Product", productSchema);
