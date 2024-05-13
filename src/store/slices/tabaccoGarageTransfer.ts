import {
  createNewTabaccoTransfer,
  deleteTabaccoTransfer,
  tabaccoTransferSlice,
  updateTabaccoTransfer,
} from "@/types/tabaccoTransferGarageType";
import Config from "@/utils/config";
import { LeafTransferGarage, TabaccoTransferGarage } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: tabaccoTransferSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateTabaccoTransfer = createAsyncThunk(
  "tabaccoTransfer/CreateTabaccoTransfer",
  async (option: createNewTabaccoTransfer, thunkApi) => {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfTabaccoId,
      tin,
      pyi,
      bag,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/tabaccoTransfer?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfTabaccoId,
            tin,
            pyi,
            bag,
          }),
        }
      );
      const { newTabaccoTransfer } = await response.json();
      thunkApi.dispatch(addTabaccoTransfer(newTabaccoTransfer));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedTabaccoTransfer = createAsyncThunk(
  "tabaccoTransfer/UpdatedTabaccoTransfer",
  async (option: updateTabaccoTransfer, thunkApi) => {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfTabaccoId,
      tin,
      pyi,
      bag,
      id,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/tabaccoTransfer?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfTabaccoId,
            tin,
            pyi,
            bag,
            id,
          }),
        }
      );
      const { updateTabaccoTransfer } = await response.json();
      thunkApi.dispatch(updatedTabaccoTransfer(updateTabaccoTransfer));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedTabaccoTransfer = createAsyncThunk(
  "tabaccoTransfer/DeletedTabaccoTransfer",
  async (option: deleteTabaccoTransfer, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/tabaccoTransfer?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedTabaccoTransfer(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TabaccoTransferSlice = createSlice({
  name: "tabaccoTransfer",
  initialState,
  reducers: {
    setTabaccoTransfer: (
      state,
      action: PayloadAction<TabaccoTransferGarage[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addTabaccoTransfer: (
      state,
      action: PayloadAction<TabaccoTransferGarage>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedTabaccoTransfer: (
      state,
      action: PayloadAction<TabaccoTransferGarage>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedTabaccoTransfer: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setTabaccoTransfer,
  setIsLoading,
  addTabaccoTransfer,
  updatedTabaccoTransfer,
  deletedTabaccoTransfer,
} = TabaccoTransferSlice.actions;
export default TabaccoTransferSlice.reducer;
