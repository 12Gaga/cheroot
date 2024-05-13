import {
  bagoPlasticSlice,
  createNewBagoPlastic,
  deleteBagoPlastic,
  updateBagoPlastic,
} from "@/types/bagoPlasticType";
import Config from "@/utils/config";
import { BagoPlasticPurchase } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bagoPlasticSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateBagoPlastic = createAsyncThunk(
  "bagoPlastic/CreateBagoPlastic",
  async (option: createNewBagoPlastic, thunkApi) => {
    const {
      date,
      shopId,
      plasticId,
      quantity,
      bag,
      totalPrice,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoPlastic?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            shopId,
            plasticId,
            quantity,
            bag,
            totalPrice,
          }),
        }
      );
      const { newBagoPlastic } = await response.json();
      thunkApi.dispatch(addBagoPlastic(newBagoPlastic));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBagoPlastic = createAsyncThunk(
  "bagoPlastic/UpdatedBagoPlastic",
  async (option: updateBagoPlastic, thunkApi) => {
    const {
      date,
      shopId,
      plasticId,
      quantity,
      bag,
      totalPrice,
      id,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoPlastic?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            shopId,
            plasticId,
            quantity,
            bag,
            totalPrice,
            id,
          }),
        }
      );
      const { updateBagoPlastic } = await response.json();
      thunkApi.dispatch(updatedBagoPlastic(updateBagoPlastic));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBagoPlastic = createAsyncThunk(
  "bagoPlastic/DeletedBagoPlastic",
  async (option: deleteBagoPlastic, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoPlastic?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedBagoPlastic(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const BagoPlasticSlice = createSlice({
  name: "bagoPlastic",
  initialState,
  reducers: {
    setBagoPlastic: (state, action: PayloadAction<BagoPlasticPurchase[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addBagoPlastic: (state, action: PayloadAction<BagoPlasticPurchase>) => {
      state.item = [...state.item, action.payload];
    },
    updatedBagoPlastic: (state, action: PayloadAction<BagoPlasticPurchase>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBagoPlastic: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBagoPlastic,
  setIsLoading,
  addBagoPlastic,
  updatedBagoPlastic,
  deletedBagoPlastic,
} = BagoPlasticSlice.actions;
export default BagoPlasticSlice.reducer;
