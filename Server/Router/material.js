const router = require('express').Router()
const Controller = require('../Controller/materialController')

const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken, isAdmin],Controller.createMaterial)
router.get('/',Controller.getMaterial)
router.put('/:mid',[verifyAccessToken, isAdmin],Controller.updateMaterial)
router.delete('/:mid',[verifyAccessToken, isAdmin],Controller.deleteMaterial)



module.exports = router
