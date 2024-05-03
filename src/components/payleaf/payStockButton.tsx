import { useAppDispatch } from "@/store/hooks";
import { CreatePayStock } from "@/store/slices/payStock";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewPayStock } from "@/types/payStockType";
import { Typography, TextField, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  newPayStock: createNewPayStock;
  setNewPayStock: (value: createNewPayStock) => void;
  workShopId: number;
  defaultValue: createNewPayStock;
}

const PayStockButton = ({
  newPayStock,
  setNewPayStock,
  workShopId,
  defaultValue,
}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(
      CreatePayStock({
        ...newPayStock,
        onSuccess: () => {
          setNewPayStock(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Pay Stock success" }));
        },
      })
    );
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          variant="contained"
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
        </Button>
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
export default PayStockButton;
