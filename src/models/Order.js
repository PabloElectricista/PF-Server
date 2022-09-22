import {Schema,model} from "mongoose"

const orderSchema=new Schema({
    buyer_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    sellers_id:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    products:[{
        product:{
            type: Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
        }
    }],
    total_amount:{
        type: Number,
        default:function(){
            return this.products.reduce((acc,p)=>{
                //console.log(p.product)
                return acc+(p.product.price * p.quantity)
            },0)
        }
    }
})

orderSchema.methods.getOwnSales=function(userId){
    return this.products.reduce((acc,item)=>{
        if(item.product.user._id.toString()===userId.toString()){
            console.log(item.product)
            acc.push({product:item.product,quantity:item.quantity})
        }
        return acc
    },[])
}
orderSchema.methods.overallProfit=function(userId){
    return this.products.reduce((acc,item)=>{
        if(item.product.user._id.toString()===userId.toString()){
            acc+=item.product.price*item.quantity
        }
        return acc
    },0)
}

export default model("Order",orderSchema)