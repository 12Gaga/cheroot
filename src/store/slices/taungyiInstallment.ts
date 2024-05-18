import {
  addTaungyiInstallment,
  deleteTaungyiInstallment,
  taungyiInstallmentSlice,
  updateTaungyiInstallment,
} from "@/types/taungyiInstallment";
import Config from "@/utils/config";
import { TaungyiInstallment } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: taungyiInstallmentSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddTaungyiInstallment = createAsyncThunk(
  "taungyiInstallment/AddTaungyiInstallment",
  async (option: addTaungyiInstallment, thunkApi) => {
    const {
      date,
      banquetId,
      cashBalance,
      payBalance,
      cigratteIndustryId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/taungyiInstallment?cigratteIndustryId=${cigratteIndustryId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, banquetId, cashBalance, payBalance }),
        }
      );
      const { addTaungyiInstallment } = await response.json();
      thunkApi.dispatch(addedTaungyiInstllment(addTaungyiInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedTaungyiInstallment = createAsyncThunk(
  "taungyiInstallment/UpdatedTaungyiInstallment",
  async (option: updateTaungyiInstallment, thunkApi) => {
    const {
      date,
      banquetId,
      cashBalance,
      payBalance,
      id,
      cigratteIndustryId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/taungyiInstallment?cigratteIndustryId=${cigratteIndustryId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            banquetId,
            cashBalance,
            payBalance,
            id,
          }),
        }
      );
      const { updateTaungyiInstallment } = await response.json();
      thunkApi.dispatch(updatedTaungyiInstllment(updateTaungyiInstallment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedTaungyiInstallment = createAsyncThunk(
  "taungyiInstallment/DeletedTaungyiInstallment",
  async (option: deleteTaungyiInstallment, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/taungyiInstallment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedTaungyiInstllment(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TaungyiInstllment = createSlice({
  name: "taungyiInstallment",
  initialState,
  reducers: {
    setTaungyiInstllment: (
      state,
      action: PayloadAction<TaungyiInstallment[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedTaungyiInstllment: (
      state,
      action: PayloadAction<TaungyiInstallment>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedTaungyiInstllment: (
      state,
      action: PayloadAction<TaungyiInstallment>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedTaungyiInstllment: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setTaungyiInstllment,
  setIsLoading,
  addedTaungyiInstllment,
  updatedTaungyiInstllment,
  deletedTaungyiInstllment,
} = TaungyiInstllment.actions;
export default TaungyiInstllment.reducer;
