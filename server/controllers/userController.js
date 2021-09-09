const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {User,UserProfile,OrderList} = require("../models/models")

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
        const user = await User.create({email,role, password: hashPassword})
        const userProfile = await UserProfile.create({email,name,userId: user.id})
        const orderList = await OrderList.create({userId: user.id})
        // user.setOrderList(orderList)
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