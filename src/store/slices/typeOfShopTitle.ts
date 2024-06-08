import {
  CreateNewShopTitle,
  deleteShopTitle,
  typeOfShopTitleSlice,
  updateShopTitle,
} from "@/types/shopTitleType";
import Config from "@/utils/config";
import { ShopTitle, TypeOfShop } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: typeOfShopTitleSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateShopTitle = createAsyncThunk(
  "shopTitle/CreateShopTitle",
  async (option: CreateNewShopTitle, thunkApi) => {
    const { name, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/shopTitle?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const { newShopTitle } = await response.json();
      thunkApi.dispatch(addShopTitle(newShopTitle));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedShopTitle = createAsyncThunk(
  "shopTitle/UpdatedShopTitle",
  async (option: updateShopTitle, thunkApi) => {
    const { name, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/shopTitle?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, id }),
        }
      );
      const { updateShopTitle } = await response.json();
      thunkApi.dispatch(updatedShopTitle(updateShopTitle));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedShopTitle = createAsyncThunk(
  "shopTitle/DeletedShopTitle",
  async (option: deleteShopTitle, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/shopTitle?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedShopTitle(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfShopTitleSlice = createSlice({
  name: "shopTitle",
  initialState,
  reducers: {
    setShopTitle: (state, action: PayloadAction<ShopTitle[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addShopTitle: (state, action: PayloadAction<ShopTitle>) => {
      state.item = [...state.item, action.payload];
    },
    updatedShopTitle: (state, action: PayloadAction<ShopTitle>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedShopTitle: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setShopTitle,
  setIsLoading,
  addShopTitle,
  updatedShopTitle,
  deletedShopTitle,
} = TypeOfShopTitleSlice.actions;
export default TypeOfShopTitleSlice.reducer;
