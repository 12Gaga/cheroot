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
  DeletedCherootInstallment,
  setIsLoading,
} from "@/store/slices/cherootInstallment";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteCherootInstallment = ({
  deleteOpen,
  setDeleteOpen,
  selectedId,
}: Props) => {
  const { isLoading } = useAppSelector((store) => store.cherootInstallment);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedCherootInstallment({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(
              setOpenSnackbar({
                message: "Delete instllment success",
              })
            );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <>
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogContent>ဤဒေတာကိုဖျက်မှာသေချာပါသလား?</DialogContent>
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
    </>
  );
};

export default DeleteCherootInstallment;
