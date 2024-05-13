import {
  createNewLabelTransfer,
  deleteLabelTransfer,
  labelTransferSlice,
  updateLabelTransfer,
} from "@/types/labelTransferGarageType";
import Config from "@/utils/config";
import { LabelTransferGarage, LeafTransferGarage } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: labelTransferSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateLabelTransfer = createAsyncThunk(
  "labelTransfer/CreateLabelTransfer",
  async (option: createNewLabelTransfer, thunkApi) => {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfLabelId,
      bandle,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/labelTransfer?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfLabelId,
            bandle,
          }),
        }
      );
      const { newLabelTransfer } = await response.json();
      thunkApi.dispatch(addLabelTransfer(newLabelTransfer));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedLabelTransfer = createAsyncThunk(
  "labelTransfer/UpdatedLabelTransfer",
  async (option: updateLabelTransfer, thunkApi) => {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfLabelId,
      bandle,
      id,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/labelTransfer?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfLabelId,
            bandle,
            id,
          }),
        }
      );
      const { updateLabelTransfer } = await response.json();
      thunkApi.dispatch(updatedLabelTransfer(updateLabelTransfer));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedLabelTransfer = createAsyncThunk(
  "labelTransfer/DeletedLabelTransfer",
  async (option: deleteLabelTransfer, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/labelTransfer?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedLabelTransfer(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const LabelTransferSlice = createSlice({
  name: "labelTransfer",
  initialState,
  reducers: {
    setLabelTransfer: (state, action: PayloadAction<LabelTransferGarage[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addLabelTransfer: (state, action: PayloadAction<LabelTransferGarage>) => {
      state.item = [...state.item, action.payload];
    },
    updatedLabelTransfer: (
      state,
      action: PayloadAction<LabelTransferGarage>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedLabelTransfer: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setLabelTransfer,
  setIsLoading,
  addLabelTransfer,
  updatedLabelTransfer,
  deletedLabelTransfer,
} = LabelTransferSlice.actions;
export default LabelTransferSlice.reducer;
