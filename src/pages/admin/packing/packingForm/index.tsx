import AdminLayout from "@/components/adminLayout";
import NewFormOfPacking from "@/components/pack/newFormOfPacking";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";

const PackingForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ထုပ်ပိုးမှုအမျိုးအစား
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
            ထုပ်ပိုးမှုအမျိုးအစားအသစ်ထည့်ခြင်း
          </Button>
        </Box>
        <NewFormOfPacking open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default PackingForm;
