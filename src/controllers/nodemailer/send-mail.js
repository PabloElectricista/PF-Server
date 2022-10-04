import {sendEmailShopping,sendClaimMail,autoClaimRes,sendAuthMail,sendErrorMail} from './generateNotifications.js'


export async function authMail(email,username){
    await sendAuthMail(email,username)
}

export async function emailShopping(order,userBuyer){
    try{
        const {orderItems}=order
        const{email,username}=userBuyer
        const productsName=orderItems.map(p=>p.name).join(', ')
        await sendEmailShopping(email,username,productsName) 
    }catch(error){
        console.log(error)
    }
}

export async function errorMail(email,msg){
    try{
        await sendErrorMail(email,msg)
    }catch(error){
        console.log(error)
    }
}

export async function emailClaim(req,res){
    try{
        const {message,subject,email}=req.body
        await sendClaimMail(message,subject,email)
        await autoClaimRes(email,subject)
        res.status(200).send("Claim submit!")
    }catch(error){
        console.log(error)
    }
}

