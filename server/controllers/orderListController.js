const { response } = require("express")
const {OrderList,Order} = require("../models/models")

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
        const orderList = await OrderList.findOne({where:{userId: id},
        include:[ {
            model: Order,
            as: "orders"
        }
        ]})
        return res.json(orderList)
    }

}

module.exports = new OrderListController()