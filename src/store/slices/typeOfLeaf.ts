import { CreateNewLeaf, typeOfLeafSlice } from "@/types/LeafType";
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
  },
});

export const { setLeaf, setIsLoading, addleaf } = TypeOfLeafSlice.actions;
export default TypeOfLeafSlice.reducer;
