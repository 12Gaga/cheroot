import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { fetchApp } from "@/store/slices/app";
import {
  DeletedReturnCheroot,
  setLoadingOtherDeduction,
} from "@/store/slices/otherDeduction";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedSeq: string;
}

const DeleteReturnCheroot = ({
  deleteOpen,
  setDeleteOpen,
  selectedSeq,
}: Props) => {
  const { isLoading } = useAppSelector((store) => store.returnCheroot);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setLoadingOtherDeduction(true));
    dispatch(
      DeletedReturnCheroot({
        seq: selectedSeq,
        onSuccess: () => {
          setDeleteOpen(false), dispatch(fetchApp({}));
          dispatch(setOpenSnackbar({ message: "Deleting success" }));
          dispatch(setLoadingOtherDeduction(false));
        },
      })
    );
  };
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>ဤဒေတာကိုဖျက်မှာသေချာပါသလား?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setDeleteOpen(false);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleClick}
          loading={isLoading}
        >
          ဖျက်မည်
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteReturnCheroot;
