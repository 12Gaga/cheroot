import {
  createNewLeafAddStock,
  createNewLeafStock,
  leafStockSlice,
} from "@/types/leafStockType";
import Config from "@/utils/config";
import { Leaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAddStock } from "./addStock";

const initialState: leafStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateLeafStock = createAsyncThunk(
  "leafStock/CreateLeafStock",
  async (option: createNewLeafStock, thunkApi) => {
    const { typeOfLeafId, batchNo, viss, garageId, shop, onSuccess, onError } =
      option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/leafStock`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          typeOfLeafId,
          batchNo,
          viss,
          garageId,
          shop,
        }),
      });
      const { newLeafStock } = await response.json();
      thunkApi.dispatch(addLeafStock(newLeafStock));
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
      invNo,
      carNo,
      typeOfLeafId,
      batchNo,
      viss,
      garageId,
      shop,
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
            invNo,
            carNo,
            typeOfLeafId,
            batchNo,
            viss,
            garageId,
            shop,
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
  },
});

export const { setLeafStock, setIsLoading, addLeafStock } =
  LeafStockSlice.actions;
export default LeafStockSlice.reducer;
