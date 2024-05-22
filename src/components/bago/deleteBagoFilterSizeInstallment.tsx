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
import {
  DeletedBagoFilterSizeInstallment,
  setIsLoading,
} from "@/store/slices/bagoFilterSizeInstallment";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteBagoFilterSizeInstallment = ({
  deleteOpen,
  setDeleteOpen,
  selectedId,
}: Props) => {
  const { isLoading } = useAppSelector((store) => store.bagoLeafInstallment);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedBagoFilterSizeInstallment({
        id: selectedId,
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

export default DeleteBagoFilterSizeInstallment;
