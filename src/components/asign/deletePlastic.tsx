import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeletedPlastic, setIsLoading } from "@/store/slices/typeOfPlastic";
import { setOpenSnackbar } from "@/store/slices/snackBar";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeletePlastic = ({ deleteOpen, setDeleteOpen, selectedId }: Props) => {
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const selectPlastic = plastics.find((item) => item.id === selectedId);
  const { isLoading } = useAppSelector((store) => store.typeOfPlastic);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedPlastic({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(setOpenSnackbar({ message: "Delete plastic success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectPlastic) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>{selectPlastic.name}ကိုဖျက်မှာသေချာပါသလား?</Typography>
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

export default DeletePlastic;
