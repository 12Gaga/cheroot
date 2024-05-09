import {
  createNewTypeOfPacking,
  deleteTypeOfPacking,
  typeOfPackingSlice,
  updateTypeOfPacking,
} from "@/types/typeOfPackingType";
import Config from "@/utils/config";
import { TypeOfPacking } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: typeOfPackingSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateTypeOfPacking = createAsyncThunk(
  "typeOfPacking/CreateTypeOfPacking",
  async (option: createNewTypeOfPacking, thunkApi) => {
    const { name, typeOfCherootId, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/typeOfPacking?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, typeOfCherootId }),
        }
      );
      const { newTypeOfPacking } = await response.json();
      thunkApi.dispatch(addTypeOfPacking(newTypeOfPacking));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedTypeOfPacking = createAsyncThunk(
  "typeOfPacking/UpdatedTypeOfPacking",
  async (option: updateTypeOfPacking, thunkApi) => {
    const { id, name, typeOfCherootId, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/typeOfPacking?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id, name, typeOfCherootId }),
        }
      );
      const { updateTypeOfPacking } = await response.json();
      thunkApi.dispatch(updatedTypeOfPacking(updateTypeOfPacking));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedTypeOfPacking = createAsyncThunk(
  "typeOfPacking/DeletedTypeOfPacking",
  async (option: deleteTypeOfPacking, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/typeOfPacking?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedTypeOfPacking(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfPackingSlice = createSlice({
  name: "typeOfPacking",
  initialState,
  reducers: {
    setTypeOfPacking: (state, action: PayloadAction<TypeOfPacking[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addTypeOfPacking: (state, action: PayloadAction<TypeOfPacking>) => {
      state.item = [...state.item, action.payload];
    },
    updatedTypeOfPacking: (state, action: PayloadAction<TypeOfPacking>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedTypeOfPacking: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setTypeOfPacking,
  setIsLoading,
  addTypeOfPacking,
  updatedTypeOfPacking,
  deletedTypeOfPacking,
} = TypeOfPackingSlice.actions;
export default TypeOfPackingSlice.reducer;
