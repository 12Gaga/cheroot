import {
  createNewTypeOfPacking,
  typeOfPackingSlice,
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
  },
});

export const { setTypeOfPacking, setIsLoading, addTypeOfPacking } =
  TypeOfPackingSlice.actions;
export default TypeOfPackingSlice.reducer;
