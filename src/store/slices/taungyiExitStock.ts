import {
  addNewTaungyiExitStock,
  deleteTaungyiExitStock,
  taungyiExitStockSlice,
  updateTaungyiExitStock,
} from "@/types/taungyiExitStock";
import Config from "@/utils/config";
import { TaungyiQuitStock } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: taungyiExitStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddTaungyiExitStock = createAsyncThunk(
  "taungyiExitStock/AddTaungyiExitStock",
  async (option: addNewTaungyiExitStock, thunkApi) => {
    const {
      date,
      storeId,
      tolBatchNo,
      netWeight,
      cigratteIndustryId,
      onSuccess,
      onError,
    } = option;
    console.log("id2", cigratteIndustryId);
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/taungyiExitStock?cigratteIndustryId=${cigratteIndustryId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            storeId,
            tolBatchNo,
            netWeight,
          }),
        }
      );
      const { newTaungyiExitStock } = await response.json();
      thunkApi.dispatch(addTaungyiExitStock(newTaungyiExitStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedTaungyiExitStock = createAsyncThunk(
  "taungyiExitStock/UpdatedTaungyiExitStock",
  async (option: updateTaungyiExitStock, thunkApi) => {
    const {
      date,
      storeId,
      tolBatchNo,
      netWeight,
      cigratteIndustryId,
      id,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/taungyiExitStock`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          date,
          storeId,
          tolBatchNo,
          netWeight,
          id,
        }),
      });
      const { updateTaungyiExitStock } = await response.json();
      thunkApi.dispatch(updatedTaungyiExitStock(updateTaungyiExitStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedTaungyiExitStock = createAsyncThunk(
  "taungyiExitStock/DeletedTaungyiExitStock",
  async (option: deleteTaungyiExitStock, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/taungyiExitStock?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedTaungyiExitStock(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TaungyiExitStockSlice = createSlice({
  name: "taungyiExitStock",
  initialState,
  reducers: {
    setTaungyiExitStock: (state, action: PayloadAction<TaungyiQuitStock[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addTaungyiExitStock: (state, action: PayloadAction<TaungyiQuitStock>) => {
      state.item = [...state.item, action.payload];
    },
    updatedTaungyiExitStock: (
      state,
      action: PayloadAction<TaungyiQuitStock>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedTaungyiExitStock: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setTaungyiExitStock,
  setIsLoading,
  addTaungyiExitStock,
  updatedTaungyiExitStock,
  deletedTaungyiExitStock,
} = TaungyiExitStockSlice.actions;
export default TaungyiExitStockSlice.reducer;
