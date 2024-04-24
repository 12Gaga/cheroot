import {
  createNewLabelAddStock,
  createNewLabelStock,
  labelStockSlice,
} from "@/types/labelStockType";
import Config from "@/utils/config";
import { Label, Leaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock } from "./addStock";

const initialState: labelStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateLabelStock = createAsyncThunk(
  "labelStock/CreateLabelStock",
  async (option: createNewLabelStock, thunkApi) => {
    const { typeOfLabelId, bandle, garageId, shop, onSuccess, onError } =
      option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/labelStock`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          typeOfLabelId,
          bandle,
          garageId,
          shop,
        }),
      });
      const { newLabelStock } = await response.json();
      thunkApi.dispatch(addLabelStock(newLabelStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const CreateLabelAddStock = createAsyncThunk(
  "labelStock/CreateLabelAddStock",
  async (option: createNewLabelAddStock, thunkApi) => {
    const {
      invNo,
      carNo,
      typeOfLabelId,
      bandle,
      garageId,
      shop,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/labelStock?invNo=${invNo}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            invNo,
            carNo,
            typeOfLabelId,
            bandle,
            garageId,
            shop,
          }),
        }
      );
      const { newLabelAddStock, newAddStock } = await response.json();
      thunkApi.dispatch(addLabelStock(newLabelAddStock));
      thunkApi.dispatch(addAddStock(newAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const LabelStockSlice = createSlice({
  name: "labelStock",
  initialState,
  reducers: {
    setLabelStock: (state, action: PayloadAction<Label[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addLabelStock: (state, action: PayloadAction<Label>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setLabelStock, setIsLoading, addLabelStock } =
  LabelStockSlice.actions;
export default LabelStockSlice.reducer;
