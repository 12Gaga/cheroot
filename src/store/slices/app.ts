import { GetOption, appSlice } from "@/types/appType";
import Config from "@/utils/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setIndustry } from "./industry";
import { setWorkShop } from "./workShop";
import { setGarage } from "./garage";
import { setLeaf } from "./typeOfLeaf";
import { setFilterSize } from "./typeOfFilterSize";
import { setTabacco } from "./typeOfTabacco";
import { setLabel } from "./typeOfLabel";
import { setCheroot } from "./typeOfCheroot";
import { setTypeOfPacking } from "./typeOfPacking";
import { setFormOfPacking } from "./formOfPacking";
import { setConveyLocation } from "./conveyLocation";
import { setAgent } from "./agent";
import { setAgentLeafViss } from "./agentLeafViss";
import { setLeafStock } from "./leafStock";
import { setFilterSizeStock } from "./filterSizeStock";
import { setTabaccoStock } from "./tabaccoStock";
import { setLabelStock } from "./labelStock";
import { setAddStock } from "./addStock";
import { setFormula } from "./formula";
import { setPayLeaf } from "./payLeaf";
import { setPayStock } from "./payStock";
import { setReturnCheroot } from "./returnCheroot";
import { setLeafDeduction } from "./leafDeduction";
import { setOtherDeduction } from "./otherDeduction";
import { setExtraPurchase } from "./extraPurchase";
import { setShop } from "./typeOfShop";
import { setPlastic } from "./typeOfPlastic";
import { setStore } from "./typeOfStore";
import { setBanquet } from "./typeOfBanquet";

const initialState: appSlice = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchApp = createAsyncThunk(
  "app/fetchApp",
  async (payload: GetOption, thunkApi) => {
    const { onSuccess, onError } = payload;
    try {
      const response = await fetch(`${Config.apiBaseUrl}/app`);
      const dataFromServer = await response.json();
      const {
        industry,
        workShop,
        garage,
        leaf,
        filterSize,
        tabacco,
        label,
        cheroot,
        typeOfPacking,
        formOfPacking,
        conveyLocation,
        agent,
        agentLeafViss,
        leafStock,
        filterSizeStock,
        tabaccoStock,
        labelStock,
        addStock,
        formula,
        payLeaf,
        payStock,
        returnCheroot,
        leafDeduction,
        otherDeduction,
        extraPurchase,
        shop,
        plastic,
        store,
        banquet,
      } = dataFromServer;
      thunkApi.dispatch(setInit(true));
      thunkApi.dispatch(setIndustry(industry));
      thunkApi.dispatch(setWorkShop(workShop));
      thunkApi.dispatch(setGarage(garage));
      thunkApi.dispatch(setLeaf(leaf));
      thunkApi.dispatch(setFilterSize(filterSize));
      thunkApi.dispatch(setTabacco(tabacco));
      thunkApi.dispatch(setLabel(label));
      thunkApi.dispatch(setCheroot(cheroot));
      thunkApi.dispatch(setShop(shop));
      thunkApi.dispatch(setPlastic(plastic));
      thunkApi.dispatch(setStore(store));
      thunkApi.dispatch(setBanquet(banquet));
      thunkApi.dispatch(setTypeOfPacking(typeOfPacking));
      thunkApi.dispatch(setFormOfPacking(formOfPacking));
      thunkApi.dispatch(setConveyLocation(conveyLocation));
      thunkApi.dispatch(setAgent(agent));
      thunkApi.dispatch(setAgentLeafViss(agentLeafViss));
      thunkApi.dispatch(setLeafStock(leafStock));
      thunkApi.dispatch(setFilterSizeStock(filterSizeStock));
      thunkApi.dispatch(setTabaccoStock(tabaccoStock));
      thunkApi.dispatch(setLabelStock(labelStock));
      thunkApi.dispatch(setAddStock(addStock));
      thunkApi.dispatch(setFormula(formula));
      thunkApi.dispatch(setPayLeaf(payLeaf));
      thunkApi.dispatch(setPayStock(payStock));
      thunkApi.dispatch(setReturnCheroot(returnCheroot));
      thunkApi.dispatch(setLeafDeduction(leafDeduction));
      thunkApi.dispatch(setOtherDeduction(otherDeduction));
      thunkApi.dispatch(setExtraPurchase(extraPurchase));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  }
);

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = AppSlice.actions;
export default AppSlice.reducer;
