import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DeletedLeaf, setIsLoading } from "@/store/slices/typeOfLeaf";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { DeletedTypeOfPacking } from "@/store/slices/typeOfPacking";

interface Props {
  deleteOpen: boolean;
  setDeleteOpen: (value: boolean) => void;
  selectedId: number;
}

const DeleteTypeOfPacking = ({
  deleteOpen,
  setDeleteOpen,
  selectedId,
}: Props) => {
  const typeOfPacking = useAppSelector((store) => store.typeOfPacking.item);
  const selectTypeOfPacking = typeOfPacking.find(
    (item) => item.id === selectedId
  );
  const { isLoading } = useAppSelector((store) => store.typeOfPacking);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      DeletedTypeOfPacking({
        id: selectedId,
        onSuccess: () => {
          setDeleteOpen(false),
            dispatch(
              setOpenSnackbar({ message: "Delete type of packing success" })
            );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectTypeOfPacking) return null;
  return (
    <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
      <DialogContent>
        <Typography>
          {selectTypeOfPacking.name}ကိုဖျက်မှာသေချာပါသလား?
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

export default DeleteTypeOfPacking;
