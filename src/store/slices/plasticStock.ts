import Config from "@/utils/config";
import { Plastic } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock, deletedAddStock, updatedAddStock } from "./addStock";
import {
  createNewPlasticAddStock,
  createNewPlasticStock,
  deletePlasticAddStock,
  deletePlasticStock,
  plasticStockSlice,
  updatePlasticAddStock,
  updatePlasticStock,
} from "@/types/plasticStockType";

const initialState: plasticStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreatePlasticStock = createAsyncThunk(
  "plasticStock/CreatPlasticStock",
  async (option: createNewPlasticStock, thunkApi) => {
    const {
      date,
      typeOfPlasticId,
      quantity,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/plasticStock`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          date,
          typeOfPlasticId,
          quantity,
          bag,
          garageId,
          shopId,
        }),
      });
      const { newPlasticStock } = await response.json();
      thunkApi.dispatch(addPlasticStock(newPlasticStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedPlasticStock = createAsyncThunk(
  "plasticStock/UpdatedPlasticStock",
  async (option: updatePlasticStock, thunkApi) => {
    const {
      id,
      date,
      typeOfPlasticId,
      quantity,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/plasticStock`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          date,
          typeOfPlasticId,
          quantity,
          bag,
          garageId,
          shopId,
        }),
      });
      const { updatePlasticStock } = await response.json();
      thunkApi.dispatch(updatedPlasticStock(updatePlasticStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedPlasticStock = createAsyncThunk(
  "plasticStock/DeletedPlasticStock",
  async (option: deletePlasticStock, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/plasticStock?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedPlasticStock(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const CreatePlasticAddStock = createAsyncThunk(
  "plasticStock/CreatePlasticAddStock",
  async (option: createNewPlasticAddStock, thunkApi) => {
    const {
      date,
      invNo,
      carNo,
      typeOfPlasticId,
      quantity,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/plasticStock?invNo=${invNo}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            invNo,
            carNo,
            typeOfPlasticId,
            quantity,
            bag,
            garageId,
            shopId,
          }),
        }
      );
      const { newPlasticAddStock, newAddStock } = await response.json();
      thunkApi.dispatch(addPlasticStock(newPlasticAddStock));
      thunkApi.dispatch(addAddStock(newAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedPlasticAddStock = createAsyncThunk(
  "plasticAddStock/UpdatePlasticAddStock",
  async (option: updatePlasticAddStock, thunkApi) => {
    const {
      stockSeq,
      date,
      invNo,
      carNo,
      typeOfPlasticId,
      quantity,
      bag,
      garageId,
      shopId,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/plasticStock?invNo=${invNo}`,
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
            typeOfPlasticId,
            quantity,
            bag,
            garageId,
            shopId,
          }),
        }
      );
      const { updatePlasticAddStock, updateAddStock } = await response.json();
      thunkApi.dispatch(updatedPlasticAddStock(updatePlasticAddStock));
      thunkApi.dispatch(updatedAddStock(updateAddStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedPlasticAddStock = createAsyncThunk(
  "plasticStock/DeletedPlasticAddStock",
  async (option: deletePlasticAddStock, thunkApi) => {
    const { stockSeq, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/plasticStock?stockSeq=${stockSeq}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedPlasticAddStock(stockSeq));
      thunkApi.dispatch(deletedAddStock(stockSeq));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const PlasticStockSlice = createSlice({
  name: "plasticStock",
  initialState,
  reducers: {
    setPlasticStock: (state, action: PayloadAction<Plastic[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addPlasticStock: (state, action: PayloadAction<Plastic>) => {
      state.item = [...state.item, action.payload];
    },
    updatedPlasticStock: (state, action: PayloadAction<Plastic>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedPlasticStock: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
    updatedPlasticAddStock: (state, action: PayloadAction<Plastic>) => {
      state.item = state.item.map((item) =>
        item.stockSeq === action.payload.stockSeq ? action.payload : item
      );
    },
    deletedPlasticAddStock: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.stockSeq != action.payload);
    },
  },
});

export const {
  setPlasticStock,
  setIsLoading,
  addPlasticStock,
  deletedPlasticStock,
  updatedPlasticStock,
  updatedPlasticAddStock,
  deletedPlasticAddStock,
} = PlasticStockSlice.actions;
export default PlasticStockSlice.reducer;
