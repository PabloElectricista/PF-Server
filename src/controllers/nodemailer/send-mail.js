import {sendEmailShopping,sendClaimMail,autoClaimRes,sendAuthMail,sendErrorMail} from './generateNotifications.js'
import Product from  '../../models/Product.js';
import User from '../../models/User.js';

export async function authMail(email,username){
    await sendAuthMail(email,username)
}

export async function emailShopping(order,userBuyer){
    const {orderItems}=order
    const{email,username}=userBuyer
    const productsName=orderItems.map(p=>p.name).join(', ')
    await sendEmailShopping(email,username,productsName) 
}

export async function errorMail(email,msg){
    await sendErrorMail(email,msg)
}

export async function emailClaim(req,res){
    try{
        const {message,subject,email}=req.body
        await sendClaimMail(message,subject,email)
        await autoClaimRes(email,subject)
        res.status(200).send("Claim submit!")
    }catch(error){
        res.status(500).send(error)
    }
}

