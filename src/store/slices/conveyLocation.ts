import {
  conveyLocationSlice,
  createNewConveyLocation,
  deleteConveyLocation,
  updateConveyLocation,
} from "@/types/conveyLocationType";
import { createNewGarage, garageSlice } from "@/types/garageType";
import Config from "@/utils/config";
import { ConveyLocation, Garage } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: conveyLocationSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateConveyLocation = createAsyncThunk(
  "conveyLocation/CreateConveyLocation",
  async (option: createNewConveyLocation, thunkApi) => {
    const { name, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/conveyLocation?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const { newConveyLocation } = await response.json();
      thunkApi.dispatch(addConveyLocation(newConveyLocation));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedConveyLocation = createAsyncThunk(
  "conveyLocation/UpdateConveyLocation",
  async (option: updateConveyLocation, thunkApi) => {
    const { name, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/conveyLocation?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, id }),
        }
      );
      const { updateLocation } = await response.json();
      thunkApi.dispatch(updatedConveyLocation(updateLocation));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedConveyLocation = createAsyncThunk(
  "location/DeletedConveyLocation",
  async (option: deleteConveyLocation, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/conveyLocation?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedConveyLocation(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const ConveyLocationSlice = createSlice({
  name: "conveyLocation",
  initialState,
  reducers: {
    setConveyLocation: (state, action: PayloadAction<ConveyLocation[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addConveyLocation: (state, action: PayloadAction<ConveyLocation>) => {
      state.item = [...state.item, action.payload];
    },
    updatedConveyLocation: (state, action: PayloadAction<ConveyLocation>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedConveyLocation: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setConveyLocation,
  setIsLoading,
  addConveyLocation,
  updatedConveyLocation,
  deletedConveyLocation,
} = ConveyLocationSlice.actions;
export default ConveyLocationSlice.reducer;
