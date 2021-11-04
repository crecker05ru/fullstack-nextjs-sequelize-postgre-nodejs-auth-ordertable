const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User,UserProfile,OrderList} = require("../models/models")
const mailService = require("../middleware/mail-service")
const uuid = require("uuid")

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email,name, password, role} = req.body
        if (!email || !password){
            return next(ApiError.badRequest("Неверный логин или email"))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badRequest("Такой пользователь уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 7)
        const activationLink = uuid.v4()

        const user = await User.create({email,role, password: hashPassword})
        await mailService.sendRegistrationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`)

        const userProfile = await UserProfile.create({email,name,userId: user.id})
        const orderList = await OrderList.create({userId: user.id})
        //user.setOrderList(orderList)
        userProfile.setOrderList(orderList)
        
        console.log('user',{...user})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token,orderList})
    }
    async login(req , res, next) {    
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal("Пользователь не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal("неверный логин или пароль"))
        }

        const token = generateJwt(user.id, user.email,user.role)
        return res.json({token})
    }

    async forgotPassword (req,res ,next){
        try{
            const {email} = req.body
            const user = await User.findOne({where:{email}})
            if(!user){
                // return res.json(`пользователь ${email} не найден`)
                return res.status(400).send(`пользователь c  ${email} не существует`)
            }
            const token = uuid.v4()
            const link = `${process.env.API_URL}/reset-password?token=${token}&id=${user.id}`
            await mailService.sendResetPasswordMail(email,link)

            return res.send("Письмо отправлено на ваш email")
            // return res.json({email})
        }catch(e){
            console.log(e)
            return res.send("Непредвиденная ошибка")
        }        
    }

    async resetPassword(req,res,next){
        try{
            // const id = req.params.id
            const id = req.body.id
            const user = await User.findOne({where:{id}})
            const hashPassword = await bcrypt.hash(req.body.password, 7)
            user.password = hashPassword
            await mailService.sendChangedPasswordMail(user.email)
            await user.save()
            return res.send("Новый пароль установлен")
        }catch(e){
            console.log(e)
            return res.send("Непредвиденная ошибка")
        }
    }
    async logout (req, res,next){
        const {token} = req.body
        if(!token){
            return res.status(200).json({message: "logged out"})
        }
        token = null
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email,req.user.role)
        return res.json({token})
    }
    async getData(req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(401).json({message: "Не авторизован токен"})
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY) // error when decoded
            const {id}= decoded
                const user = await User.findOne({
                    where:{id},
                    attributes:["id","email"],
                    include: [
                        {
                        model: UserProfile,
                        as: "userProfile"
                    },
                    {
                        model: OrderList,
                        as: "orderList"
                    },
                ]
                })
                return res.json(user)
        } catch (e) {
            res.status(401).json({message: "Не авторизован ошибкой"})
        }
        // const token = req.headers.authorization.split(' ')[1]
        // const decoded = jwt.verify(token, process.env.SECRET_KEY) // error when decoded
        // const {id}= decoded
        //     const user = await User.findOne({
        //         where:{id},
        //         attributes:["id","email"],
        //         include: [
        //             {
        //             model: UserProfile,
        //             as: "userProfile"
        //         },
        //         {
        //             model: OrderList,
        //             as: "orderList"
        //         },
        //     ]
        //     })
        //     return res.json(user)
        
    }
    async findById(req, res){
        const {id} = req.params
        const user = await User.findOne({
            where:{id},
            attributes:["id","email"],
            include: [
                {
                model: UserProfile,
                as: "userProfile"
            },
            {
                model: OrderList,
                as: "orderList"
            },
        ]
        })
        return res.json(user)
    }
}

module.exports = new UserController()