import Config from "@/utils/config";
import { Plastic } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock } from "./addStock";
import {
  createNewPlasticAddStock,
  createNewPlasticStock,
  plasticStockSlice,
} from "@/types/plasticStockType";

const initialState: plasticStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreatePlasticStock = createAsyncThunk(
  "plasticStock/CreatPlasticStock",
  async (option: createNewPlasticStock, thunkApi) => {
    const {
      date,
      typeOfPlasticId,
      quantity,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/plasticStock`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          date,
          typeOfPlasticId,
          quantity,
          bag,
          garageId,
          shopId,
        }),
      });
      const { newPlasticStock } = await response.json();
      thunkApi.dispatch(addPlasticStock(newPlasticStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const CreatePlasticAddStock = createAsyncThunk(
  "plasticStock/CreatePlasticAddStock",
  async (option: createNewPlasticAddStock, thunkApi) => {
    const {
      date,
      invNo,
      carNo,
      typeOfPlasticId,
      quantity,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/plasticStock?invNo=${invNo}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            invNo,
            carNo,
            typeOfPlasticId,
            quantity,
            bag,
            garageId,
            shopId,
          }),
        }
      );
      const { newPlasticAddStock, newAddStock } = await response.json();
      thunkApi.dispatch(addPlasticStock(newPlasticAddStock));
      thunkApi.dispatch(addAddStock(newAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const PlasticStockSlice = createSlice({
  name: "plasticStock",
  initialState,
  reducers: {
    setPlasticStock: (state, action: PayloadAction<Plastic[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addPlasticStock: (state, action: PayloadAction<Plastic>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setPlasticStock, setIsLoading, addPlasticStock } =
  PlasticStockSlice.actions;
export default PlasticStockSlice.reducer;
