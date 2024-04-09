import AdminLayout from "@/components/adminLayout";
import NewMoneyTitle from "@/components/money/newMoneyTitle";
import NewTypeOfPacking from "@/components/pack/newTypeOfPacking";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";

const Packing = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပါကင်အမျိုးအစား
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E55252",
              mt: 3,
              width: 320,
              height: 50,
              fontSize: 18,
              borderRadius: 20,
              "&:hover": {
                bgcolor: "#FCB500",
                color: "white",
                fontWeight: "bold",
              },
            }}
            onClick={() => setOpen(true)}
          >
            ပါကင်အမျိုးအစားအသစ်ထည့်ခြင်း
          </Button>
        </Box>
        <NewTypeOfPacking open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default Packing;
