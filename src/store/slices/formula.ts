import {
  createNewFormula,
  deleteFormula,
  formulaSlice,
  updateFormula,
} from "@/types/formulaType";
import Config from "@/utils/config";
import { Formula } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: formulaSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateFormula = createAsyncThunk(
  "formula/CreateFormula",
  async (option: createNewFormula, thunkApi) => {
    const {
      typeOfCherootId,
      cherootQty,
      typeOfFilterSizeId,
      filterSizeQty,
      filterSizeBag,
      typeOfTabaccoId,
      tabaccoQty,
      tin,
      pyi,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/formula?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            typeOfCherootId,
            cherootQty,
            typeOfFilterSizeId,
            filterSizeQty,
            filterSizeBag,
            typeOfTabaccoId,
            tabaccoQty,
            tin,
            pyi,
          }),
        }
      );
      const { newFormula } = await response.json();
      thunkApi.dispatch(addFormula(newFormula));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const UpdatedFormula = createAsyncThunk(
  "formula/UpdateFormula",
  async (option: updateFormula, thunkApi) => {
    const {
      id,
      typeOfCherootId,
      cherootQty,
      typeOfFilterSizeId,
      filterSizeQty,
      filterSizeBag,
      typeOfTabaccoId,
      tabaccoQty,
      tin,
      pyi,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/formula?workShopId=${workShopId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            typeOfCherootId,
            cherootQty,
            typeOfFilterSizeId,
            filterSizeQty,
            filterSizeBag,
            typeOfTabaccoId,
            tabaccoQty,
            tin,
            pyi,
          }),
        }
      );
      const { updateFormula } = await response.json();
      thunkApi.dispatch(updatedFormula(updateFormula));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedFormula = createAsyncThunk(
  "formula/DeletedFormula",
  async (option: deleteFormula, thunkApi) => {
    const { id, onSuccess, onError } = option;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/formula?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(deletedFormula(id));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const FormulaSlice = createSlice({
  name: "formula",
  initialState,
  reducers: {
    setFormula: (state, action: PayloadAction<Formula[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addFormula: (state, action: PayloadAction<Formula>) => {
      state.item = [...state.item, action.payload];
    },
    updatedFormula: (state, action: PayloadAction<Formula>) => {
      state.item = state.item.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deletedFormula: (state, action: PayloadAction<number>) => {
      state.item = state.item.filter((item) => item.id != action.payload);
    },
  },
});

export const {
  setFormula,
  setIsLoading,
  addFormula,
  updatedFormula,
  deletedFormula,
} = FormulaSlice.actions;
export default FormulaSlice.reducer;
