import { createSlice } from "@reduxjs/toolkit";

import * as actions from "../action"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        isLogin: false,
        cart: [],
        mes: null,
        methodPayment: '',
        address: ''
    },
    reducers: {
        cartCurrent: (state, action) => {

            state.isLogin = true
            state.cart = action.payload
        },
        getMethodPayment: (state, action) => {
            state.methodPayment = action.payload
        },
        getAddress: (state, action) => {
            state.address = action.payload
        }

    },
    // extraReducers: (builder) => {
    //     // Bắt đầu thực hiện action login (Promise pending)
    //     builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
    //       state.isLogin = true;
    //       state.user = action.payload;
    //     });
    //     builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
    //       state.isLogin = false;
    //       state.user = null;
    //       state.mes = 'Phiên bản đăng nhập đã hết hạn vui lòng đăng nhập lại !!!'
    //     });
    // }
})
export const { cartCurrent, getMethodPayment ,getAddress} = cartSlice.actions

export default cartSlice.reducer