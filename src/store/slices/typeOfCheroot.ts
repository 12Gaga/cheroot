import {
  createNewCheroot,
  typeOfCherootSlice,
  updateCheroot,
} from "@/types/cherootType";
import Config from "@/utils/config";
import { TypeOfCheroot, TypeOfLeaf } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: typeOfCherootSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateCheroot = createAsyncThunk(
  "cheroot/CreateCheroot",
  async (option: createNewCheroot, thunkApi) => {
    const { name, price, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/cheroot?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price }),
        }
      );
      const { newCheroot } = await response.json();
      thunkApi.dispatch(addCheroot(newCheroot));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedCheroot = createAsyncThunk(
  "cheroot/UpdatedCheroot",
  async (option: updateCheroot, thunkApi) => {
    const { name, price, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/cheroot?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price, id }),
        }
      );
      const { updateCheroot } = await response.json();
      thunkApi.dispatch(updatedCheroot(updateCheroot));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfCherootSlice = createSlice({
  name: "cheroot",
  initialState,
  reducers: {
    setCheroot: (state, action: PayloadAction<TypeOfCheroot[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addCheroot: (state, action: PayloadAction<TypeOfCheroot>) => {
      state.item = [...state.item, action.payload];
    },
    updatedCheroot: (state, action: PayloadAction<TypeOfCheroot>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setCheroot, setIsLoading, addCheroot, updatedCheroot } =
  TypeOfCherootSlice.actions;
export default TypeOfCherootSlice.reducer;
