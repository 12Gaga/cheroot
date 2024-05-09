import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeletedCheroot, setIsLoading } from "@/store/slices/typeOfCheroot";
import { setOpenSnackbar } from "@/store/slices/snackBar";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteCheroot = ({ deleteOpen, setDeleteOpen, selectedId }: Props) => {
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const selectCheroot = cheroots.find((item) => item.id === selectedId);
  const { isLoading } = useAppSelector((store) => store.typeOfCheroot);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedCheroot({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(setOpenSnackbar({ message: "Delete cheroot success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectCheroot) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>{selectCheroot.name}ကိုဖျက်မှာသေချာပါသလား?</Typography>
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

export default DeleteCheroot;
