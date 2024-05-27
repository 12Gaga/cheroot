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
import { DeletedAgent, setIsLoading } from "@/store/slices/agent";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteAgent = ({ deleteOpen, setDeleteOpen, selectedId }: Props) => {
  const agents = useAppSelector((store) => store.agent.item);
  const selectAgent = agents.find((item) => item.id === selectedId);
  const { isLoading } = useAppSelector((store) => store.agent);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedAgent({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(setOpenSnackbar({ message: "Delete agent success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectAgent) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>{selectAgent.name}ကိုဖျက်မှာသေချာပါသလား?</Typography>
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

export default DeleteAgent;
