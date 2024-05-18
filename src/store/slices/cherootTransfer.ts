import {
  addCherootTransfer,
  cherootTransferSlice,
  deleteCherootTransfer,
  updateCherootTransfer,
} from "@/types/bagoInstallment copy";
import Config from "@/utils/config";
import { Conveying } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: cherootTransferSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddCherootTransfer = createAsyncThunk(
  "cherootTransfer/AddCherootTransfer",
  async (option: addCherootTransfer, thunkApi) => {
    const {
      date,
      conveyLocationId,
      typeOfCherootId,
      typeOfPackingId,
      formOfPackingId,
      quantity,
      totalPrice,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/cherootTransfer?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            conveyLocationId,
            typeOfCherootId,
            typeOfPackingId,
            formOfPackingId,
            quantity,
            totalPrice,
          }),
        }
      );
      const { addCherootTransfer } = await response.json();
      thunkApi.dispatch(addedCherootTransfer(addCherootTransfer));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedCherootTransfer = createAsyncThunk(
  "cherootTransfer/UpdatedCherootTransfer",
  async (option: updateCherootTransfer, thunkApi) => {
    const {
      date,
      conveyLocationId,
      typeOfCherootId,
      typeOfPackingId,
      formOfPackingId,
      quantity,
      totalPrice,
      id,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/cherootTransfer?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            conveyLocationId,
            typeOfCherootId,
            typeOfPackingId,
            formOfPackingId,
            quantity,
            totalPrice,
            id,
          }),
        }
      );
      const { updateCherootTransfer } = await response.json();
      thunkApi.dispatch(updatedCherootTransfer(updateCherootTransfer));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedCherootTransfer = createAsyncThunk(
  "cherootTransfer/DeletedCherootTransfer",
  async (option: deleteCherootTransfer, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/cherootTransfer?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedCherootTransfer(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const CherootTransfer = createSlice({
  name: "cherootTransfer",
  initialState,
  reducers: {
    setCherootTransfer: (state, action: PayloadAction<Conveying[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedCherootTransfer: (state, action: PayloadAction<Conveying>) => {
      state.item = [...state.item, action.payload];
    },
    updatedCherootTransfer: (state, action: PayloadAction<Conveying>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedCherootTransfer: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setCherootTransfer,
  setIsLoading,
  addedCherootTransfer,
  updatedCherootTransfer,
  deletedCherootTransfer,
} = CherootTransfer.actions;
export default CherootTransfer.reducer;
