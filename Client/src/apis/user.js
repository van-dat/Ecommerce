import axios from '../axios'
export const apiRegister = (data) => axios({
    url : 'user/register',
    method : 'post',
    data,
    withCredentials: true
})
export const apiLogin = (data) => axios({
    url :'user/login',
    method : 'post',
    data
})

export const apiConfirm = (token) => axios({
    url :'user/register/confirm/' + token,
    method : 'put',
    
})
export const apiForgot = (email) => axios(
    {
    url :'user/forgot-password',
    method : 'post',
    data:email
})

export const apiResetPass = (data, token) => axios(
    {
    url :'user/reset-password/'+token,
    method : 'put',
    data
})

export const apiLogOut = () => axios(
    {
    url :'user/logout',
    method : 'post'
})
export const apiAddCart = (data) => axios(
    {
    url :'user/cart',
    method : 'put',
    data
})
export const apiCurrentUser = () => axios(
    {
    url :'user/current',
    method : 'get',
    
})
export const apiUpdateQuantity = (data) => axios(
    {
    url :'user/update-quantity',
    method : 'put',
    data
    
})

export const apiRemoveItemCart = (data) => axios(
    {
    url :'user/remove',
    method : 'put',
    data
    
})
export const apiGetAllUser = (params) => axios(
    {
    url :'user',
    method : 'get',
    params
})
export const apiUpdateAdmin = (data, uid) => axios(
    {
    url :'user/update-user-admin/'+uid,
    method : 'put',
    data
})
export const apiDeleteUser = (uid) => axios(
    {
    url :'user/delete/'+uid,
    method : 'delete',
})
