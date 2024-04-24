import {
  createNewFilterSizeAddStock,
  createNewFilterSizeStock,
  filterSizeStockSlice,
} from "@/types/filterSizeStockType";
import Config from "@/utils/config";
import { FilterSize, Leaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock } from "./addStock";

const initialState: filterSizeStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateFilterSizeStock = createAsyncThunk(
  "filterSizeStock/CreateFilterSizeStock",
  async (option: createNewFilterSizeStock, thunkApi) => {
    const {
      typeOfFilterSizeId,
      quantity,
      bag,
      garageId,
      shop,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/filterSizeStock`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          typeOfFilterSizeId,
          quantity,
          bag,
          garageId,
          shop,
        }),
      });
      const { newFilterSizeStock } = await response.json();
      thunkApi.dispatch(addFilterSizeStock(newFilterSizeStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const CreateFilterSizeAddStock = createAsyncThunk(
  "filterSizeStock/CreateFilterSizeAddStock",
  async (option: createNewFilterSizeAddStock, thunkApi) => {
    const {
      invNo,
      carNo,
      typeOfFilterSizeId,
      quantity,
      bag,
      garageId,
      shop,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/filterSizeStock?invNo=${invNo}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            invNo,
            carNo,
            typeOfFilterSizeId,
            quantity,
            bag,
            garageId,
            shop,
          }),
        }
      );
      const { newFilterSizeAddStock, newAddStock } = await response.json();
      thunkApi.dispatch(addFilterSizeStock(newFilterSizeAddStock));
      thunkApi.dispatch(addAddStock(newAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const FilterSizeStockSlice = createSlice({
  name: "filerSizeStock",
  initialState,
  reducers: {
    setFilterSizeStock: (state, action: PayloadAction<FilterSize[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addFilterSizeStock: (state, action: PayloadAction<FilterSize>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setFilterSizeStock, setIsLoading, addFilterSizeStock } =
  FilterSizeStockSlice.actions;
export default FilterSizeStockSlice.reducer;
