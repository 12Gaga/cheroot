import {
  bagoLabelSlice,
  createNewBagoLabel,
  deleteBagoLabel,
  updateBagoLabel,
} from "@/types/bagoLabelType";
import Config from "@/utils/config";
import { BagoLabelPurchase } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bagoLabelSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateBagoLabel = createAsyncThunk(
  "bagoLabel/CreateBagoLabel",
  async (option: createNewBagoLabel, thunkApi) => {
    const {
      date,
      shopId,
      typeOfLabelId,
      bandle,
      totalPrice,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLabel?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            shopId,
            typeOfLabelId,
            bandle,
            totalPrice,
          }),
        }
      );
      const { newBagoLabel } = await response.json();
      thunkApi.dispatch(addBagoLabel(newBagoLabel));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBagoLabel = createAsyncThunk(
  "bagoLabel/UpdatedBagoLabel",
  async (option: updateBagoLabel, thunkApi) => {
    const {
      date,
      shopId,
      typeOfLabelId,
      bandle,
      totalPrice,
      id,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLabel?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            shopId,
            typeOfLabelId,
            bandle,
            totalPrice,
            id,
          }),
        }
      );
      const { updateBagoLabel } = await response.json();
      thunkApi.dispatch(updatedBagoLabel(updateBagoLabel));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBagoLabel = createAsyncThunk(
  "bagoLabel/DeletedBagoLabel",
  async (option: deleteBagoLabel, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/bagoLabel?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedBagoLabel(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const BagoLabelSlice = createSlice({
  name: "bagoLabel",
  initialState,
  reducers: {
    setBagoLabel: (state, action: PayloadAction<BagoLabelPurchase[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addBagoLabel: (state, action: PayloadAction<BagoLabelPurchase>) => {
      state.item = [...state.item, action.payload];
    },
    updatedBagoLabel: (state, action: PayloadAction<BagoLabelPurchase>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBagoLabel: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBagoLabel,
  setIsLoading,
  addBagoLabel,
  updatedBagoLabel,
  deletedBagoLabel,
} = BagoLabelSlice.actions;
export default BagoLabelSlice.reducer;
