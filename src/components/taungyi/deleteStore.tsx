import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeletedStore, setIsLoading } from "@/store/slices/typeOfStore";
import { setOpenSnackbar } from "@/store/slices/snackBar";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteStore = ({ deleteOpen, setDeleteOpen, selectedId }: Props) => {
  const stores = useAppSelector((store) => store.typeOfStore.item);
  const selectStore = stores.find((item) => item.id === selectedId);
  const { isLoading } = useAppSelector((store) => store.typeOfStore);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedStore({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(setOpenSnackbar({ message: "Delete store success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectStore) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>{selectStore.name}ကိုဖျက်မှာသေချာပါသလား?</Typography>
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

export default DeleteStore;
