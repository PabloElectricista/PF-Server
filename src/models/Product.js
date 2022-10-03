import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,

    },
    colors: [{ type: String }],
    category: [{ type: String }],
    images: [{ type: String }],
    brand: {
      type: String,
      required: true,
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
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["New", "Used"],
      default: "New",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    allReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    //reviews: [reviewSchema],
    numReviews: {
      type: Number
    },
    rating: {
      type: Number/*,
      default: function () {
        let result = 0;
        if (this.allReviews.length > 0) {
          let aux = this.allReviews.reduce(
            (acc, item) => item.rating + acc,
            0
          );
          result = aux / this.allReviews.length;
        }
        console.log(result);
        return result;
      },*/
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", productSchema);
