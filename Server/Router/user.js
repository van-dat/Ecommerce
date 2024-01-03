const router = require('express').Router()
const Controller = require('../Controller/userController')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

 
router.post('/register', Controller.register)
router.put('/register/confirm/:token', Controller.createAccount)
router.put('/update-quantity', verifyAccessToken, Controller.updateQuantityCart)
router.put('/remove', verifyAccessToken, Controller.removeItemCart)
router.post('/login', Controller.login)
router.get('/current', verifyAccessToken, Controller.getCurrent)
router.put('/update-address', verifyAccessToken, Controller.updateUserAddress)
router.put('/cart', verifyAccessToken, Controller.updateCartProduct)
router.post('/refreshAccessToken', Controller.getAccessToken)
router.post('/logout', Controller.logout)
router.post('/forgot-password', Controller.forgotPassword)
router.put('/reset-password/:token', Controller.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], Controller.getUsers)
router.delete('/delete/:uid', [verifyAccessToken, isAdmin], Controller.deleteUser)
router.put('/update-user', [verifyAccessToken], Controller.updateUser)
router.put('/update-user-admin/:uid', [verifyAccessToken, isAdmin], Controller.updateUserAdmin)


module.exports = router
