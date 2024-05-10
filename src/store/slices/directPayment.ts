import {
  addDirectPayment,
  deleteDirectPayment,
  directPaymentTypeSlice,
  updateDirectPayment,
} from "@/types/directPaymentType";
import Config from "@/utils/config";
import { MainDirectPayment } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: directPaymentTypeSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddDirectPayment = createAsyncThunk(
  "directPayment/AddDirectPayment",
  async (option: addDirectPayment, thunkApi) => {
    const { date, amount, tilte, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/directPayment?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount, tilte }),
        }
      );
      const { addDirectPayment } = await response.json();
      thunkApi.dispatch(addedDirectPayment(addDirectPayment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedDirectPayment = createAsyncThunk(
  "directPayment/UpdatedDirectPayment",
  async (option: updateDirectPayment, thunkApi) => {
    const { amount, tilte, id, date, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/directPayment?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ date, amount, tilte, id }),
        }
      );
      const { updateDirectPayment } = await response.json();
      thunkApi.dispatch(updatedDirectPayment(updateDirectPayment));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedDirectPayment = createAsyncThunk(
  "directPayment/DeletedDirectPayment",
  async (option: deleteDirectPayment, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/directPayment?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedDirectPayment(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const DirectPaymentSlice = createSlice({
  name: "directPayment",
  initialState,
  reducers: {
    setDirectPayment: (state, action: PayloadAction<MainDirectPayment[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedDirectPayment: (state, action: PayloadAction<MainDirectPayment>) => {
      state.item = [...state.item, action.payload];
    },
    updatedDirectPayment: (state, action: PayloadAction<MainDirectPayment>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedDirectPayment: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setDirectPayment,
  setIsLoading,
  addedDirectPayment,
  updatedDirectPayment,
  deletedDirectPayment,
} = DirectPaymentSlice.actions;
export default DirectPaymentSlice.reducer;
