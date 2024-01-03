const userRouter = require('./user')
const productRouter = require('./product')
const productCategoryRoute = require('./productCategory')
const blogCategoryRoute = require('./blogCategory')
const blogRoute = require('./blog')
const brandRoute = require('./brand')
const couponRoute = require('./coupon')
const orderRoute = require('./order')
const bannerRoute = require('./banner')
const sizeRoute = require('./size')
const materialRoute = require('./material')





const {notFound, errHandle} = require('../middlewares/errHandle')
const initRouter = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/category', productCategoryRoute)
    app.use('/api/blogcategory', blogCategoryRoute)
    app.use('/api/blog', blogRoute)
    app.use('/api/brand', brandRoute)
    app.use('/api/coupon', couponRoute)
    app.use('/api/order', orderRoute)
    app.use('/api/banner', bannerRoute)
    app.use('/api/size', sizeRoute)
    app.use('/api/material', materialRoute)


    
    app.use(notFound)
    app.use(errHandle)
}


module.exports = initRouter