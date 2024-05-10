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
  DeletedDailyExpensive,
  setIsLoading,
} from "@/store/slices/dailyExpensive";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteDailyExpensive = ({
  deleteOpen,
  setDeleteOpen,
  selectedId,
}: Props) => {
  const dailyExpensive = useAppSelector((store) => store.dailyExpensive.item);
  const selectDailyExpensive = dailyExpensive.find(
    (item) => item.id === selectedId
  );
  const { isLoading } = useAppSelector((store) => store.dailyExpensive);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedDailyExpensive({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(
              setOpenSnackbar({ message: "Delete daily expensive success" })
            );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectDailyExpensive) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>
          {selectDailyExpensive.content}ကိုဖျက်မှာသေချာပါသလား?
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

export default DeleteDailyExpensive;
