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


export const getMaterial = createAsyncThunk("/material", async (data, rejectWithValue) => {
  const response = await apis.apiGetMaterial();
  if (!response.success) return rejectWithValue(response)
  return response.rs
});
export const getRecommend = createAsyncThunk("/recommend", async (q, rejectWithValue) => {
  const response = await apis.apiRecommend(q);
  console.log(response)
  if (!response.success) return rejectWithValue(response)
  return response.products
});


















export const valueRole = [{
  value: 'user',
  code: 'user'
},
{
  value: 'admin',
  code: 'admin'
}, {

  value: 'employee',
  code: 'employee'
}]
export const valueStatus = [{
  value: 'Active',
  code: true
},
{
  value: 'InActive',
  code: false
}]

export const optionsPayment = [{
  title: 'Thanh toán khi nhận hàng',
  value: 'Thanh toán khi nhận hàng'
},
{
  title: 'Thanh toán bằng Paypal',
  value: 'Thanh toán bằng Paypal'
}]


export const optionRating = [
  {
    code: 1,
    value: 'Rất tệ'
  },
  {
    code: 2,
    value: 'Tệ'
  },
  {
    code: 3,
    value: 'Bình thường'
  },
  {
    code: 4,
    value: 'Tốt'
  },
  {
    code: 5,
    value: 'Rất tốt'
  },
]

export const optionsStatus = [
  {
    value: 'Pending',
    label: "Pending"
  },
  {
    value: 'Processing',
    label: "Processing"
  },
  {
    value: 'Success',
    label: "Success"
  },
  {
    value: 'Canceled',
    label: "Canceled"
  }
];



