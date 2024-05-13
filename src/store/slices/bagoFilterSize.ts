import {
  bagoFilterSizeSlice,
  createNewBagoFilterSize,
  deleteBagoFilterSize,
  updateBagoFilterSize,
} from "@/types/bagoFilterSizeType";
import Config from "@/utils/config";
import { BagoFilterSizePurchase } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bagoFilterSizeSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateBagoFilterSize = createAsyncThunk(
  "bagoFilterSize/CreateBagoFilterSize",
  async (option: createNewBagoFilterSize, thunkApi) => {
    const {
      date,
      shopId,
      typeOfFilterSizeId,
      quantity,
      bag,
      totalPrice,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoFilterSize?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            shopId,
            typeOfFilterSizeId,
            quantity,
            bag,
            totalPrice,
          }),
        }
      );
      const { newBagoFilterSize } = await response.json();
      thunkApi.dispatch(addBagoFilterSize(newBagoFilterSize));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedBagoFilterSize = createAsyncThunk(
  "bagoFilterSize/UpdatedBagoFilterSize",
  async (option: updateBagoFilterSize, thunkApi) => {
    const {
      date,
      shopId,
      typeOfFilterSizeId,
      quantity,
      bag,
      totalPrice,
      id,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoFilterSize?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            shopId,
            typeOfFilterSizeId,
            quantity,
            bag,
            totalPrice,
            id,
          }),
        }
      );
      const { updateBagoFilterSize } = await response.json();
      thunkApi.dispatch(updatedBagoFilterSize(updateBagoFilterSize));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedBagoFilterSize = createAsyncThunk(
  "bagoFilterSize/DeletedBagoFilterSize",
  async (option: deleteBagoFilterSize, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/bagoFilterSize?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedBagoFilterSize(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const BagoFilterSizeSlice = createSlice({
  name: "bagoLeaf",
  initialState,
  reducers: {
    setBagoFilterSize: (
      state,
      action: PayloadAction<BagoFilterSizePurchase[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addBagoFilterSize: (
      state,
      action: PayloadAction<BagoFilterSizePurchase>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedBagoFilterSize: (
      state,
      action: PayloadAction<BagoFilterSizePurchase>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedBagoFilterSize: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setBagoFilterSize,
  setIsLoading,
  addBagoFilterSize,
  updatedBagoFilterSize,
  deletedBagoFilterSize,
} = BagoFilterSizeSlice.actions;
export default BagoFilterSizeSlice.reducer;
