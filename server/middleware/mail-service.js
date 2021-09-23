const nodemailer = require('nodemailer')

class MailService {

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: "abduragimovapp@gmail.com",//process.env.SMTP_USER,
            to,
            subject:"Активация аккаунта на сайте " + process.env.API_URL,
            text:"",
            html: 
            `
                <div>
                    <h1>Для активации аккаунта пройдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()