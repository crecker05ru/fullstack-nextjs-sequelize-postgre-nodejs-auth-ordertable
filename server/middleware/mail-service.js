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
    async sendRegistrationMail(to, link){
        try{
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject:"Регистрация аккаунта на сайте " + process.env.API_URL,
                text:"",
                html: 
                `
                    <div>
                        <h1>Регистрация на ${process.env.API_URL} прошла успешно </h1>    
                    </div>
                `
            })
        }catch(e){
            console.log(e,"email not sent")
        }
        
    }
    async sendResetPasswordMail (to,link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject:"Сброс пароля на сайте " + process.env.API_URL,
            text:"",
            html: 
            `
                <div>
                    <h1>Для сброса пароля пройдите по ссылке </h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }

    async sendChangedPasswordMail (to){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject:"Ваш пароль на сайте " + process.env.API_URL +" был изменен",
            text:"",
            html:
            `
                <div>
                    <h1>Вы изменили пароль</h1>
                </div>
            `

        })
    }
}

module.exports = new MailService()