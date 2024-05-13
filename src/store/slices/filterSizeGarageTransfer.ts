import {
  createNewFilterSizeTransfer,
  deleteFilterSizeTransfer,
  filterSizeTransferSlice,
  updateFilterSizeTransfer,
} from "@/types/filterSizeTransferGarageType";
import Config from "@/utils/config";
import { FilterSizeTransferGarage, LeafTransferGarage } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: filterSizeTransferSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateFilterSizeTransfer = createAsyncThunk(
  "filterSizeTransfer/CreateFilterSizeTransfer",
  async (option: createNewFilterSizeTransfer, thunkApi) => {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfFilterSizeId,
      quantity,
      bag,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/filterSizeTransfer?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfFilterSizeId,
            quantity,
            bag,
          }),
        }
      );
      const { newFilterSizeTransfer } = await response.json();
      thunkApi.dispatch(addFilterSizeTransfer(newFilterSizeTransfer));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedFilterSizeTransfer = createAsyncThunk(
  "filterSizeTransfer/UpdatedFilterSizeTransfer",
  async (option: updateFilterSizeTransfer, thunkApi) => {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfFilterSizeId,
      quantity,
      bag,
      id,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/filterSizeTransfer?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfFilterSizeId,
            quantity,
            bag,
            id,
          }),
        }
      );
      const { updateFilterSizeTransfer } = await response.json();
      thunkApi.dispatch(updatedFilterSizeTransfer(updateFilterSizeTransfer));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedFilterSizeTransfer = createAsyncThunk(
  "filterSizeTransfer/DeletedFilterSizeTransfer",
  async (option: deleteFilterSizeTransfer, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/filterSizeTransfer?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedFilterSizeTransfer(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const FilterSizeTransferSlice = createSlice({
  name: "filterSizeTransfer",
  initialState,
  reducers: {
    setFilterSizeTransfer: (
      state,
      action: PayloadAction<FilterSizeTransferGarage[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addFilterSizeTransfer: (
      state,
      action: PayloadAction<FilterSizeTransferGarage>
    ) => {
      state.item = [...state.item, action.payload];
    },
    updatedFilterSizeTransfer: (
      state,
      action: PayloadAction<FilterSizeTransferGarage>
    ) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedFilterSizeTransfer: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setFilterSizeTransfer,
  setIsLoading,
  addFilterSizeTransfer,
  updatedFilterSizeTransfer,
  deletedFilterSizeTransfer,
} = FilterSizeTransferSlice.actions;
export default FilterSizeTransferSlice.reducer;
