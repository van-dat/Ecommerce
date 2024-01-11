import axios from '../axios'

export const apiBanner = () => axios({
    url: '/banner',
    method: 'get'
})
export const apiProducts = (params) => axios({
    url: '/product',
    method: 'get',
    params
})
export const apiOneProduct = (pid) => axios({
    url: `/product/${pid}`,
    method: 'get',

})
export const apiBlog = () => axios({
    url: '/blog',
    method: 'get'
})
export const apiOneBlog = (bid) => axios({
    url: '/blog',
    method: 'get',
    params: bid
})
export const apiCategory = () => axios({
    url: '/category',
    method: 'get'
})
export const apiSize = () => axios({
    url: '/size',
    method: 'get'
})
export const apiCreateProduct = (data) => axios({
    url: '/product/',
    method: 'post',
    data
})
export const apiUpdateProduct = (data, pid) => axios({
    url: '/product/' + pid,
    method: 'put',
    data
})

export const apiDeleteProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'delete',
})

export const apiGetMaterial = () => axios({
    url: '/material/',
    method: 'get',
})

export const apiCreateOrder = (data) => axios({
    url: '/order/',
    method: 'post',
    data
})
export const apiCreateRating = (data) => axios({
    url: '/product/rating',
    method: 'put',
    data
})
export const apiRecommend = (q) => axios({
    url: '/product/recommend/' +q,
    method: 'post',
    
})
export const apiGetOders = (params) => axios({
    url: '/order',
    method: 'get',
    params
})

export const apiUpdateOder = (data, oid) => axios({
    url: '/order/status/'+oid,
    method: 'put',
    data
})
export const apiGetStatistical = () => axios({
    url: '/product/statistical',
    method: 'get',
    
})
export const apiGetOrderUser = () => axios({
    url: '/order/order-user',
    method: 'get',
    
})




