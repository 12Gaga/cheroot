import {
  CreateNewLeaf,
  deleteLeaf,
  typeOfLeafSlice,
  updateLeaf,
} from "@/types/LeafType";
import Config from "@/utils/config";
import { TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: typeOfLeafSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateLeaf = createAsyncThunk(
  "leaf/CreateLeaf",
  async (option: CreateNewLeaf, thunkApi) => {
    const { name, price, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/leaf?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price }),
        }
      );
      const { newLeaf } = await response.json();
      thunkApi.dispatch(addleaf(newLeaf));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedLeaf = createAsyncThunk(
  "leaf/UpdateLeaf",
  async (option: updateLeaf, thunkApi) => {
    const { name, price, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/leaf?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price, id }),
        }
      );
      const { updateLeaf } = await response.json();
      thunkApi.dispatch(updatedLeaf(updateLeaf));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedLeaf = createAsyncThunk(
  "leaf/DeletedLeaf",
  async (option: deleteLeaf, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/leaf?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedLeaf(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfLeafSlice = createSlice({
  name: "leaf",
  initialState,
  reducers: {
    setLeaf: (state, action: PayloadAction<TypeOfLeaf[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addleaf: (state, action: PayloadAction<TypeOfLeaf>) => {
      state.item = [...state.item, action.payload];
    },
    updatedLeaf: (state, action: PayloadAction<TypeOfLeaf>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedLeaf: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const { setLeaf, setIsLoading, addleaf, updatedLeaf, deletedLeaf } =
  TypeOfLeafSlice.actions;
export default TypeOfLeafSlice.reducer;
