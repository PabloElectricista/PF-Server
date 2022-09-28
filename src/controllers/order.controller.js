import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import {emailShopping} from './nodemailer/send-mail.js'
export const postOrders = async (req,res,next)=>{
    try{
        const {buyer_id,products}=req.body;
        const userBuyer=await User.findById(buyer_id).populate("shopping")
        const currentProducts= await updateStockAndGetProducts(products)
        const newOrder=new Order({
            buyer:userBuyer,
            products:currentProducts
        })
        const orderSaved=await newOrder.save();
        userBuyer.shopping.push(orderSaved);
        await userBuyer.save()
        await emailShopping(orderSaved,userBuyer)
        res.json("Order loaded!").status(201)
    }catch(error){
        return next(error)
    }
}
async function updateStockAndGetProducts(products){

    const currentProducts= products.map( async p=>{
        const product = await Product.findById(p.id)
        product.stock-=p.quantity
        await product.save()
        return {product, quantity:p.quantity}
    })
    const productsToOrder= await Promise.all(currentProducts)
    return productsToOrder
}

export const getOrders = async(req,res,next)=>{
    try{
        const {start}=req.query
        const limit = 20
        const index = parseInt(start) * limit
        const orders = await Order.find().populate("buyer").skip(index).limit(limit).sort({"createdAt":"desc"});
        res.status(201).send(orders)
    }catch(error){  
        return next(error)
    }
}

export const putOrder= async (req,res,next)=>{
    try{
        const {id}=req.params
        const {update}=req.body;
        const currentOrder=await Order.findOneAndUpdate({_id:id},update)
        await currentOrder.save();
        res.status(200).send(currentOrder)
    }catch(error){
        return next(error)
    }
}

export const orderByUser=async (req,res,next)=>{
    try{
        const {userId}=req.params;
        const currentUser = await User.findById(userId).populate("shopping")

        console.log(currentUser.shopping)
        res.send(currentUser.shopping)
    }catch(error){
        return next(error)
    }
}
