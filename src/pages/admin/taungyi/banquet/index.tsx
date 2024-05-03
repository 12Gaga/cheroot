import AdminLayout from "@/components/adminLayout";
import NewLeaf from "@/components/asign/newLeaf";
import NewStore from "@/components/taungyi/newStore";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
const Banquet = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပွဲရုံ
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
            ပွဲရုံအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {leaves.map((item) => {
            const workShopId = localStorage.getItem("selectedWorkShopId");
            const exit = item.workShopId === Number(workShopId);
            if (!exit) return null;
            return (
              <ItemCard key={item.id} icon={<SpaIcon />} title={item.name} />
            );
          })}
        </Box> */}

        <NewStore open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default Banquet;
