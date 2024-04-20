import AddTabacco from "@/components/addSt/addTabacco";
import { createNewFilterSize } from "@/types/FilterSizeType";
import { typeOfTabaccoSlice } from "@/types/tabaccoType";
import Config from "@/utils/config";
import { TypeOfTabacco } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addleaf } from "./typeOfLeaf";

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
  },
});

export const { setTabacco, addTabacco, setIsLoading } =
  TypeOfTabaccoSlice.actions;
export default TypeOfTabaccoSlice.reducer;
