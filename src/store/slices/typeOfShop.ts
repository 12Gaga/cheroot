import { CreateNewShop, typeOfShopSlice, updateShop } from "@/types/shopType";
import Config from "@/utils/config";
import { TypeOfShop } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: typeOfShopSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateShop = createAsyncThunk(
  "shop/CreateShop",
  async (option: CreateNewShop, thunkApi) => {
    const { name, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/shop?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const { newShop } = await response.json();
      thunkApi.dispatch(addShop(newShop));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedShop = createAsyncThunk(
  "shop/UpdatedShop",
  async (option: updateShop, thunkApi) => {
    const { name, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/shop?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, id }),
        }
      );
      const { updateShop } = await response.json();
      thunkApi.dispatch(updatedShop(updateShop));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfShopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShop: (state, action: PayloadAction<TypeOfShop[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addShop: (state, action: PayloadAction<TypeOfShop>) => {
      state.item = [...state.item, action.payload];
    },
    updatedShop: (state, action: PayloadAction<TypeOfShop>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setShop, setIsLoading, addShop, updatedShop } =
  TypeOfShopSlice.actions;
export default TypeOfShopSlice.reducer;
