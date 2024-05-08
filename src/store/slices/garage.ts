import { createNewGarage, garageSlice, updateGarage } from "@/types/garageType";
import Config from "@/utils/config";
import { Garage } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: garageSlice = {
  item: [],
  selectedGarage: null,
  isLoading: false,
  error: null,
};

export const CreateGarage = createAsyncThunk(
  "garage/CreateGarage",
  async (option: createNewGarage, thunkApi) => {
    const { name, workShopId, onSuccess, onError } = option;

    try {
      const response = await fetch(`${Config.apiBaseUrl}/garage`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, workShopId }),
      });
      const { newGarage } = await response.json();
      thunkApi.dispatch(addGarage(newGarage));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedGarage = createAsyncThunk(
  "garage/UpdateGarage",
  async (option: updateGarage, thunkApi) => {
    const { name, id, onSuccess, onError } = option;

    try {
      const response = await fetch(`${Config.apiBaseUrl}/garage`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, id }),
      });
      const { updateGarage } = await response.json();
      thunkApi.dispatch(updatedGarage(updateGarage));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const GarageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    setGarage: (state, action: PayloadAction<Garage[]>) => {
      state.item = action.payload;
      const selectedId = localStorage.getItem("selectedGarageId");
      if (!selectedId) {
        const firstGarage = action.payload[0];
        state.selectedGarage = firstGarage;
        localStorage.setItem("selectedGarageId", String(firstGarage.id));
      } else {
        const garage = state.item.find((item) => item.id == Number(selectedId));
        if (garage) {
          state.selectedGarage = garage;
        }
      }
    },
    setSelectedGarage: (state, action: PayloadAction<Garage>) => {
      state.selectedGarage = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addGarage: (state, action: PayloadAction<Garage>) => {
      state.item = [...state.item, action.payload];
    },
    updatedGarage: (state, action: PayloadAction<Garage>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const {
  setGarage,
  setSelectedGarage,
  setIsLoading,
  addGarage,
  updatedGarage,
} = GarageSlice.actions;
export default GarageSlice.reducer;
