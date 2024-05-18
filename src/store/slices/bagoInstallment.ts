import {
  addBagoInstallment,
  bagoInstallmentSlice,
  deleteBagoInstallment,
  updateBagoInstallment,
} from "@/types/bagoInstallment";
import Config from "@/utils/config";
import { BagoInstallment, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bagoInstallmentSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddBagoInstallment = createAsyncThunk(
  "bagoInstallment/AddBagoInstallment",
  async (option: addBagoInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoInstallment?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance }),
        }
      );
      const { addBagoInstallment } = await response.json();
      thunkApi.dispatch(addedBagoInstallment(addBagoInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBagoInstallment = createAsyncThunk(
  "bagoInstallment/UpdatedBagoInstallment",
  async (option: updateBagoInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, id, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoInstallment?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance, id }),
        }
      );
      const { updateBagoInstallment } = await response.json();
      thunkApi.dispatch(updatedBagoInstallment(updateBagoInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBagoInstallment = createAsyncThunk(
  "bagoInstallment/DeletedBagoInstallment",
  async (option: deleteBagoInstallment, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoInstallment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedBagoInstallment(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const BagoInstllment = createSlice({
  name: "lebagoInstallmentaf",
  initialState,
  reducers: {
    setBagoInstallment: (state, action: PayloadAction<BagoInstallment[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedBagoInstallment: (state, action: PayloadAction<BagoInstallment>) => {
      state.item = [...state.item, action.payload];
    },
    updatedBagoInstallment: (state, action: PayloadAction<BagoInstallment>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBagoInstallment: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBagoInstallment,
  setIsLoading,
  addedBagoInstallment,
  updatedBagoInstallment,
  deletedBagoInstallment,
} = BagoInstllment.actions;
export default BagoInstllment.reducer;
