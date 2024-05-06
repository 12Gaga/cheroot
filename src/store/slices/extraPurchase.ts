import {
  createNewExtraPurchase,
  extraPurchaseSlice,
} from "@/types/extraPurchaseType";
import Config from "@/utils/config";
import { ExtraPurchase } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: extraPurchaseSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateExtraPurchase = createAsyncThunk(
  "extraPurchase/CreateExtraPurchase",
  async (option: createNewExtraPurchase, thunkApi) => {
    const {
      date,
      agentId,
      typeOfFilterSizeId,
      filterSizeQty,
      filterSizeBag,
      filterSizePrice,
      filterSizeAmount,
      typeOfTabaccoId,
      tabaccoQty,
      tabaccoTin,
      tabaccoPyi,
      tabaccoBag,
      tabaccoPrice,
      tabaccoAmount,
      typeOfLabelId,
      labelBandle,
      labelPrice,
      labelAmount,
      totalAmount,
      garageId,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/extraPurchase?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            agentId,
            typeOfFilterSizeId,
            filterSizeQty,
            filterSizeBag,
            filterSizePrice,
            filterSizeAmount,
            typeOfTabaccoId,
            tabaccoQty,
            tabaccoTin,
            tabaccoPyi,
            tabaccoBag,
            tabaccoPrice,
            tabaccoAmount,
            typeOfLabelId,
            labelBandle,
            labelPrice,
            labelAmount,
            totalAmount,
            garageId,
          }),
        }
      );
      const { newExtraPurchase } = await response.json();
      thunkApi.dispatch(addExtraPurchase(newExtraPurchase));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const ExtraPurchaseSlice = createSlice({
  name: "extraPurchase",
  initialState,
  reducers: {
    setExtraPurchase: (state, action: PayloadAction<ExtraPurchase[]>) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addExtraPurchase: (state, action: PayloadAction<ExtraPurchase>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const { setExtraPurchase, setIsLoading, addExtraPurchase } =
  ExtraPurchaseSlice.actions;
export default ExtraPurchaseSlice.reducer;
