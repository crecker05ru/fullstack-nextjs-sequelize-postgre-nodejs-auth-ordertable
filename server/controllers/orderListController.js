const { response } = require("express")
const {OrderList,Order,User} = require("../models/models")

class OrderListController {
    async placeOrder (req,res){

    }

    async clear (req,res){
        const {id} = req.body
        const orderList = OrderList.findOne({where:{id}})
        const ordersInList = orderList.getOrders()
        ordersInList.destroy()
    }
    async getAll(req,res){
        const orderList = await OrderList.findAll()
        return res.json(orderList)
    }

    async getById (req, res) {
        const {id} = req.params
        const orderList = await OrderList.findOne({
            where:{userId: id},
        include:[ {
            model: Order,
            as: "orders"
        }
        ]})
        return res.json(orderList)
    }

    async edit(req,res){
        const {id,total,shipping,totalWithShipping,payedTotal,difference,isClosed} = req.body
        const orderList = await OrderList.findOne({where:{id}})
        orderList.total = total
        orderList.shipping = shipping
        orderList.totalWithShipping = totalWithShipping
        orderList.payedTotal = payedTotal
        orderList.difference = difference
        orderList.closed = isClosed
        await orderList.save()
        // return res.json(orderList)
    }

    async newOrderList(req,res){
        const {id} = req.body
        const user = await User.findOne({where:{id}})
        const lastOrderList = await OrderList.findOne({where:{userId:id},order:[['id','DESC']]})
        lastOrderList.isClosed = true
        // user.setOrderList(isClosed) = true
        await lastOrderList.save()
        const orderList = await OrderList.create({userId:user.id, userProfileId:user.id})
        
        // user.setOrderList(orderList)
        return res.json(orderList)
        // return res.status(200)
    }

}

module.exports = new OrderListController()