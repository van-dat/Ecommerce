const router = require('express').Router()
const Controller = require('../Controller/blogCategoryController')

const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken, isAdmin],Controller.createBlogCategory)
router.get('/',Controller.getBlogCategory)
router.put('/:bcid',[verifyAccessToken, isAdmin],Controller.updateBlogCategory)
router.delete('/:bcid',[verifyAccessToken, isAdmin],Controller.deleteBlogCategory)



module.exports = router
