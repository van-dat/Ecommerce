const router = require('express').Router()
const Controller = require('../Controller/productCategoryController')

const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken, isAdmin],Controller.createCategory)
router.get('/',Controller.getCategory)
router.put('/:cid',[verifyAccessToken, isAdmin],Controller.updateCategory)
router.delete('/:cid',[verifyAccessToken, isAdmin],Controller.deleteCategory)



module.exports = router
