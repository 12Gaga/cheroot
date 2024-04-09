import AdminLayout from "@/components/adminLayout";
import NewGarage from "@/components/asign/newGarage";
import NewLeaf from "@/components/asign/newLeaf";
import NewWorkShop from "@/components/asign/newWorkShop";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const WorkShop = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          အလုပ်ရုံ
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
            အလုပ်ရုံအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <NewWorkShop open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default WorkShop;
