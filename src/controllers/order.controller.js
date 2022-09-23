import Order from '../models/Order.js'
import User from '../models/User.js'
import Product from '../models/Product.js'

export const postOrders = async (req,res)=>{
    try{
        const {buyer_id,products}=req.body;
        const userBuyer=await User.findById(buyer_id).populate("shopping")
        const currentProducts= await updateStockAndGetProducts(products)
        const newOrder=new Order({
            buyer_id,
            products:currentProducts
        })
        const orderSaved=await newOrder.save();
        userBuyer.shopping.push(orderSaved);
        await userBuyer.save()
        res.json("Order loaded!").status(201)
    }catch(error){
        res.status(500).json(error)
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

export const getOrders = async(req,res)=>{
    try{
        const orders = await Order.find().sort({"createdAt":"desc"});
        res.status(201).send(orders)
    }catch(error){  
        res.status(404).json(error)
    }
}

export const putOrder= async (req,res)=>{
    try{
        const {id}=req.params
        const {update}=req.body;
        const currentOrder=await Order.findOneAndUpdate({_id:id},update)
        await currentOrder.save();
        res.status(200).send(currentOrder)
    }catch(error){
        res.status(500).json(error)
    }
}

export const orderByUser=async (req,res)=>{
    try{
        const {userId}=req.params;
        const currentUser = await User.findById(userId).populate("shopping")

        console.log(currentUser.shopping)
        res.send(currentUser.shopping)
    }catch(error){
        res.status(500).send(error)
    }
}