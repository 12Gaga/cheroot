import LabelExtra from "@/components/extraPur/extraLabel";
import FilterSizeExtra from "@/components/extraPur/extraPurFilterSize";
import ExtraPurTop from "@/components/extraPur/extraPurTop";
import TabaccoExtra from "@/components/extraPur/extraTabacco";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CreateExtraPurchase,
  setIsLoading,
} from "@/store/slices/extraPurchase";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewExtraPurchase } from "@/types/extraPurchaseType";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const defaultValue: createNewExtraPurchase = {
  date: null,
  agentId: undefined,
  typeOfFilterSizeId: undefined,
  filterSizeQty: 0,
  filterSizeBag: 0,
  filterSizePrice: 0,
  filterSizeAmount: 0,
  typeOfTabaccoId: undefined,
  tabaccoQty: 0,
  tabaccoTin: 0,
  tabaccoPyi: 0,
  tabaccoBag: 0,
  tabaccoPrice: 0,
  tabaccoAmount: 0,
  typeOfLabelId: undefined,
  labelBandle: 0,
  labelPrice: 0,
  labelAmount: 0,
  totalAmount: 0,
  garageId: undefined,
};
const ExtraPurchase = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.extraPurchase);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const [newExtraPurchase, setNewExtraPurchase] =
    useState<createNewExtraPurchase>(defaultValue);
  console.log("concern", newExtraPurchase);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateExtraPurchase({
        ...newExtraPurchase,
        onSuccess: () => {
          setNewExtraPurchase(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Extra Purchase success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!session) return;
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          ထပ်ဝယ်စာရင်း
        </Typography>
      </Box>

      <ExtraPurTop
        newExtraPurchase={newExtraPurchase}
        setNewExtraPurchase={setNewExtraPurchase}
        workshopId={workShop}
      />

      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        အဆီခံ
      </Typography>

      <FilterSizeExtra
        newExtraPurchase={newExtraPurchase}
        setNewExtraPurchase={setNewExtraPurchase}
        workshopId={workShop}
      />

      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        ဆေးစပ်
      </Typography>

      <TabaccoExtra
        newExtraPurchase={newExtraPurchase}
        setNewExtraPurchase={setNewExtraPurchase}
        workshopId={workShop}
      />

      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        တံဆိပ်
      </Typography>

      <LabelExtra
        newExtraPurchase={newExtraPurchase}
        setNewExtraPurchase={setNewExtraPurchase}
        workshopId={workShop}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          sx={{
            bgcolor: "#D83E3E",
            width: 220,
            height: 50,
            fontSize: 18,
            borderRadius: 10,
            mr: 2,
            "&:hover": {
              bgcolor: "#F7A71B",
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
            bgcolor: "#D83E3E",

            width: 220,
            height: 50,
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
export default ExtraPurchase;
