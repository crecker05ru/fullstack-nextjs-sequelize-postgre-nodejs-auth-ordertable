const Router = require("express")
const router = new Router()
const orderListController = require("../controllers/orderListController")

router.post('/clear',orderListController.clear)
router.get('/',orderListController.getAll)
router.get('/:id',orderListController.getById)

module.exports = router
