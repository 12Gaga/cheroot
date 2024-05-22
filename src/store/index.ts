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
import shopReducer from "./slices/typeOfShop";
import plasticReducer from "./slices/typeOfPlastic";
import banquetReducer from "./slices/typeOfBanquet";
import storeReducer from "./slices/typeOfStore";
import plasticStockReducer from "./slices/plasticStock";
import expensiveLabelReducer from "./slices/moneyTitle";
import dailyExpensiveReducer from "./slices/dailyExpensive";
import mainMoneyReducer from "./slices/mainMoney";
import directPaymentReducer from "./slices/directPayment";
import replenishmentReducer from "./slices/replenishment";
import mainClosingReducer from "./slices/mainClosing";
import dailyClosingReducer from "./slices/dailyClosing";
import leafTranferReducer from "./slices/leafGarageTransfer";
import filterSizeTransferReducer from "./slices/filterSizeGarageTransfer";
import tabaccoTransferReducer from "./slices/tabaccoGarageTransfer";
import labelTransferReducer from "./slices/labelGarageTransfer";
import bagoLeafReducer from "./slices/bagoLeaf";
import bagoFilterSizeReducer from "./slices/bagoFilterSize";
import bagoLabelReducer from "./slices/bagoLabel";
import bagoPlasticReducer from "./slices/bagoPLastic";
import taungyiEnterStockReducer from "./slices/taungyiEnterStock";
import taungyiExitStockReducer from "./slices/taungyiExitStock";
import bagoLeafInstallmentReducer from "./slices/bagoLeafInstallment";
import bagoFilterSizeInstallmentReducer from "./slices/bagoFilterSizeInstallment";
import bagoLabelInstallmentReducer from "./slices/bagoLabelInstallment";
import bagoPlasticInstallmentReducer from "./slices/bagoPlasticInstallment";
import taungyiInstallmentReducer from "./slices/taungyiInstallment";
import cherootTransferReducer from "./slices/cherootTransfer";
import cherootInstallmentReducer from "./slices/cherootInstallment";

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
    typeOfShop: shopReducer,
    typeOfPlastic: plasticReducer,
    typeOfBanquet: banquetReducer,
    typeOfStore: storeReducer,
    plasticStock: plasticStockReducer,
    expensiveLabel: expensiveLabelReducer,
    dailyExpensive: dailyExpensiveReducer,
    mainMoney: mainMoneyReducer,
    directPayment: directPaymentReducer,
    replenishment: replenishmentReducer,
    mainClosing: mainClosingReducer,
    dailyClosing: dailyClosingReducer,
    leafTransfer: leafTranferReducer,
    filterSizeTransfer: filterSizeTransferReducer,
    tabaccoTransfer: tabaccoTransferReducer,
    labelTransfer: labelTransferReducer,
    bagoLeaf: bagoLeafReducer,
    bagoFilterSize: bagoFilterSizeReducer,
    bagoLabel: bagoLabelReducer,
    bagoPlastic: bagoPlasticReducer,
    taungyiEnterStock: taungyiEnterStockReducer,
    taungyiExitStock: taungyiExitStockReducer,
    bagoLeafInstallment: bagoLeafInstallmentReducer,
    bagoFilterSizeInstallment: bagoFilterSizeInstallmentReducer,
    bagoLabelInstallment: bagoLabelInstallmentReducer,
    bagoPlasticInstallment: bagoPlasticInstallmentReducer,
    taungyiInstallment: taungyiInstallmentReducer,
    cherootTransfer: cherootTransferReducer,
    cherootInstallment: cherootInstallmentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
