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
import { DeletedLabelAddStock, setIsLoading } from "@/store/slices/labelStock";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedStockSeq: string;
}

const DeleteAddLabel = ({
  deleteOpen,
  setDeleteOpen,
  selectedStockSeq,
}: Props) => {
  const { isLoading } = useAppSelector((store) => store.labelStock);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedLabelAddStock({
        stockSeq: selectedStockSeq,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(setOpenSnackbar({ message: "Deleting success" }));
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

export default DeleteAddLabel;
