import { addStockSlice } from "@/types/addStockType";
import { AddStock, Leaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: addStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

const AddStockSlice = createSlice({
  name: "addStock",
  initialState,
  reducers: {
    setAddStock: (state, action: PayloadAction<AddStock[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAddStock: (state, action: PayloadAction<AddStock>) => {
      state.item = [...state.item, action.payload];
    },
    updatedAddStock: (state, action: PayloadAction<AddStock>) => {
      state.item = state.item.map((item) =>
        item.stockSeq === action.payload.stockSeq ? action.payload : item
      );
    },
    deletedAddStock: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.stockSeq != action.payload);
    },
    addAddLoopStock: (state, action: PayloadAction<AddStock[]>) => {
      state.item = [...action.payload];
    },
  },
});

export const {
  setAddStock,
  setIsLoading,
  addAddStock,
  addAddLoopStock,
  updatedAddStock,
  deletedAddStock,
} = AddStockSlice.actions;
export default AddStockSlice.reducer;
