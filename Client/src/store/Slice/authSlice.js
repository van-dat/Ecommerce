import { createSlice } from "@reduxjs/toolkit";

import * as actions from "../action"
 

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        isLogin : false,
        sendMail : null,
        user:null,
        token:null,
        mes:null

    },
    reducers: {
        loginUser:(state, action) =>{
            state.isLogin = true
            state.token = action.payload?.accessToken
        },
        sendMail:(state, action) => {
            state.sendMail = action.payload
        },
        logOut:(state) => {
            state.user = null,
            state.token = null,
            state.isLogin = false
        }
        
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
          state.isLogin = true;
          state.user = action.payload;
        });
        builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
          state.isLogin = false;
          state.user = null;
          state.mes = 'Phiên bản đăng nhập đã hết hạn vui lòng đăng nhập lại !!!'
        });
    }
})
export const {loginUser, sendMail,logOut} = authSlice.actions

export default authSlice.reducer