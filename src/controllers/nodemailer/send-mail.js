import {sendEmailShopping,sendClaimMail,autoClaimRes,sendAuthMail,sendErrorMail} from './generateNotifications.js'
import Product from  '../../models/Product.js';

export async function authMail(email,username){
    await sendAuthMail(email,username)
}

export async function emailShopping(order){
    const {buyer, products}=order
    const{email,username}=buyer
    const productsName=products.map(p=>p.product.name).join(', ')
    await sendEmailShopping(email,username,productsName)
}

export async function errorMail(email,msg){
    await sendErrorMail(email,msg)
}

export async function emailClaim(req,res){
    try{

        console.log(req)
        const {message,subject,email}=req.body
        await sendClaimMail(message,subject,email)
        await autoClaimRes(email,subject)
        res.status(200).send("Claim submit!")
    }catch(error){
        res.status(500).send(error)
    }
}

