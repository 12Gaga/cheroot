import {
  createNewLabel,
  deleteLabel,
  typeOfLabelSlice,
  updateLabel,
} from "@/types/labelType";
import Config from "@/utils/config";
import { TypeOfLabel } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: typeOfLabelSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateLabel = createAsyncThunk(
  "label/CreateLabel",
  async (option: createNewLabel, thunkApi) => {
    const { name, price, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/label?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price }),
        }
      );
      const { newLabel } = await response.json();
      thunkApi.dispatch(addLabel(newLabel));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedLabel = createAsyncThunk(
  "label/UpdatedLabel",
  async (option: updateLabel, thunkApi) => {
    const { name, price, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/label?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price, id }),
        }
      );
      const { updateLabel } = await response.json();
      thunkApi.dispatch(updatedLabel(updateLabel));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedLabel = createAsyncThunk(
  "label/DeletedLabel",
  async (option: deleteLabel, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/label?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedLabel(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfLabelSlice = createSlice({
  name: "label",
  initialState,
  reducers: {
    setLabel: (state, action: PayloadAction<TypeOfLabel[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addLabel: (state, action: PayloadAction<TypeOfLabel>) => {
      state.item = [...state.item, action.payload];
    },
    updatedLabel: (state, action: PayloadAction<TypeOfLabel>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedLabel: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const { setLabel, addLabel, setIsLoading, updatedLabel, deletedLabel } =
  TypeOfLabelSlice.actions;
export default TypeOfLabelSlice.reducer;
