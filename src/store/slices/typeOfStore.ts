import { CreateNewBanquet, typeOfBanquetSlice } from "@/types/banquetType";
import { CreateNewPlastic, typeOfPlasticSlice } from "@/types/plasticType";
import {
  CreateNewStore,
  typeOfStoreSlice,
  updateStore,
} from "@/types/storeType";
import Config from "@/utils/config";
import { Banquet, Store, TypeOfPlastic, TypeOfShop } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";

const initialState: typeOfStoreSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateStore = createAsyncThunk(
  "store/CreateStore",
  async (option: CreateNewStore, thunkApi) => {
    const { name, cigratteIndustryId, onSuccess, onError } = option;
    console.log("hello");

    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/store?cigratteIndustryId=${cigratteIndustryId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const { newStore } = await response.json();
      thunkApi.dispatch(addStore(newStore));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedStore = createAsyncThunk(
  "store/UpdateStore",
  async (option: updateStore, thunkApi) => {
    const { name, id, onSuccess, onError } = option;
    console.log("hello");

    try {
      const response = await fetch(`${Config.apiBaseUrl}/store`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, id }),
      });
      const { updateStore } = await response.json();
      thunkApi.dispatch(updatedStore(updateStore));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfStoreSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<Store[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addStore: (state, action: PayloadAction<Store>) => {
      state.item = [...state.item, action.payload];
    },
    updatedStore: (state, action: PayloadAction<Store>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setStore, setIsLoading, addStore, updatedStore } =
  TypeOfStoreSlice.actions;
export default TypeOfStoreSlice.reducer;
