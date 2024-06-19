import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreatePayLeaf, setIsLoading } from "@/store/slices/payLeaf";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewPayLeaf } from "@/types/payLeafType";
import { LoadingButton } from "@mui/lab";
import { Typography, TextField, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  newPayLeaf: createNewPayLeaf;
  setNewPayLeaf: (value: createNewPayLeaf) => void;
  defaultValue: createNewPayLeaf;
}

const PayLeafButton = ({ newPayLeaf, setNewPayLeaf, defaultValue }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.payLeaf);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreatePayLeaf({
        ...newPayLeaf,
        onSuccess: () => {
          setNewPayLeaf(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Pay Leaf success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <LoadingButton
          loading={isLoading}
          variant="contained"
          disabled={
            !newPayLeaf.garageId ||
            !newPayLeaf.agentId ||
            !newPayLeaf.typeOfLeafId ||
            !newPayLeaf.batchNo.length
          }
          sx={{
            bgcolor: "#E55252",
            mr: 2,
            width: 180,
            height: 40,
            fontSize: 18,
            borderRadius: 10,
            "&:hover": {
              bgcolor: "#FCB500",
              color: "white",
              fontWeight: "bold",
            },
          }}
          onClick={() => handleClick()}
        >
          သိမ်းမည်
        </LoadingButton>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#E55252",

            width: 180,
            height: 40,
            fontSize: 18,
            borderRadius: 10,
            "&:hover": {
              bgcolor: "#FCB500",
              color: "white",
              fontWeight: "bold",
            },
          }}
          onClick={() => router.push("/admin/home")}
        >
          ထွက်မည်
        </Button>
      </Box>
    </>
  );
};
export default PayLeafButton;
