const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const orderRouter = require("./orderRouter")
const userProfileRouter = require("./userProfileRouter")
const orderListRouter = require("./orderListRouter")

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/order',orderRouter)
router.use('/userprofile',userProfileRouter)
router.use('/orderList',orderListRouter)

module.exports = router