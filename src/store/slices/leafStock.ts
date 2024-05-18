import {
  createNewLeafAddStock,
  createNewLeafStock,
  deleteLeafAddStock,
  deleteLeafStock,
  leafStockSlice,
  updateLeafAddStock,
  updateLeafStock,
} from "@/types/leafStockType";
import Config from "@/utils/config";
import { Leaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock, deletedAddStock, updatedAddStock } from "./addStock";

const initialState: leafStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateLeafStock = createAsyncThunk(
  "leafStock/CreateLeafStock",
  async (option: createNewLeafStock, thunkApi) => {
    const {
      date,
      typeOfLeafId,
      batchNo,
      viss,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/leafStock`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          date,
          typeOfLeafId,
          batchNo,
          viss,
          garageId,
          shopId,
        }),
      });
      const { newleafStock } = await response.json();
      thunkApi.dispatch(addLeafStock(newleafStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedLeafStock = createAsyncThunk(
  "leafStock/UpdatedLeafStock",
  async (option: updateLeafStock, thunkApi) => {
    const {
      id,
      date,
      typeOfLeafId,
      batchNo,
      viss,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/leafStock`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          date,
          typeOfLeafId,
          batchNo,
          viss,
          garageId,
          shopId,
        }),
      });
      const { updateleafStock } = await response.json();
      thunkApi.dispatch(updatedLeafStock(updateleafStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedLeafStock = createAsyncThunk(
  "leafStock/DeletedLeafStock",
  async (option: deleteLeafStock, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/leafStock?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedLeafStock(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const CreateLeafAddStock = createAsyncThunk(
  "leafStock/CreateLeafAddStock",
  async (option: createNewLeafAddStock, thunkApi) => {
    const {
      date,
      invNo,
      carNo,
      typeOfLeafId,
      batchNo,
      viss,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/leafStock?invNo=${invNo}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            invNo,
            carNo,
            typeOfLeafId,
            batchNo,
            viss,
            garageId,
            shopId,
          }),
        }
      );
      const { newleafAddStock, newAddStock } = await response.json();
      thunkApi.dispatch(addLeafStock(newleafAddStock));
      thunkApi.dispatch(addAddStock(newAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedLeafAddStock = createAsyncThunk(
  "leafAddStock/UpdateLeafAddStock",
  async (option: updateLeafAddStock, thunkApi) => {
    const {
      stockSeq,
      date,
      invNo,
      carNo,
      typeOfLeafId,
      batchNo,
      viss,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/leafStock?invNo=${invNo}`,
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
            typeOfLeafId,
            batchNo,
            viss,
            garageId,
            shopId,
          }),
        }
      );
      const { updateLeafAddStock, updateAddStock } = await response.json();
      thunkApi.dispatch(updatedLeafAddStock(updateLeafAddStock));
      thunkApi.dispatch(updatedAddStock(updateAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedLeafAddStock = createAsyncThunk(
  "leafAddStock/DeletedLeafAddStock",
  async (option: deleteLeafAddStock, thunkApi) => {
    const { stockSeq, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/leafStock?stockSeq=${stockSeq}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedLeafAddStock(stockSeq));
      thunkApi.dispatch(deletedAddStock(stockSeq));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const LeafStockSlice = createSlice({
  name: "leafStock",
  initialState,
  reducers: {
    setLeafStock: (state, action: PayloadAction<Leaf[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addLeafStock: (state, action: PayloadAction<Leaf>) => {
      state.item = [...state.item, action.payload];
    },
    updatedLeafStock: (state, action: PayloadAction<Leaf>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedLeafStock: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
    updatedLeafAddStock: (state, action: PayloadAction<Leaf>) => {
      state.item = state.item.map((item) =>
        item.stockSeq === action.payload.stockSeq ? action.payload : item
      );
    },
    deletedLeafAddStock: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.stockSeq != action.payload);
    },
    addStock: (state, action) => {
      state.item = [...state.item, ...action.payload];
    },
    updatedStock: (state, action) => {
      const seq = action.payload[0].stockSeq;
      const otherItem = state.item.filter((item) => item.stockSeq !== seq);
      state.item = [...otherItem, ...action.payload];
    },
  },
});

export const {
  setLeafStock,
  setIsLoading,
  addLeafStock,
  updatedLeafStock,
  deletedLeafStock,
  updatedLeafAddStock,
  deletedLeafAddStock,
  addStock,
  updatedStock,
} = LeafStockSlice.actions;
export default LeafStockSlice.reducer;
