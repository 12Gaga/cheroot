import {
  createNewFormOfPacking,
  formOfPackingSlice,
} from "@/types/formOfPackingType";
import {
  createNewTypeOfPacking,
  typeOfPackingSlice,
} from "@/types/typeOfPackingType";
import Config from "@/utils/config";
import { FormOfPacking, TypeOfPacking } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: formOfPackingSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateFormOfPacking = createAsyncThunk(
  "formOfPacking/CreateFormOfPacking",
  async (option: createNewFormOfPacking, thunkApi) => {
    const {
      name,
      typeOfCherootId,
      typeOfPackingId,
      quantity,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/formOfPacking?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            typeOfCherootId,
            typeOfPackingId,
            quantity,
          }),
        }
      );
      const { newFormOfPacking } = await response.json();
      thunkApi.dispatch(addFormOfPacking(newFormOfPacking));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const FormOfPackingSlice = createSlice({
  name: "formOfPacking",
  initialState,
  reducers: {
    setFormOfPacking: (state, action: PayloadAction<FormOfPacking[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addFormOfPacking: (state, action: PayloadAction<FormOfPacking>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setFormOfPacking, setIsLoading, addFormOfPacking } =
  FormOfPackingSlice.actions;
export default FormOfPackingSlice.reducer;
