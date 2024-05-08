import { createNewFilterSize } from "@/types/FilterSizeType";
import { typeOfTabaccoSlice, updateTabacco } from "@/types/tabaccoType";
import Config from "@/utils/config";
import { TypeOfTabacco } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: typeOfTabaccoSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateTabacco = createAsyncThunk(
  "tabacco/CreateTabacco",
  async (option: createNewFilterSize, thunkApi) => {
    const { name, price, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/tabacco?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price }),
        }
      );
      const { newTabacco } = await response.json();
      thunkApi.dispatch(addTabacco(newTabacco));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedTabacco = createAsyncThunk(
  "tabacco/UpdatedTabacco",
  async (option: updateTabacco, thunkApi) => {
    const { name, price, id, onSuccess, onError } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/tabacco?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name, price, id }),
        }
      );
      const { updateTabacco } = await response.json();
      thunkApi.dispatch(updatedTabacco(updateTabacco));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const TypeOfTabaccoSlice = createSlice({
  name: "tabacco",
  initialState,
  reducers: {
    setTabacco: (state, action: PayloadAction<TypeOfTabacco[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addTabacco: (state, action: PayloadAction<TypeOfTabacco>) => {
      state.item = [...state.item, action.payload];
    },
    updatedTabacco: (state, action: PayloadAction<TypeOfTabacco>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setTabacco, addTabacco, setIsLoading, updatedTabacco } =
  TypeOfTabaccoSlice.actions;
export default TypeOfTabaccoSlice.reducer;
