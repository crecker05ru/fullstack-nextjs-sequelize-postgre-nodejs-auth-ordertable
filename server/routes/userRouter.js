const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',userController.registration )
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/auth', authMiddleware, userController.check)
router.get("/:id",userController.findById)

module.exports = router