const router = require('express').Router()
const Controller = require('../Controller/sizeController')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken, isAdmin],Controller.createSize)
router.get('/',Controller.getSizes)
router.put('/:sid',[verifyAccessToken,isAdmin],Controller.updateSize)
router.delete('/:sid',[verifyAccessToken,isAdmin],Controller.deleteSize)


module.exports = router