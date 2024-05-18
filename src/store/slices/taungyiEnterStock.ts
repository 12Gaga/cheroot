import { deleteBanquet } from "@/types/banquetType";
import {
  addNewTaungyiEnterStock,
  deleteTaungyiEnterStock,
  taungyiEnterStockSlice,
  updateTaungyiEnterStock,
} from "@/types/taungyiEnterStock";
import Config from "@/utils/config";
import { TaungyiEnterStock } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: taungyiEnterStockSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddTaungyiEnterStock = createAsyncThunk(
  "taungyiEnterStock/AddTaungyiEnterStock",
  async (option: addNewTaungyiEnterStock, thunkApi) => {
    const {
      date,
      storeId,
      banquetId,
      tolBatchNo,
      netWeight,
      netPrice,
      tolNetPrice,
      packingFees,
      tolPackingFees,
      totalPrice,
      cigratteIndustryId,
      onSuccess,
      onError,
    } = option;
    console.log("id2", cigratteIndustryId);
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/taungyiEnterStock?cigratteIndustryId=${cigratteIndustryId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            storeId,
            banquetId,
            tolBatchNo,
            netWeight,
            netPrice,
            tolNetPrice,
            packingFees,
            tolPackingFees,
            totalPrice,
          }),
        }
      );
      const { newTaungyiEnterStock } = await response.json();
      thunkApi.dispatch(addTaungyiEnterStock(newTaungyiEnterStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedTaungyiEnterStock = createAsyncThunk(
  "taungyiEnterStock/UpdatedTaungyiEnterStock",
  async (option: updateTaungyiEnterStock, thunkApi) => {
    const {
      date,
      storeId,
      banquetId,
      tolBatchNo,
      netWeight,
      netPrice,
      tolNetPrice,
      packingFees,
      tolPackingFees,
      totalPrice,
      cigratteIndustryId,
      id,
      onSuccess,
      onError,
    } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/taungyiEnterStock`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          date,
          storeId,
          banquetId,
          tolBatchNo,
          netWeight,
          netPrice,
          tolNetPrice,
          packingFees,
          tolPackingFees,
          totalPrice,
          cigratteIndustryId,
          id,
        }),
      });
      const { updateTaungyiEnterStock } = await response.json();
      thunkApi.dispatch(updatedTaungyiEnterStock(updateTaungyiEnterStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedTaungyiEnterStock = createAsyncThunk(
  "taungyiEnterStock/DeletedTaungyiEnterStock",
  async (option: deleteTaungyiEnterStock, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/taungyiEnterStock?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedTaungyiEnterStock(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TaungyiEnterStockSlice = createSlice({
  name: "taungyiEnterStock",
  initialState,
  reducers: {
    setTaungyiEnterStock: (
      state,
      action: PayloadAction<TaungyiEnterStock[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addTaungyiEnterStock: (state, action: PayloadAction<TaungyiEnterStock>) => {
      state.item = [...state.item, action.payload];
    },
    updatedTaungyiEnterStock: (
      state,
      action: PayloadAction<TaungyiEnterStock>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedTaungyiEnterStock: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setTaungyiEnterStock,
  setIsLoading,
  addTaungyiEnterStock,
  updatedTaungyiEnterStock,
  deletedTaungyiEnterStock,
} = TaungyiEnterStockSlice.actions;
export default TaungyiEnterStockSlice.reducer;
