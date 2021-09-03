const Router = require('express')
const router = new Router()
const orderController = require("../controllers/orderController")

router.post('/',orderController.create)
router.put('/',orderController.add)
router.put('/',orderController.reduce)
router.put('/edit',orderController.edit)
router.post('/delete',orderController.delete)
router.get('/',orderController.getAll)
router.get('/:id',orderController.getById)

module.exports = router