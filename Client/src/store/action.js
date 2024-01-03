import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../apis";

export const getBanner = createAsyncThunk("/banner", async (data, rejectWithValue) => {
  const response = await apis.apiBanner();
  if (!response.success) return rejectWithValue(response)
  return response.rs[0].image
});
export const getProduct = createAsyncThunk("/product", async (data, rejectWithValue) => {
  const response = await apis.apiProducts(data);
  if (!response.success) return rejectWithValue(response)
  return response
});
export const getOneProduct = createAsyncThunk("/oneproduct", async (pid, { rejectWithValue }) => {
  const response = await apis.apiOneProduct(pid);
  if (!response.success) return rejectWithValue(response)
  return response.product
});
export const getCategory = createAsyncThunk("/category", async (data, rejectWithValue) => {
  const response = await apis.apiCategory();
  if (!response.status) return rejectWithValue(response)
  return response.rs
});
export const getBlog = createAsyncThunk("/blog", async (data, rejectWithValue) => {
  const response = await apis.apiBlog();
  if (!response.status) return rejectWithValue(response)
  return response.rs
});
export const getOneBlog = createAsyncThunk("Blog/oneBlog", async (bid, rejectWithValue) => {
  const response = await apis.apiOneBlog(bid);
  if (!response.status) return rejectWithValue(response)
  return response.rs
});
export const getSize = createAsyncThunk("Size", async (data, rejectWithValue) => {
  const response = await apis.apiSize();
  if (!response.success) return rejectWithValue(response)
  return response.rs
});

export const getCurrentUser = createAsyncThunk("/current", async (data, rejectWithValue) => {
  const response = await apis.apiCurrentUser();
  if (!response.success) return rejectWithValue(response)
  return response.rs
});



export const valueRole = [{
  value: 'user',
  code: 'user'
},
{
  value: 'admin',
  code: 'admin'
}]
export const valueStatus = [{
  value: 'Active',
  code: true
},
{
  value: 'InActive',
  code: false
}] 



 export const getMaterial = createAsyncThunk("/material", async (data, rejectWithValue) => {
  const response = await apis.apiGetMaterial();
  if (!response.success) return rejectWithValue(response)
  return response.rs
});