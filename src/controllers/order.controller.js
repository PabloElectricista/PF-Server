import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
export const postOrders = async (req,res)=>{
    try{
        const {buyer_id,products}=req.body;
        const userBuyer=await User.findById(buyer_id).populate("shopping")
        const currentProducts = await Product.find({_id:{$in:products.map(p=>p.products_id)}}).populate("user")
        const sellers_id=currentProducts.reduce((acc,item)=>{
            if(!acc.includes(item.user._id)){
                acc.push(item.user._id)
            }
            return acc;
        },[])
        const newOrder=new Order({
            buyer_id,
            products:products.map(p=>{
                const cProduct =currentProducts.find(x=>x._id.toString()===p.products_id.toString())
                return {product:cProduct,quantity:p.quantity}
            }),
            sellers_id
        })
        const orderSaved=await newOrder.save();
        userBuyer.shopping.push(orderSaved);
        await userBuyer.save()
        const sellersUsers=await User.find({_id:{$in:sellers_id}}).populate("sales")       
        sellersUsers.forEach(async (seller)=>{
            seller.sales.push(orderSaved._id);
            await seller.save()
        })
        res.json("Order loaded!").status(201)
    }catch(error){
        res.status(500).json(error)
    }
}

export const getOrders = async(req,res)=>{
    try{
        const orders = await Order.find();
        res.status(201).send(orders)
    }catch(error){  
        res.status(404).json(error)
    }
}