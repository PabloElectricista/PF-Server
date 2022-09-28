import { model, Schema } from "mongoose";

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
        all_reviews: [{
            type: Schema.Types.ObjectId,
            ref:"Review"
            //default:[]
        }],
        numReviews:{
            type: Number,
            default: function(){
                return this.all_reviews.length
            }
        },
        rating:{
            type: Number,
            default : function(){
                return this.all_reviews.reduce((acc, item) => item.rating + acc, 0) / product.all_reviews.length;
            }
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Product", productSchema);
