const router = require('express').Router()
const Controller = require('../Controller/orderController')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken],Controller.createOrder)
router.get('/',[verifyAccessToken, isAdmin],Controller.getOrders)
router.put('/status/:oid',[verifyAccessToken],Controller.updateOrder)
router.get('/:oid',[verifyAccessToken],Controller.getOrder)






module.exports = router
