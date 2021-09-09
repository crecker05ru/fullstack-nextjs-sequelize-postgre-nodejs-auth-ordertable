const Router = require("express")
const router = new Router()
const orderListController = require("../controllers/orderListController")

router.post('/clear',orderListController.clear)
router.post('/neworderlist',orderListController.newOrderList)
router.get('/',orderListController.getAll)
router.get('/:id',orderListController.getById)
router.put('/edit',orderListController.edit)
module.exports = router
