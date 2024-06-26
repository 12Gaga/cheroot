import {
  addPackingData,
  deletePackingData,
  packingDataSlice,
  updatePackingData,
} from "@/types/pacingDataType";
import Config from "@/utils/config";
import { Packing } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: packingDataSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const AddPackingData = createAsyncThunk(
  "packingData/AddPackingData",
  async (option: addPackingData, thunkApi) => {
    const {
      date,
      typeOfCherootId,
      typeOfPackingId,
      formOfPackingId,
      packingPlasticId,
      packingPlasticQty,
      warpingPlasticId,
      warpingPlasticQty,
      coverPlasticId,
      coverPlasticQty,
      quantity,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    const garageId = Number(localStorage.getItem("selectedGarageId"));
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/packingData?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            typeOfCherootId,
            typeOfPackingId,
            formOfPackingId,
            packingPlasticId,
            packingPlasticQty,
            warpingPlasticId,
            warpingPlasticQty,
            coverPlasticId,
            coverPlasticQty,
            quantity,
            garageId,
          }),
        }
      );
      const { addPackingData } = await response.json();
      thunkApi.dispatch(addedPackingData(addPackingData));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedPackingData = createAsyncThunk(
  "packingData/UpdatedPackingData",
  async (option: updatePackingData, thunkApi) => {
    const {
      id,
      date,
      typeOfCherootId,
      typeOfPackingId,
      formOfPackingId,
      packingPlasticId,
      packingPlasticQty,
      warpingPlasticId,
      warpingPlasticQty,
      coverPlasticId,
      coverPlasticQty,
      quantity,
      garageId,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/packingData?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            date,
            typeOfCherootId,
            typeOfPackingId,
            formOfPackingId,
            packingPlasticId,
            packingPlasticQty,
            warpingPlasticId,
            warpingPlasticQty,
            coverPlasticId,
            coverPlasticQty,
            quantity,
            garageId,
          }),
        }
      );
      const { updatePackingData } = await response.json();
      thunkApi.dispatch(updatedPackingData(updatePackingData));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedPackingData = createAsyncThunk(
  "packingData/DeletedPackingData",
  async (option: deletePackingData, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/packingData?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedPackingData(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const PackingDataSlice = createSlice({
  name: "packingData",
  initialState,
  reducers: {
    setPackingData: (state, action: PayloadAction<Packing[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addedPackingData: (state, action: PayloadAction<Packing>) => {
      state.item = [...state.item, action.payload];
    },
    updatedPackingData: (state, action: PayloadAction<Packing>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedPackingData: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setPackingData,
  setIsLoading,
  addedPackingData,
  updatedPackingData,
  deletedPackingData,
} = PackingDataSlice.actions;
export default PackingDataSlice.reducer;
