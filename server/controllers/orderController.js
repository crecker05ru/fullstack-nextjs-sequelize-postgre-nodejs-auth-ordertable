const { response } = require("express")
const {Order,OrderList} = require("../models/models")

class OrderController {
    async create(req,res){
        const {position,name,link,price,count,total,orderListId} = req.body
        const order = await Order.create({position,name,link,price,count,total,orderListId})
        return res.json(order)
    }
    async add(req,res){
        const {position,name,link,price,count,total} = req.body
        order = await Order.findOne({where:{name}})
        if(!order){create}
        order.count + 1
        Order.save()
    }
    async reduce(req,res){
        const {position,name,link,price,count,total} = req.body
        order = await Order.findOne({where:{name}})
        if(!order){"Заказ нет в корзине"}
        order.count - 1
        Order.save()
    }
    async edit(req,res){
        const {id,position,name,link,price,count,total} = req.body
        const order = await Order.findOne({where:{id}})
        order.name = name
        order.link = link
        order.price = price
        order.count = count
        await order.save()
    }
    async delete(req,res){
        const {id,position,name,link,price,count,total} = req.body
        const order = await Order.findOne({where:{id}})
        if(!order){"Заказа нет в корзине"}
        // Order.destroy({where:{id}})
        await order.destroy()
        
    }
    async getAll(req,res){
        const orders = await Order.findAll()
        return res.json(orders)
    }
    async getById (req, res) {
        const {id} = req.params 
        const orders = await Order.findAll({
            where:{orderListId:id},
            include: [{
                model: OrderList,
                as: "orderList"
            }
            ]
        })
        return res.json(orders)
    }
}
module.exports = new OrderController()