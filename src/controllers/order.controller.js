import Order from '../models/Order.js'
import User from '../models/User.js'
import {emailShopping} from './nodemailer/send-mail.js'


export const postOrders = async (req,res,next)=>{
    try {
        const userBuyer = await User.findById(req.user._id).populate("shopping")
        const newOrder = new Order({
          orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          shippingPrice: req.body.shippingPrice,
          taxPrice: req.body.taxPrice,
          totalPrice: req.body.totalPrice,
          user: userBuyer._id,
        });
        const orderSaved = await newOrder.save();
        userBuyer.shopping.push(orderSaved);
        const savedUser=await userBuyer.save();
        await emailShopping(orderSaved,savedUser)
        res.status(201).json({ message: "New Order Created", order:orderSaved });
    } catch (error) {
      return next(error)
    }
}

export const getOrders = async(req,res,next)=>{
    try{
        const {start}=req.query
        const count = await Order.estimatedDocumentCount()
        const limit = 20
        const index = parseInt(start) * limit
        const orders = await Order.find().populate("user").skip(index).limit(limit).sort({"createdAt":"desc"});
        res.status(201).json({orders,count})
    }catch(error){  
        return next(error)
    }
}

export const putOrder= async (req,res,next)=>{
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
          };
          const updatedOrder = await order.save();
          res.status(200).json({ message: "Order Paid", order: updatedOrder });
        } else {
          res.status(404).json({ message: "Order Not Found" });
        }
      } catch (error) {
        next(error)
      }
}

export const orderByUser=async (req,res,next)=>{
    try{
        const {userId}=req.params;
        const currentUser = await User.findById(userId).populate("shopping")
        if(!currentUser) res.status(500).json({error: "User not found"})
        return res.json(currentUser.shopping)
    }catch(error){
        return next(error)
    }
}

export const orderById = async (req,res,next)=>{
    try{
        if(!req.params.id) return res.status(500).json({error: "Id not found"})
        const order = await Order.findById(req.params.id);
        if (order) return res.status(200).json(order);
        return res.status(404).json({error})
    } catch(error) {
      return next(error);
    }
}