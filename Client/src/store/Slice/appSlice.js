import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action"


export const appSlice = createSlice({
  name: "app",
  initialState: {
    banner: [],
    product: [],
    category: [],
    blog: [],
    size: null,
    oneBlog: null,
    isHidden: false,
    dataNike: [],
    dataMlb: [],
    dataAdidas: [],
    isLoading: false,
    search: null
  },
  reducers: {
    // Logout không gọi API mà chỉ đơn giản là cập nhật state
    Show: (state) => {
      state.isHidden = true
    },
    noShow: (state) => {
      state.isHidden = false
    },
    dataNike: (state, action) => {
      state.dataNike = action.payload
    },
    dataAdidas: (state, action) => {
      state.dataAdidas = action.payload
    },
    dataMlb: (state, action) => {
      state.dataMlb = action.payload
    },
    search: (state, action) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.getBanner.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getBanner.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.banner = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getBanner.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
    /// product
    builder.addCase(actions.getProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });

    builder.addCase(actions.getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });

    // blog
    builder.addCase(actions.getBlog.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
    });

    builder.addCase(actions.getBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });

    ///getonblog
    builder.addCase(actions.getOneBlog.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getOneBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.find(post => post.bid === payload.bid)
    });

    builder.addCase(actions.getOneBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    ///getSize
    builder.addCase(actions.getSize.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getSize.fulfilled, (state, action) => {
      state.isLoading = false;
      state.size = action.payload
    });

    builder.addCase(actions.getSize.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });

    // category

    builder.addCase(actions.getCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.category = action.payload
    });

    builder.addCase(actions.getCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });



  },
});
export const { noShow, Show, dataNike, dataAdidas, dataMlb, search } = appSlice.actions

export default appSlice.reducer