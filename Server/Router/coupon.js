const router = require('express').Router()
const Controller = require('../Controller/couponController')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken, isAdmin],Controller.createCoupon)
router.get('/',Controller.getCoupons)
router.get('/:cid',Controller.getCoupon)
router.put('/:cid',[verifyAccessToken, isAdmin],Controller.updateCoupon)
router.delete('/:cid',[verifyAccessToken, isAdmin],Controller.deleteCoupon)





module.exports = router
