const {User,UserProfile,OrderList} = require("../models/models")

class UserProfileController {
    async update (req,res){
        const {email,name,secondName,nickname,avatar,dateOfBirth,aboutSelf} = req.body
        const userProfile = await UserProfile.findOne({where:{email}})
        userProfile.name = name 
        userProfile.secondName = secondName
        userProfile.nickname = nickname
        userProfile.aboutSelf = aboutSelf
        await userProfile.save()
        return res.json({name,secondName,nickname,avatar,dateOfBirth,aboutSelf})
    }

    async getAll (req, res){
        const usersProfiles = await UserProfile.findAll({
            include:[
                {
                    model: User,
                    as: "user",
                    attributes:["id","email"]
                }
            ]
        })
        return res.json(usersProfiles)

    }

    async getById (req, res) {
        const {id} = req.params
        const usersProfile = await UserProfile.findOne({
            where:{id},
            include:[
                {
                    model: User,
                    as: "user",
                    attributes:["id","email"]
                },{
                    model: OrderList,
                    as: "orderList"
                }

            ]

        })
        return res.json(usersProfile)
    }
}

module.exports = new UserProfileController()