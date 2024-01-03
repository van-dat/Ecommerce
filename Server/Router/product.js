const router = require('express').Router()
const Controller = require('../Controller/productController')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const Uploader  = require('../Config/cloudinary.config')

router.post('/',[verifyAccessToken, isAdmin],Uploader.fields([{name:'image', maxCount: 10}, {name:'thumbnail', maxCount:1}]),Controller.createProduct)
router.get('/',Controller.getProducts)
router.put('/rating',[verifyAccessToken],Controller.rating)


router.put('/update-image/:pid', [verifyAccessToken, isAdmin], Uploader.array('image',10) ,Controller.uploadImageProduct)
router.put('/update-thumbnail/:pid', [verifyAccessToken, isAdmin], Uploader.array('image',10) ,Controller.uploadThumbnailProduct)

router.delete('/:pid',[verifyAccessToken, isAdmin],Controller.deleteProduct)
router.put('/:pid',[verifyAccessToken, isAdmin],Uploader.fields([{name:'image', maxCount: 10}, {name:'thumbnail', maxCount:1}]),Controller.updateProduct)
router.put('/add-size/:pid',[verifyAccessToken, isAdmin],Controller.addSize)
router.get('/:pid',Controller.getProduct)



module.exports = router
