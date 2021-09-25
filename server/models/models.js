const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const User = sequelize.define("user",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Order = sequelize.define("order",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    position: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING},
    option: {type: DataTypes.STRING,defaultValue: "no"},
    link: {type: DataTypes.STRING(777)},
    price: {type: DataTypes.FLOAT,defaultValue: 0},
    count: {type: DataTypes.INTEGER,defaultValue: 0},
    total: {type: DataTypes.FLOAT,defaultValue: 0}


})
const OrderList = sequelize.define("orderList",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    total: {type: DataTypes.FLOAT,defaultValue: 0},
    shipping: {type: DataTypes.FLOAT,defaultValue: 0},
    totalWithShipping: {type: DataTypes.FLOAT,defaultValue: 0},
    payedTotal: {type: DataTypes.FLOAT,defaultValue: 0},
    difference: {type: DataTypes.FLOAT,defaultValue: 0},
    isClosed: {type: DataTypes.BOOLEAN,defaultValue: false}
    

})

const UserProfile = sequelize.define("userProfile",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING},
    name : {type: DataTypes.STRING},
    secondName: {type: DataTypes.STRING},
    nickname:{type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING},
    dateOfBirth: {type: DataTypes.STRING},
    aboutSelf: {type: DataTypes.STRING}
})

User.hasOne(UserProfile,{ onDelete: "cascade",foreignKey: "userId"})
UserProfile.belongsTo(User)

User.hasOne(OrderList,{ onDelete: "cascade",foreignKey: "userId"})
OrderList.belongsTo(User)

UserProfile.hasOne(OrderList,{ onDelete: "cascade",foreignKey: "userProfileId"})
OrderList.belongsTo(UserProfile)

// User.hasMany(Order,{ onDelete: "cascade"})
// Order.belongsTo(User)

OrderList.hasMany(Order,{ onDelete: "cascade",foreignKey: "orderListId"})
Order.belongsTo(OrderList)

//Synchronize DB but delete data too

// sequelize.sync({force:true}).then(()=>{
 
//     console.log("Tables have synchronized");
// }).catch(err=>console.log(err));

// await User.sync({ force: true });
//   await OrderList.sync({ force: true });
// console.log("The table for the User model was just (re)created!");


//  OrderList.sync({ force: true }).then(()=>{
//     console.log("The table for the OrderList model was just (re)created!");
//  }).catch(err=> console.log(err))


module.exports = {
    User,
    Order,
    OrderList,
    UserProfile
}
