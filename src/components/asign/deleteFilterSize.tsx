import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  DeletedFilterSize,
  setIsLoading,
} from "@/store/slices/typeOfFilterSize";
import { setOpenSnackbar } from "@/store/slices/snackBar";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteFilterSize = ({ deleteOpen, setDeleteOpen, selectedId }: Props) => {
  const filterSize = useAppSelector((store) => store.typeOfFilterSize.item);
  const selectFilterSize = filterSize.find((item) => item.id === selectedId);
  const { isLoading } = useAppSelector((store) => store.typeOfFilterSize);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedFilterSize({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(
              setOpenSnackbar({ message: "Delete filter size success" })
            );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectFilterSize) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>{selectFilterSize.name}ကိုဖျက်မှာသေချာပါသလား?</Typography>
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

export default DeleteFilterSize;
