import {
  createNewLeafDeduction,
  leafDeductionSlice,
} from "@/types/leafDeductionType";
import Config from "@/utils/config";
import {
  LeafDeduction,
  PayLeaf,
  ReturnReadyCheroot,
  TypeOfLeaf,
} from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAgentRemainLeaf } from "./agentRemainLeaf";

const initialState: leafDeductionSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateLeafDeduction = createAsyncThunk(
  "leafDeduction/CreateLeafDeduction",
  async (option: createNewLeafDeduction, thunkApi) => {
    const {
      date,
      agentId,
      typeOfLeafId,
      deductViss,
      price,
      deductionAmount,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/leafDeduction?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date,
            agentId,
            typeOfLeafId,
            deductViss,
            price,
            deductionAmount,
          }),
        }
      );
      const { newLeafDeduction, newRemainLeaf } = await response.json();
      thunkApi.dispatch(addLeafDeduction(newLeafDeduction));
      newRemainLeaf && thunkApi.dispatch(addAgentRemainLeaf(newRemainLeaf));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const LeafDeductionSlice = createSlice({
  name: "leafDeduction",
  initialState,
  reducers: {
    setLeafDeduction: (state, action: PayloadAction<LeafDeduction[]>) => {
      state.item = action.payload;
    },
    setLoadingLeafDeduction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addLeafDeduction: (state, action: PayloadAction<LeafDeduction[]>) => {
      state.item = [...state.item, ...action.payload];
    },
    deletedLeafDeduction: (state, action: PayloadAction<string>) => {
      state.item = state.item.filter((item) => item.seq != action.payload);
    },
  },
});

export const {
  setLeafDeduction,
  setLoadingLeafDeduction,
  addLeafDeduction,
  deletedLeafDeduction,
} = LeafDeductionSlice.actions;
export default LeafDeductionSlice.reducer;
