const router = require('express').Router()
const Controller = require('../Controller/blogController')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const Updater = require('../Config/cloudinary.config')

router.post('/',[verifyAccessToken, isAdmin],Controller.createBlog)
router.put('/upload-image/:bid',[verifyAccessToken], Updater.single('blog'),Controller.uploadImageBlog)

router.put('/like/:bid',[verifyAccessToken],Controller.likeBlog)
router.put('/dislike/:bid',[verifyAccessToken],Controller.disLikeBlog)
router.get('/',Controller.getBlogs)
router.get('/:bid',Controller.getBlog)
router.put('/:bid',[verifyAccessToken, isAdmin],Controller.updateBlog)
router.delete('/:bid',[verifyAccessToken, isAdmin],Controller.deleteBlog)



module.exports = router
