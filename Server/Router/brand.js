const router = require('express').Router()
const Controller = require('../Controller/brandController')

const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken, isAdmin],Controller.createBrand)
router.get('/',Controller.getBrand)
router.put('/:brid',[verifyAccessToken, isAdmin],Controller.updateBrand)
router.delete('/:brid',[verifyAccessToken, isAdmin],Controller.deleteBrand)



module.exports = router
