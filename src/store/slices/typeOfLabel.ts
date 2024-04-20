import { createNewLabel, typeOfLabelSlice } from "@/types/labelType";
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
  },
});

export const { setLabel, addLabel, setIsLoading } = TypeOfLabelSlice.actions;
export default TypeOfLabelSlice.reducer;
