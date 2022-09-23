import {sendEmailShopping,sendClaimMail,autoClaimRes,sendAuthMail} from './generateNotifications.js'
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


