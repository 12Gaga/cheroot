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

const DeleteWorkShop = ({ deleteOpen, setDeleteOpen, selectedId }: Props) => {
  const workShops = useAppSelector((store) => store.workShop.item);
  const selectWorkshop = workShops.find((item) => item.id === selectedId);
  const { isLoading } = useAppSelector((store) => store.workShop);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    // dispatch(setIsLoading(true));
  };
  if (!selectWorkshop) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>{selectWorkshop.name}ကိုဖျက်မှာသေချာသလား?</Typography>
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

export default DeleteWorkShop;
