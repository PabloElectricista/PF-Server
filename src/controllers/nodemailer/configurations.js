import { createTransport } from 'nodemailer'

const transportator = {
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
        user: 'hardwarehotsales@gmail.com',
        pass: 'vhgpfddlqgwatuyr'
    },
    tls: {
        rejectUnauthorized: false
    }
}

export default createTransport(transportator);
//module.exports = createTransport(transportator)