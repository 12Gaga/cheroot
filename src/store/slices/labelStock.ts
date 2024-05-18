import {
  createNewLabelAddStock,
  createNewLabelStock,
  deleteLabelAddStock,
  deleteLabelStock,
  labelStockSlice,
  updateLabelAddStock,
  updateLabelStock,
} from "@/types/labelStockType";
import Config from "@/utils/config";
import { Label, Leaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock, deletedAddStock, updatedAddStock } from "./addStock";

const initialState: labelStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateLabelStock = createAsyncThunk(
  "labelStock/CreateLabelStock",
  async (option: createNewLabelStock, thunkApi) => {
    const {
      date,
      typeOfLabelId,
      bandle,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/labelStock`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          date,
          typeOfLabelId,
          bandle,
          garageId,
          shopId,
        }),
      });
      const { newLabelStock } = await response.json();
      thunkApi.dispatch(addLabelStock(newLabelStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedLabelStock = createAsyncThunk(
  "labelStock/UpdatedLabelStock",
  async (option: updateLabelStock, thunkApi) => {
    const {
      id,
      date,
      typeOfLabelId,
      bandle,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/labelStock`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          date,
          typeOfLabelId,
          bandle,
          garageId,
          shopId,
        }),
      });
      const { updateLabelStock } = await response.json();
      thunkApi.dispatch(updatedLabelStock(updateLabelStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedLabelStock = createAsyncThunk(
  "labelStock/DeletedLabelStock",
  async (option: deleteLabelStock, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/labelStock?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedLabelStock(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const CreateLabelAddStock = createAsyncThunk(
  "labelStock/CreateLabelAddStock",
  async (option: createNewLabelAddStock, thunkApi) => {
    const {
      date,
      invNo,
      carNo,
      typeOfLabelId,
      bandle,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/labelStock?invNo=${invNo}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            invNo,
            carNo,
            typeOfLabelId,
            bandle,
            garageId,
            shopId,
          }),
        }
      );
      const { newLabelAddStock, newAddStock } = await response.json();
      thunkApi.dispatch(addLabelStock(newLabelAddStock));
      thunkApi.dispatch(addAddStock(newAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedLabelAddStock = createAsyncThunk(
  "labelAddStock/UpdateLabelAddStock",
  async (option: updateLabelAddStock, thunkApi) => {
    const {
      stockSeq,
      date,
      invNo,
      carNo,
      typeOfLabelId,
      bandle,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/labelStock?invNo=${invNo}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            stockSeq,
            date,
            invNo,
            carNo,
            typeOfLabelId,
            bandle,
            garageId,
            shopId,
          }),
        }
      );
      const { updateLabelAddStock, updateAddStock } = await response.json();
      thunkApi.dispatch(updatedLabelAddStock(updateLabelAddStock));
      thunkApi.dispatch(updatedAddStock(updateAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedLabelAddStock = createAsyncThunk(
  "labelAddStock/DeletedLabelAddStock",
  async (option: deleteLabelAddStock, thunkApi) => {
    const { stockSeq, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/labelStock?stockSeq=${stockSeq}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedLabelAddStock(stockSeq));
      thunkApi.dispatch(deletedAddStock(stockSeq));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const LabelStockSlice = createSlice({
  name: "labelStock",
  initialState,
  reducers: {
    setLabelStock: (state, action: PayloadAction<Label[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addLabelStock: (state, action: PayloadAction<Label>) => {
      state.item = [...state.item, action.payload];
    },
    updatedLabelStock: (state, action: PayloadAction<Label>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedLabelStock: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
    updatedLabelAddStock: (state, action: PayloadAction<Label>) => {
      state.item = state.item.map((item) =>
        item.stockSeq === action.payload.stockSeq ? action.payload : item
      );
    },
    deletedLabelAddStock: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.stockSeq != action.payload);
    },
  },
});

export const {
  setLabelStock,
  setIsLoading,
  addLabelStock,
  updatedLabelStock,
  deletedLabelStock,
  updatedLabelAddStock,
  deletedLabelAddStock,
} = LabelStockSlice.actions;
export default LabelStockSlice.reducer;
