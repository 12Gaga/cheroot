import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CreateOtherDeduction,
  setLoadingOtherDeduction,
} from "@/store/slices/otherDeduction";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  createNewOtherDeduction,
  otherDeductionSlice,
} from "@/types/otherDeductionType";
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { OtherDeduction } from "@prisma/client";
import { useRouter } from "next/router";

interface Props {
  newOtherDeduction: createNewOtherDeduction;
}

const ReturnCherootButton = ({ newOtherDeduction }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading } = useAppSelector((store) => store.otherDeduction);
  const handleClick = () => {
    dispatch(setLoadingOtherDeduction(true));
    dispatch(
      CreateOtherDeduction({
        ...newOtherDeduction,
        onSuccess: () => {
          dispatch(setOpenSnackbar({ message: "Add Other Deduction success" }));
          dispatch(setLoadingOtherDeduction(false));
          console.log("hello");
          router.push(
            `/admin/returnCheroot/printReturnCherootData?agentId=${newOtherDeduction.agentId}&date=${newOtherDeduction.date}&deductDate=${newOtherDeduction.deductDate}`
          );
        },
      })
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}>
        <LoadingButton
          loading={isLoading}
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
export default ReturnCherootButton;
