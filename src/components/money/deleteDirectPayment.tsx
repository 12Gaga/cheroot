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
  DeletedDirectPayment,
  setIsLoading,
} from "@/store/slices/directPayment";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteDirectPayment = ({
  deleteOpen,
  setDeleteOpen,
  selectedId,
}: Props) => {
  const directPayment = useAppSelector((store) => store.directPayment.item);
  const selectDirectPayment = directPayment.find(
    (item) => item.id === selectedId
  );
  const { isLoading } = useAppSelector((store) => store.directPayment);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedDirectPayment({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(
              setOpenSnackbar({ message: "Delete Direct Payment success" })
            );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectDirectPayment) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>
          {selectDirectPayment.tilte}ကိုဖျက်မှာသေချာပါသလား?
        </Typography>
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

export default DeleteDirectPayment;
