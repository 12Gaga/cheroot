import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/app";
import industryReducer from "./slices/industry";
import workShopReducer from "./slices/workShop";
import garageReducer from "./slices/garage";
import leafReducer from "./slices/typeOfLeaf";
import filterSizeReducer from "./slices/typeOfFilterSize";
import tabaccoReducer from "./slices/typeOfTabacco";
import labelReducer from "./slices/typeOfLabel";
import snackBarReducer from "./slices/snackBar";
import cherootReducer from "./slices/typeOfCheroot";
import typeOfpackingReducer from "./slices/typeOfPacking";
import formOfpackingReducer from "./slices/formOfPacking";
import conveyLocationReducer from "./slices/conveyLocation";
import agentReducer from "./slices/agent";
import agentleafVissReducer from "./slices/agentLeafViss";
import leafStockReducer from "./slices/leafStock";
import filterSizeStockReducer from "./slices/filterSizeStock";
import tabaccoStockReducer from "./slices/tabaccoStock";
import labelStockReducer from "./slices/labelStock";
import addStockReducer from "./slices/addStock";
import formulaReducer from "./slices/formula";
import payLeafReducer from "./slices/payLeaf";
import payStockReducer from "./slices/payStock";
import returnCherootReducer from "./slices/returnCheroot";
import leafDeductionReducer from "./slices/leafDeduction";
import otherDeductionReducer from "./slices/otherDeduction";
import extraPurchaseReducer from "./slices/extraPurchase";

export const store = configureStore({
  reducer: {
    app: appReducer,
    industry: industryReducer,
    workShop: workShopReducer,
    garage: garageReducer,
    typeOfLeaf: leafReducer,
    typeOfFilterSize: filterSizeReducer,
    typeOfTabacco: tabaccoReducer,
    typeOfLabel: labelReducer,
    snackBar: snackBarReducer,
    typeOfCheroot: cherootReducer,
    typeOfPacking: typeOfpackingReducer,
    formOfPacking: formOfpackingReducer,
    conveyLocation: conveyLocationReducer,
    agent: agentReducer,
    agentLeafViss: agentleafVissReducer,
    leafStock: leafStockReducer,
    filterSizeStock: filterSizeStockReducer,
    tabaccoStock: tabaccoStockReducer,
    labelStock: labelStockReducer,
    addStock: addStockReducer,
    formula: formulaReducer,
    payLeaf: payLeafReducer,
    payStock: payStockReducer,
    returnCheroot: returnCherootReducer,
    leafDeduction: leafDeductionReducer,
    otherDeduction: otherDeductionReducer,
    extraPurchase: extraPurchaseReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
