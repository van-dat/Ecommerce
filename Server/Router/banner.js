const router = require("express").Router();
const Controller = require("../Controller/bannerController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const Updater = require("../Config/cloudinary.config");


router.post('/',[verifyAccessToken, isAdmin],Updater.array('image',10),Controller.createBanner)
router.get('/',Controller.getBanners)
router.put('/:bnid',[verifyAccessToken, isAdmin],Updater.array('image',10),Controller.updateBanner)
router.delete('/:bnid',[verifyAccessToken, isAdmin],Controller.deleteBanner)




module.exports = router