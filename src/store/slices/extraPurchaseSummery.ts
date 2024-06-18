import { extraPurchaseSummerySlice } from "@/types/extraPurchaseSummaryType";
import { ExtraPurchaseSummery } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: extraPurchaseSummerySlice = {
  item: [],
  isLoading: false,
  error: null,
};

const ExtraPurchaseSummerySlice = createSlice({
  name: "extraPurchaseSummery",
  initialState,
  reducers: {
    setExtraPurchaseSummery: (
      state,
      action: PayloadAction<ExtraPurchaseSummery[]>
    ) => {
      state.item = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addExtraPurchaseSummery: (
      state,
      action: PayloadAction<ExtraPurchaseSummery>
    ) => {
      state.item = [...state.item, action.payload];
    },
    deleteExtraPurchseSummary: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter(
        (item) => item.purchaseSeq != action.payload
      );
    },
  },
});

export const {
  setExtraPurchaseSummery,
  setIsLoading,
  addExtraPurchaseSummery,
  deleteExtraPurchseSummary,
} = ExtraPurchaseSummerySlice.actions;
export default ExtraPurchaseSummerySlice.reducer;
