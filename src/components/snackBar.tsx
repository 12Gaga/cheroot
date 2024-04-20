import { useAppSelector } from "@/store/hooks";
import { resetSnackBar } from "@/store/slices/snackBar";
import { Alert, Snackbar as MuiSnackBar } from "@mui/material";
import { useDispatch } from "react-redux";

const SnackBar = () => {
  const dispatch = useDispatch();
  const { open, severity, message, autoHideDuration } = useAppSelector(
    (state) => state.snackBar
  );

  setTimeout(() => {
    dispatch(resetSnackBar());
  }, autoHideDuration);
  return (
    <>
      <MuiSnackBar
        open={open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </MuiSnackBar>
    </>
  );
};

export default SnackBar;
