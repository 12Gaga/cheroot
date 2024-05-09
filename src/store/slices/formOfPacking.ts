import {
  createNewFormOfPacking,
  deleteFormOfPacking,
  formOfPackingSlice,
  updateFormOfPacking,
} from "@/types/formOfPackingType";
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
      packingPlasticId,
      packingQty,
      warppingPlasticId,
      warppingQty,
      coverPlasticId,
      coverQty,
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
            packingPlasticId,
            packingQty,
            warppingPlasticId,
            warppingQty,
            coverPlasticId,
            coverQty,
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

export const UpdatedFormOfPacking = createAsyncThunk(
  "formOfPacking/UpdatedFormOfPacking",
  async (option: updateFormOfPacking, thunkApi) => {
    const {
      id,
      name,
      typeOfCherootId,
      typeOfPackingId,
      packingPlasticId,
      packingQty,
      warppingPlasticId,
      warppingQty,
      coverPlasticId,
      coverQty,
      quantity,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/formOfPacking?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            name,
            typeOfCherootId,
            typeOfPackingId,
            packingPlasticId,
            packingQty,
            warppingPlasticId,
            warppingQty,
            coverPlasticId,
            coverQty,
            quantity,
          }),
        }
      );
      const { updateFormOfPacking } = await response.json();
      thunkApi.dispatch(updatedFormOfPacking(updateFormOfPacking));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedFormOfPacking = createAsyncThunk(
  "formOfPacking/DeletedFormOfPacking",
  async (option: deleteFormOfPacking, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/formOfPacking?id=${id}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedFormOfPacking(id));
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
    updatedFormOfPacking: (state, action: PayloadAction<FormOfPacking>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedFormOfPacking: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setFormOfPacking,
  setIsLoading,
  addFormOfPacking,
  updatedFormOfPacking,
  deletedFormOfPacking,
} = FormOfPackingSlice.actions;
export default FormOfPackingSlice.reducer;
