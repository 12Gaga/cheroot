import { industrySlice } from "@/types/industryType";
import { CigratteIndustry } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: industrySlice = {
  item: null,
  isLoading: false,
  error: null,
};

const IndustrySlice = createSlice({
  name: "cigaratteIndustry",
  initialState,
  reducers: {
    setIndustry: (state, action: PayloadAction<CigratteIndustry>) => {
      state.item = action.payload;
    },
  },
});

export const { setIndustry } = IndustrySlice.actions;
export default IndustrySlice.reducer;
