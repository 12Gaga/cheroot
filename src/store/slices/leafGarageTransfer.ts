import {
  createNewLeafTransfer,
  deleteLeafTransfer,
  leafTransferSlice,
  updateLeafTransfer,
} from "@/types/leafTransferGarageType";
import Config from "@/utils/config";
import { LeafTransferGarage } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addStock, deletedLeafAddStock, updatedStock } from "./leafStock";

const initialState: leafTransferSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateLeafTransfer = createAsyncThunk(
  "leafTransfer/CreateLeafTransfer",
  async (option: createNewLeafTransfer, thunkApi) => {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfLeafId,
      batchNos,
      tolViss,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/leafTransfer?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfLeafId,
            batchNos,
            tolViss,
          }),
        }
      );
      const { newLeafTransfer, newLeafStock } = await response.json();
      thunkApi.dispatch(addLeafTransfer(newLeafTransfer));
      thunkApi.dispatch(addStock(newLeafStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedLeafTransfer = createAsyncThunk(
  "leafTransfer/UpdatedLeafTransfer",
  async (option: updateLeafTransfer, thunkApi) => {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfLeafId,
      batchNos,
      tolViss,
      transferSeq,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/leafTransfer?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfLeafId,
            batchNos,
            tolViss,
            transferSeq,
          }),
        }
      );
      const { updateLeafTransfer, updateLeafStock } = await response.json();
      thunkApi.dispatch(updatedLeafTransfer(updateLeafTransfer));
      thunkApi.dispatch(updatedStock(updateLeafStock));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedLeafTransfer = createAsyncThunk(
  "leafTransfer/DeletedLeafTransfer",
  async (option: deleteLeafTransfer, thunkApi) => {
    const { transferSeq, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/leafTransfer?transferSeq=${transferSeq}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedLeafTransfer(transferSeq));
      thunkApi.dispatch(deletedLeafAddStock(transferSeq));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const LeafTransferSlice = createSlice({
  name: "leafTransfer",
  initialState,
  reducers: {
    setLeafTransfer: (state, action: PayloadAction<LeafTransferGarage[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addLeafTransfer: (state, action) => {
      state.item = [...state.item, ...action.payload];
    },
    updatedLeafTransfer: (state, action: PayloadAction<LeafTransferGarage>) => {
      state.item = state.item.map((item) =>
        item.transferSeq === action.payload.transferSeq ? action.payload : item
      );
    },
    deletedLeafTransfer: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter(
        (item) => item.transferSeq != action.payload
      );
    },
  },
});

export const {
  setLeafTransfer,
  setIsLoading,
  addLeafTransfer,
  updatedLeafTransfer,
  deletedLeafTransfer,
} = LeafTransferSlice.actions;
export default LeafTransferSlice.reducer;
