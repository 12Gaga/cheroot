import {
  createNewOtherDeduction,
  otherDeductionSlice,
} from "@/types/otherDeductionType";
import Config from "@/utils/config";
import { OtherDeduction } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAgentRemainCash } from "./agentRemainCash";
import { addReturnCheroot } from "./returnCheroot";
import { addLeafDeduction } from "./leafDeduction";
import { addAgentRemainLeaf } from "./agentRemainLeaf";
import { deleteExtraPurchseSummary } from "./extraPurchaseSummery";

const initialState: otherDeductionSlice = {
  item: [],
  isLoading: false,
  error: null,
};

export const CreateOtherDeduction = createAsyncThunk(
  "otherDeduction/CreateOtherDeduction",
  async (option: createNewOtherDeduction, thunkApi) => {
    const {
      cheroots,
      leaf,
      date,
      agentId,
      cashAdvanceBigDeduction,
      cashAdvanceSmallDeduction,
      otherDeduction,
      cashAdvanceBig,
      cashAdvanceSmall,
      netAgentPayment,
      bonusPayment,
      totalNetAgentPayment,
      reduceBandle,
      purchaseSeq,
      onSuccess,
      onError,
    } = option;
    const workShopId = localStorage.getItem("selectedWorkShopId");
    try {
      const response = await fetch(
        `${Config.apiBaseUrl}/otherDeduction?workShopId=${workShopId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            cheroots,
            leaf,
            date,
            agentId,
            cashAdvanceBigDeduction,
            cashAdvanceSmallDeduction,
            otherDeduction,
            cashAdvanceBig,
            cashAdvanceSmall,
            netAgentPayment,
            bonusPayment,
            totalNetAgentPayment,
            reduceBandle,
            purchaseSeq,
          }),
        }
      );
      const {
        newOtherDeduction,
        newRemainCash,
        newReturnCheroot,
        newLeafDeduction,
      } = await response.json();
      thunkApi.dispatch(addOtherDeduction(newOtherDeduction));
      thunkApi.dispatch(addAgentRemainCash(newRemainCash));
      thunkApi.dispatch(addReturnCheroot(newReturnCheroot));
      thunkApi.dispatch(addLeafDeduction(newLeafDeduction));
      thunkApi.dispatch(deleteExtraPurchseSummary(purchaseSeq));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const OtherDeductionSlice = createSlice({
  name: "otherDeduction",
  initialState,
  reducers: {
    setOtherDeduction: (state, action: PayloadAction<OtherDeduction[]>) => {
      state.item = action.payload;
    },
    setLoadingOtherDeduction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addOtherDeduction: (state, action: PayloadAction<OtherDeduction>) => {
      state.item = [...state.item, action.payload];
    },
  },
});

export const {
  setOtherDeduction,
  setLoadingOtherDeduction,
  addOtherDeduction,
} = OtherDeductionSlice.actions;
export default OtherDeductionSlice.reducer;
