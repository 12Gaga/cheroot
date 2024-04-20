import { SnackbarSlice } from "@/types/snackBarType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SnackbarSlice = {
  message: "",
  autoHideDuration: 3000,
  open: false,
  severity: "success",
};

const Snackbar = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setOpenSnackbar: (state, action) => {
      const {
        autoHideDuration = 3000,
        message,
        severity = "success",
      } = action.payload;
      state.open = true;
      state.message = message;
      state.autoHideDuration = autoHideDuration;
      state.severity = severity;
    },
    resetSnackBar: (state) => {
      state.open = false;
      state.message = "";
      state.autoHideDuration = 5000;
      state.severity = "success";
    },
  },
});

export const { setOpenSnackbar, resetSnackBar } = Snackbar.actions;
export default Snackbar.reducer;
