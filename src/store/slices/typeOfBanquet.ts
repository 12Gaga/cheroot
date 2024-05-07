import { CreateNewBanquet, typeOfBanquetSlice } from "@/types/banquetType";
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
  },
});

export const { setBanquet, setIsLoading, addBanquet } =
  TypeOfBanquetSlice.actions;
export default TypeOfBanquetSlice.reducer;
