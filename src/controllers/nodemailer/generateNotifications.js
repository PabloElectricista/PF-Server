import transportator from './configurations.js'

export async function sendEmailShopping(emailBuyer,usernameBuyer,nameProducts){
    await transportator.sendMail({
        from: 'hardwarehotsales@gmail.com', 
        to: emailBuyer,
        subject: `NEW SHOPPING! ${nameProducts}`,
        text: `Hi ${usernameBuyer}, we inform you that your order is on its way`
    },
    (error,info)=>{
        if(error){
            console.log(error)
        }else{
            console.log(info)
        }
    }) 
}
export async function sendClaimMail(message,subject,email){
    await transportator.sendMail({
        from: email,
        to: 'hardwarehotsales@gmail.com',
        subject: subject,
        text: `${message} \n ${email}`
    },
    (error,info)=>{
        if(error){
            console.log(error)
        }else{
            console.log(info)
        }
    })
}
export async function autoClaimRes(email,subject){
    await transportator.sendMail({
        from: 'hardwarehotsales@gmail.com',
        to: email,
        subject: subject,
        text: `Hello! Your claim will be answered shortly, thank you for informing us of your problem.`
    },
    (error,info)=>{
        if(error){
            console.log(error)
        }else{
          console.log(info)
        }
    })
}

export async function sendAuthMail(email,username){
    await  transportator.sendMail({
        from: 'hardwarehotsales@gmail.com',
        to: email,
        subject: "WELCOME!",
        text: `We welcome you to our page ${username}! Thank you for choosing us, here you can find the supplies you need at the best price`
    })
}

export async function sendErrorMail(email,msg){
    await  transportator.sendMail({
        from: 'hardwarehotsales@gmail.com',
        to: email,
        subject: "Error",
        text: msg
    })
}