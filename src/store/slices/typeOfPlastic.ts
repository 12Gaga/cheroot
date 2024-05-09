import {
  CreateNewPlastic,
  deletePlastic,
  typeOfPlasticSlice,
  updatePlastic,
} from "@/types/plasticType";
import Config from "@/utils/config";
import { TypeOfPlastic, TypeOfShop } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: typeOfPlasticSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreatePlastic = createAsyncThunk(
  "plastic/CreatePlastic",
  async (option: CreateNewPlastic, thunkApi) => {
    const { name, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/plastic?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const { newPlastic } = await response.json();
      thunkApi.dispatch(addPlastic(newPlastic));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedPlastic = createAsyncThunk(
  "plastic/UpdatedPlastic",
  async (option: updatePlastic, thunkApi) => {
    const { name, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/plastic?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, id }),
        }
      );
      const { updatePlastic } = await response.json();
      thunkApi.dispatch(updatedPlastic(updatePlastic));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedPlastic = createAsyncThunk(
  "plastic/DeletedPlastic",
  async (option: deletePlastic, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/plastic?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedPlastic(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfPlasticSlice = createSlice({
  name: "plastic",
  initialState,
  reducers: {
    setPlastic: (state, action: PayloadAction<TypeOfPlastic[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addPlastic: (state, action: PayloadAction<TypeOfPlastic>) => {
      state.item = [...state.item, action.payload];
    },
    updatedPlastic: (state, action: PayloadAction<TypeOfPlastic>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedPlastic: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setPlastic,
  setIsLoading,
  addPlastic,
  updatedPlastic,
  deletedPlastic,
} = TypeOfPlasticSlice.actions;
export default TypeOfPlasticSlice.reducer;
