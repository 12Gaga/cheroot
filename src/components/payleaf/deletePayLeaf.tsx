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
import { DeletedPayLeaf, setIsLoading } from "@/store/slices/payLeaf";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedSeq: string;
}

const DeletePayLeaf = ({ deleteOpen, setDeleteOpen, selectedSeq }: Props) => {
  const { isLoading } = useAppSelector((store) => store.payLeaf);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedPayLeaf({
        seq: selectedSeq,
        onSuccess: () => {
          setDeleteOpen(false), dispatch(fetchApp({}));
          dispatch(setOpenSnackbar({ message: "Delete pay leaf success" }));
          dispatch(setIsLoading(false));
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

export default DeletePayLeaf;
