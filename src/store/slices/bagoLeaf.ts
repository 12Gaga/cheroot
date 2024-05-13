import {
  bagoLeafSlice,
  createNewBagoLeaf,
  deleteBagoLeaf,
  updateBagoLeaf,
} from "@/types/bagoLeafType";
import Config from "@/utils/config";
import { BagoLeafPurchase, LeafTransferGarage } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bagoLeafSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateBagoLeaf = createAsyncThunk(
  "bagoLeaf/CreateBagoLeaf",
  async (option: createNewBagoLeaf, thunkApi) => {
    const {
      date,
      shopId,
      typeOfLeafId,
      netWeight,
      netPrice,
      totalPrice,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLeaf?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            shopId,
            typeOfLeafId,
            netWeight,
            netPrice,
            totalPrice,
          }),
        }
      );
      const { newBagoLeaf } = await response.json();
      thunkApi.dispatch(addBagoLeaf(newBagoLeaf));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBagoLeaf = createAsyncThunk(
  "bagoLeaf/UpdatedBagoLeaf",
  async (option: updateBagoLeaf, thunkApi) => {
    const {
      date,
      shopId,
      typeOfLeafId,
      netWeight,
      netPrice,
      totalPrice,
      id,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoLeaf?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            shopId,
            typeOfLeafId,
            netWeight,
            netPrice,
            totalPrice,
            id,
          }),
        }
      );
      const { updateBagoLeaf } = await response.json();
      thunkApi.dispatch(updatedBagoLeaf(updateBagoLeaf));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBagoLeaf = createAsyncThunk(
  "bagoLeaf/DeletedBagoLeaf",
  async (option: deleteBagoLeaf, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/bagoLeaf?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedBagoLeaf(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const BagoLeafSlice = createSlice({
  name: "bagoLeaf",
  initialState,
  reducers: {
    setBagoLeaf: (state, action: PayloadAction<BagoLeafPurchase[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addBagoLeaf: (state, action: PayloadAction<BagoLeafPurchase>) => {
      state.item = [...state.item, action.payload];
    },
    updatedBagoLeaf: (state, action: PayloadAction<BagoLeafPurchase>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBagoLeaf: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBagoLeaf,
  setIsLoading,
  addBagoLeaf,
  updatedBagoLeaf,
  deletedBagoLeaf,
} = BagoLeafSlice.actions;
export default BagoLeafSlice.reducer;
