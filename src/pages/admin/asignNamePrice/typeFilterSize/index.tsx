import AdminLayout from "@/components/adminLayout";
import NewFilterSize from "@/components/asign/newFilterSize";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const TypeFilterSize = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          အဆီခံအမျိုးအစား
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
            အဆီခံအမျိုးအစားအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <NewFilterSize open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default TypeFilterSize;
