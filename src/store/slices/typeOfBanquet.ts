import {
  CreateNewBanquet,
  deleteBanquet,
  typeOfBanquetSlice,
  updateBanquet,
} from "@/types/banquetType";
import { CreateNewPlastic, typeOfPlasticSlice } from "@/types/plasticType";
import Config from "@/utils/config";
import { Banquet, TypeOfPlastic, TypeOfShop } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { store } from "..";

const initialState: typeOfBanquetSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateBanquet = createAsyncThunk(
  "banquet/CreateBanquet",
  async (option: CreateNewBanquet, thunkApi) => {
    const { name, cigratteIndustryId, onSuccess, onError } = option;
    console.log("id2", cigratteIndustryId);
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/banquet?cigratteIndustryId=${cigratteIndustryId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const { newBanquet } = await response.json();
      thunkApi.dispatch(addBanquet(newBanquet));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBanquet = createAsyncThunk(
  "banquet/UpdateBanquet",
  async (option: updateBanquet, thunkApi) => {
    const { name, id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/banquet`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, id }),
      });
      const { updateBanquet } = await response.json();
      thunkApi.dispatch(updatedBanquet(updateBanquet));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBanquet = createAsyncThunk(
  "banquet/DeletedBanquet",
  async (option: deleteBanquet, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/banquet?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedBanquet(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfBanquetSlice = createSlice({
  name: "banquet",
  initialState,
  reducers: {
    setBanquet: (state, action: PayloadAction<Banquet[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addBanquet: (state, action: PayloadAction<Banquet>) => {
      state.item = [...state.item, action.payload];
    },
    updatedBanquet: (state, action: PayloadAction<Banquet>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBanquet: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBanquet,
  setIsLoading,
  addBanquet,
  updatedBanquet,
  deletedBanquet,
} = TypeOfBanquetSlice.actions;
export default TypeOfBanquetSlice.reducer;
