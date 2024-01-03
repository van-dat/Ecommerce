import { configureStore } from "@reduxjs/toolkit"
import appSlice from "./Slice/appSlice"
import productSlice from "./Slice/productSlice"
import storage from 'redux-persist/lib/storage'
import authSlice from "./Slice/authSlice"
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux';
import thunk from "redux-thunk";


const commonConfig = {
  key: 'root',
  storage,
  whitelist: ['dataNike', 'dataMlb', 'dataAdidas']
}

const persistConfig = {
  key: 'product',
  storage,
  whitelist: ['oneProduct', 'reviewProduct']
}
const authPersist = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'sendMail','isLogin']
}

const rootReducer = combineReducers({
  app: persistReducer(commonConfig, appSlice),
  product: persistReducer(persistConfig, productSlice),
  auth: persistReducer(authPersist, authSlice)
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk]
})

