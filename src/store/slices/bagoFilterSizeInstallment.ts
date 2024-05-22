import {
  addBagoFilterSizeInstallment,
  bagoFilterSizeInstallmentSlice,
  deleteBagoFilterSizeInstallment,
  updateBagoFilterSizeInstallment,
} from "@/types/bagoFilterSizeInstallment";
import Config from "@/utils/config";
import { BagoFilterSizeInstallment } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bagoFilterSizeInstallmentSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddBagoFilterSizeInstallment = createAsyncThunk(
  "bagoFilterSizeInstallment/AddBagoFilterSizeInstallment",
  async (option: addBagoFilterSizeInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoFilterSizeInstallment?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance }),
        }
      );
      const { addBagoFilterSizeInstallment } = await response.json();
      thunkApi.dispatch(
        addedBagoFilterSizeInstallment(addBagoFilterSizeInstallment)
      );
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBagoFilterSizeInstallment = createAsyncThunk(
  "bagoFilterSizeInstallment/UpdatedBagoFilterSizeInstallment",
  async (option: updateBagoFilterSizeInstallment, thunkApi) => {
    const { date, shopId, cashBalance, payBalance, id, onSuccess, onError } =
      option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoFilterSizeInstallment?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, shopId, cashBalance, payBalance, id }),
        }
      );
      const { updateBagoFilterSizeInstallment } = await response.json();
      thunkApi.dispatch(
        updatedBagoFilterSizeInstallment(updateBagoFilterSizeInstallment)
      );
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBagoFilterSizeInstallment = createAsyncThunk(
  "bagoFilterSizeInstallment/DeletedBagoFilterSizeInstallment",
  async (option: deleteBagoFilterSizeInstallment, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoFilterSizeInstallment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedBagoFilterSizeInstallment(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const BagoFilterSizeInstllment = createSlice({
  name: "bagoFilterSizeInstallment",
  initialState,
  reducers: {
    setBagoFilterSizeInstallment: (
      state,
      action: PayloadAction<BagoFilterSizeInstallment[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedBagoFilterSizeInstallment: (
      state,
      action: PayloadAction<BagoFilterSizeInstallment>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedBagoFilterSizeInstallment: (
      state,
      action: PayloadAction<BagoFilterSizeInstallment>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBagoFilterSizeInstallment: (
      state,
      action: PayloadAction<number>
    ) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBagoFilterSizeInstallment,
  setIsLoading,
  addedBagoFilterSizeInstallment,
  updatedBagoFilterSizeInstallment,
  deletedBagoFilterSizeInstallment,
} = BagoFilterSizeInstllment.actions;
export default BagoFilterSizeInstllment.reducer;
