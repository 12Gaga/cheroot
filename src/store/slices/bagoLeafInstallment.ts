import {
  addBagoLeafInstallment,
  bagoLeafInstallmentSlice,
  deleteBagoLeafInstallment,
  updateBagoLeafInstallment,
} from "@/types/bagoLeafInstallment";
import Config from "@/utils/config";
import { BagoLeafInstallment, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bagoLeafInstallmentSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddBagoLeafInstallment = createAsyncThunk(
  "bagoleafInstallment/AddBagoLeafInstallment",
  async (option: addBagoLeafInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLeafInstallment?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance }),
        }
      );
      const { addBagoLeafInstallment } = await response.json();
      thunkApi.dispatch(addedBagoLeafInstallment(addBagoLeafInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBagoLeafInstallment = createAsyncThunk(
  "bagoLeafInstallment/UpdatedBagoLeafInstallment",
  async (option: updateBagoLeafInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, id, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLeafInstallment?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance, id }),
        }
      );
      const { updateBagoLeafInstallment } = await response.json();
      thunkApi.dispatch(updatedBagoLeafInstallment(updateBagoLeafInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBagoLeafInstallment = createAsyncThunk(
  "bagoInstallment/DeletedBagoLeafInstallment",
  async (option: deleteBagoLeafInstallment, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLeafInstallment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedBagoLeafInstallment(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const BagoLeafInstllment = createSlice({
  name: "lebagoInstallmentaf",
  initialState,
  reducers: {
    setBagoLeafInstallment: (
      state,
      action: PayloadAction<BagoLeafInstallment[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedBagoLeafInstallment: (
      state,
      action: PayloadAction<BagoLeafInstallment>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedBagoLeafInstallment: (
      state,
      action: PayloadAction<BagoLeafInstallment>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBagoLeafInstallment: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBagoLeafInstallment,
  setIsLoading,
  addedBagoLeafInstallment,
  updatedBagoLeafInstallment,
  deletedBagoLeafInstallment,
} = BagoLeafInstllment.actions;
export default BagoLeafInstllment.reducer;
