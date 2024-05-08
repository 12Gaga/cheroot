import Config from "@/utils/config";
import { TypeOfFilterSize, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addleaf } from "./typeOfLeaf";
import {
  createNewFilterSize,
  typeOfFilterSizeSlice,
  updateFilterSize,
} from "@/types/FilterSizeType";

const initialState: typeOfFilterSizeSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateNewFilterSize = createAsyncThunk(
  "filterSize/CreateFilterSize",
  async (option: createNewFilterSize, thunkApi) => {
    const { name, price, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/filterSize?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price }),
        }
      );
      const { newFilterSize } = await response.json();
      thunkApi.dispatch(addFilterSize(newFilterSize));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedFilterSize = createAsyncThunk(
  "filterSize/UpdatedFilterSize",
  async (option: updateFilterSize, thunkApi) => {
    const { name, price, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/filterSize?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price, id }),
        }
      );
      const { updateFilterSize } = await response.json();
      thunkApi.dispatch(updatedFilterSize(updateFilterSize));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfFilterSizeSlice = createSlice({
  name: "filterSize",
  initialState,
  reducers: {
    setFilterSize: (state, action: PayloadAction<TypeOfFilterSize[]>) => {
      state.item = action.payload;
    },
    addFilterSize: (state, action: PayloadAction<TypeOfFilterSize>) => {
      state.item = [...state.item, action.payload];
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updatedFilterSize: (state, action: PayloadAction<TypeOfFilterSize>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setFilterSize, addFilterSize, setIsLoading, updatedFilterSize } =
  TypeOfFilterSizeSlice.actions;
export default TypeOfFilterSizeSlice.reducer;
