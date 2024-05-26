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
  DeletedFormOfPacking,
  setIsLoading,
} from "@/store/slices/formOfPacking";
import { setOpenSnackbar } from "@/store/slices/snackBar";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteFormOfPacking = ({
  deleteOpen,
  setDeleteOpen,
  selectedId,
}: Props) => {
  const formOfPacking = useAppSelector((store) => store.formOfPacking.item);
  const selectFormOfPacking = formOfPacking.find(
    (item) => item.id === selectedId
  );
  const { isLoading } = useAppSelector((store) => store.formOfPacking);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedFormOfPacking({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(
              setOpenSnackbar({ message: "Delete form of packing success" })
            );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectFormOfPacking) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>
          {selectFormOfPacking.name}ကိုဖျက်မှာသေချာပါသလား?
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

export default DeleteFormOfPacking;
