import {
  createNewExtraPurchase,
  deleteExtraPurchase,
  extraPurchaseSlice,
} from "@/types/extraPurchaseType";
import Config from "@/utils/config";
import { ExtraPurchase } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addExtraPurchaseSummery } from "./extraPurchaseSummery";

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
      typeOfCherootId,
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
            typeOfCherootId,
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
      const { newExtraPurchase, newExtraPurchaseSummary } =
        await response.json();
      thunkApi.dispatch(addExtraPurchase(newExtraPurchase));
      thunkApi.dispatch(addExtraPurchaseSummery(newExtraPurchaseSummary));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const DeletedExtraPurchase = createAsyncThunk(
  "extraPurchase/DeletedExtraPurchase",
  async (option: deleteExtraPurchase, thunkApi) => {
    const { purchaseSeq, onSuccess, onError } = option;
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/extraPurchase?purchaseSeq=${purchaseSeq}`,
        {
          method: "DELETE",
        }
      );
      thunkApi.dispatch(deletedExtraPurchase(purchaseSeq));
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
    deletedExtraPurchase: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter(
        (item) => item.purchaseSeq != action.payload
      );
    },
  },
});

export const {
  setExtraPurchase,
  setIsLoading,
  addExtraPurchase,
  deletedExtraPurchase,
} = ExtraPurchaseSlice.actions;
export default ExtraPurchaseSlice.reducer;
