import {
  addBagoLabelInstallment,
  bagoLabelInstallmentSlice,
  deleteBagoLabelInstallment,
  updateBagoLabelInstallment,
} from "@/types/bagoLabelInstallment ";
import Config from "@/utils/config";
import {
  BagoLabelInstallment,
  BagoLeafInstallment,
  TypeOfLeaf,
} from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bagoLabelInstallmentSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddBagoLabelInstallment = createAsyncThunk(
  "bagoLabelInstallment/AddBagoLabelInstallment",
  async (option: addBagoLabelInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLabelInstallment?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance }),
        }
      );
      const { addBagoLabelInstallment } = await response.json();
      thunkApi.dispatch(addedBagoLabelInstallment(addBagoLabelInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBagoLabelInstallment = createAsyncThunk(
  "bagoLabelInstallment/UpdatedBagoLabelInstallment",
  async (option: updateBagoLabelInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, id, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLabelInstallment?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance, id }),
        }
      );
      const { updateBagoLabelInstallment } = await response.json();
      thunkApi.dispatch(
        updatedBagoLabelInstallment(updateBagoLabelInstallment)
      );
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBagoLabelInstallment = createAsyncThunk(
  "bagoLabelInstallment/DeletedBagoLabelInstallment",
  async (option: deleteBagoLabelInstallment, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLabelInstallment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedBagoLabelInstallment(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const BagoLabelInstllment = createSlice({
  name: "lebagoInstallmentaf",
  initialState,
  reducers: {
    setBagoLabelInstallment: (
      state,
      action: PayloadAction<BagoLabelInstallment[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedBagoLabelInstallment: (
      state,
      action: PayloadAction<BagoLabelInstallment>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedBagoLabelInstallment: (
      state,
      action: PayloadAction<BagoLabelInstallment>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBagoLabelInstallment: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBagoLabelInstallment,
  setIsLoading,
  addedBagoLabelInstallment,
  updatedBagoLabelInstallment,
  deletedBagoLabelInstallment,
} = BagoLabelInstllment.actions;
export default BagoLabelInstllment.reducer;
