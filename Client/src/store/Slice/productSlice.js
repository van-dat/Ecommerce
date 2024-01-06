import { createSlice } from "@reduxjs/toolkit";

import * as actions from "../action"


const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    oneProduct: null,
    reviewProduct: [],
    recommend: null
  },
  reducers: {
    review: (state, action) => {
      const newReview = action.payload;
      if (!state.reviewProduct || !Array.isArray(state.reviewProduct)) {
        state.reviewProduct = [];
      }
      const isDuplicate = state.reviewProduct?.some(existingReview => (
        existingReview == newReview
      ));
      if (isDuplicate) {

        const data = state.reviewProduct.filter(item => item != newReview)

        const newReviewProduct = [...data, newReview];
        newReviewProduct.reverse()


        console.log(newReviewProduct.reverse())
        state.reviewProduct = newReviewProduct.slice(0, 10);
      }
    }

  },
  extraReducers: (builder) => {

    builder.addCase(actions.getOneProduct.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    builder.addCase(actions.getOneProduct.fulfilled, (state, action) => {

      state.isLoading = false;
      state.oneProduct = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getOneProduct.rejected, (state, action) => {

      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });

    // recomnmend
    builder.addCase(actions.getRecommend.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getRecommend.fulfilled, (state, action) => {
      console.log(action.payload)
      state.recommend = action.payload;
    });
   

  }
})
export const { review } = ProductSlice.actions

export default ProductSlice.reducer