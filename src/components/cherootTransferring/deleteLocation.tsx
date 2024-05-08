import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteLocation = ({ deleteOpen, setDeleteOpen, selectedId }: Props) => {
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const selectLocation = locations.find((item) => item.id === selectedId);
  const { isLoading } = useAppSelector((store) => store.conveyLocation);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    // dispatch(setIsLoading(true));
  };
  if (!selectLocation) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>{selectLocation.name}ကိုဖျက်မှာသေချာသလား?</Typography>
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

export default DeleteLocation;
