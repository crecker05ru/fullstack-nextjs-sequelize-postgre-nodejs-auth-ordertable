const Router = require('express')
const router = new Router()
const userProfileController = require("../controllers/userProfileController")

router.put("/",userProfileController.update)
router.get("/",userProfileController.getAll)
router.get("/:id",userProfileController.getById)


module.exports = router 