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
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
