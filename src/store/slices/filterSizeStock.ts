import {
  createNewFilterSizeAddStock,
  createNewFilterSizeStock,
  deleteFilterSizeAddStock,
  deleteFilterSizeStock,
  filterSizeStockSlice,
  updateFilterSizeAddStock,
  updateFilterSizeStock,
} from "@/types/filterSizeStockType";
import Config from "@/utils/config";
import { FilterSize, Leaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock, deletedAddStock, updatedAddStock } from "./addStock";

const initialState: filterSizeStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateFilterSizeStock = createAsyncThunk(
  "filterSizeStock/CreateFilterSizeStock",
  async (option: createNewFilterSizeStock, thunkApi) => {
    const {
      date,
      typeOfFilterSizeId,
      quantity,
      bag,
      garageId,
      shopId,
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
          date,
          typeOfFilterSizeId,
          quantity,
          bag,
          garageId,
          shopId,
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

export const UpdatedFilterSizeStock = createAsyncThunk(
  "filterSizeStock/UpdatedFilterSizeStock",
  async (option: updateFilterSizeStock, thunkApi) => {
    const {
      id,
      date,
      typeOfFilterSizeId,
      quantity,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/filterSizeStock`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          date,
          typeOfFilterSizeId,
          quantity,
          bag,
          garageId,
          shopId,
        }),
      });
      const { updateFilterSizeStock } = await response.json();
      thunkApi.dispatch(updatedFilterSizeStock(updateFilterSizeStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedFilterSizeStock = createAsyncThunk(
  "filterSizeStock/DeletedFilterSizeStock",
  async (option: deleteFilterSizeStock, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/filterSizeStock?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedFilterSizeStock(id));
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
      date,
      invNo,
      carNo,
      typeOfFilterSizeId,
      quantity,
      bag,
      garageId,
      shopId,
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
            date,
            invNo,
            carNo,
            typeOfFilterSizeId,
            quantity,
            bag,
            garageId,
            shopId,
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

export const UpdatedFilterSizeAddStock = createAsyncThunk(
  "filterSizeAddStock/UpdateFilterSizeAddStock",
  async (option: updateFilterSizeAddStock, thunkApi) => {
    const {
      stockSeq,
      date,
      invNo,
      carNo,
      typeOfFilterSizeId,
      quantity,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/filterSizeStock?invNo=${invNo}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            stockSeq,
            date,
            invNo,
            carNo,
            typeOfFilterSizeId,
            quantity,
            bag,
            garageId,
            shopId,
          }),
        }
      );
      const { updateFilterSizeAddStock, updateAddStock } =
        await response.json();
      thunkApi.dispatch(updatedFilterSizeAddStock(updateFilterSizeAddStock));
      thunkApi.dispatch(updatedAddStock(updateAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedFilterSizeAddStock = createAsyncThunk(
  "filterSizeAddStock/DeletedFilterSizeAddStock",
  async (option: deleteFilterSizeAddStock, thunkApi) => {
    const { stockSeq, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/filterSizeStock?stockSeq=${stockSeq}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedFilterSizeAddStock(stockSeq));
      thunkApi.dispatch(deletedAddStock(stockSeq));
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
    updatedFilterSizeStock: (state, action: PayloadAction<FilterSize>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedFilterSizeStock: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
    updatedFilterSizeAddStock: (state, action: PayloadAction<FilterSize>) => {
      state.item = state.item.map((item) =>
        item.stockSeq === action.payload.stockSeq ? action.payload : item
      );
    },
    deletedFilterSizeAddStock: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.stockSeq != action.payload);
    },
  },
});

export const {
  setFilterSizeStock,
  setIsLoading,
  addFilterSizeStock,
  updatedFilterSizeStock,
  deletedFilterSizeStock,
  updatedFilterSizeAddStock,
  deletedFilterSizeAddStock,
} = FilterSizeStockSlice.actions;
export default FilterSizeStockSlice.reducer;
