import {Schema,model} from "mongoose"

const orderSchema=new Schema({
    buyer_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        product:{
            type: Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
        }
    }],
    status:{
        type: String,
        enum:["Pending","Canceled","Completed"],
        default:"Pending"
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    total_amount:{
        type: Number,
        default:function(){
            return this.products.reduce((acc,p)=>{
                return acc+(p.product.price * p.quantity)
            },0)
        }
    }
})

export default model("Order",orderSchema)