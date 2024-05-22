import {
  addBagoPlasticlInstallment,
  bagoPlasticInstallmentSlice,
  deleteBagoPlasticInstallment,
  updateBagoPlasticInstallment,
} from "@/types/bagoPlasticInstallment";
import Config from "@/utils/config";
import { BagoPlasticInstallment, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bagoPlasticInstallmentSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddBagoPlasticInstallment = createAsyncThunk(
  "bagoPlasticInstallment/AddBagoPlasticInstallment",
  async (option: addBagoPlasticlInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoPlasticInstallment?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance }),
        }
      );
      const { addBagoPlasticInstallment } = await response.json();
      thunkApi.dispatch(addedBagoPlasticInstallment(addBagoPlasticInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBagoPlasticInstallment = createAsyncThunk(
  "bagoPlasticInstallment/UpdatedBagoPlasticInstallment",
  async (option: updateBagoPlasticInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, id, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoPlasticInstallment?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance, id }),
        }
      );
      const { updateBagoPlasticInstallment } = await response.json();
      thunkApi.dispatch(
        updatedBagoPlasticInstallment(updateBagoPlasticInstallment)
      );
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBagoPlasticInstallment = createAsyncThunk(
  "bagoPlasticInstallment/DeletedBagoPlasticInstallment",
  async (option: deleteBagoPlasticInstallment, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoPlasticInstallment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedBagoPlasticInstallment(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const BagoPlasticInstllment = createSlice({
  name: "lebagoInstallmentaf",
  initialState,
  reducers: {
    setBagoPlasticInstallment: (
      state,
      action: PayloadAction<BagoPlasticInstallment[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedBagoPlasticInstallment: (
      state,
      action: PayloadAction<BagoPlasticInstallment>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedBagoPlasticInstallment: (
      state,
      action: PayloadAction<BagoPlasticInstallment>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBagoPlasticInstallment: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBagoPlasticInstallment,
  setIsLoading,
  addedBagoPlasticInstallment,
  updatedBagoPlasticInstallment,
  deletedBagoPlasticInstallment,
} = BagoPlasticInstllment.actions;
export default BagoPlasticInstllment.reducer;
