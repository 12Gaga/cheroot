import { createNewFormula, formulaSlice } from "@/types/formulaType";
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
  },
});

export const { setFormula, setIsLoading, addFormula } = FormulaSlice.actions;
export default FormulaSlice.reducer;
