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
  DeletedAgentLeafViss,
  setIsLoading,
} from "@/store/slices/agentLeafViss";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteAgentLeafViss = ({
  deleteOpen,
  setDeleteOpen,
  selectedId,
}: Props) => {
  const { isLoading } = useAppSelector((store) => store.agentLeafViss);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedAgentLeafViss({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(
              setOpenSnackbar({ message: "Delete agent leaf viss success" })
            );
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

export default DeleteAgentLeafViss;
