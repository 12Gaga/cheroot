import {
  addCherootInstallment,
  cherootInstallmentSlice,
  deleteCherootInstallment,
  updateCherootInstallment,
} from "@/types/cherootInstallment";
import Config from "@/utils/config";
import { ConverycherootInstallment } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: cherootInstallmentSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddCherootInstallment = createAsyncThunk(
  "cherootInstallment/AddCherootInstallment",
  async (option: addCherootInstallment, thunkApi) => {
    const {
      date,
      conveyLocationId,
      cashBalance,
      payBalance,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/cherootInstallment?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            conveyLocationId,
            cashBalance,
            payBalance,
          }),
        }
      );
      const { addCherootInstallment } = await response.json();
      thunkApi.dispatch(addedCherootInstallment(addCherootInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedCherootInstallment = createAsyncThunk(
  "cherootInstallment/UpdatedCherootInstallment",
  async (option: updateCherootInstallment, thunkApi) => {
    const {
      date,
      conveyLocationId,
      cashBalance,
      payBalance,
      id,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/cherootInstallment?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            conveyLocationId,
            cashBalance,
            payBalance,
            id,
          }),
        }
      );
      const { updateCherootInstallment } = await response.json();
      thunkApi.dispatch(updatedCherootInstallment(updateCherootInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedCherootInstallment = createAsyncThunk(
  "cherootInstallment/DeletedCherootInstallment",
  async (option: deleteCherootInstallment, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/cherootInstallment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedCherootInstallment(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const CherootInstllment = createSlice({
  name: "cherootInstallment",
  initialState,
  reducers: {
    setCherootInstallment: (
      state,
      action: PayloadAction<ConverycherootInstallment[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedCherootInstallment: (
      state,
      action: PayloadAction<ConverycherootInstallment>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedCherootInstallment: (
      state,
      action: PayloadAction<ConverycherootInstallment>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedCherootInstallment: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setCherootInstallment,
  setIsLoading,
  addedCherootInstallment,
  updatedCherootInstallment,
  deletedCherootInstallment,
} = CherootInstllment.actions;
export default CherootInstllment.reducer;
