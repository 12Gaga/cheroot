import AdminLayout from "@/components/adminLayout";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import NewPlastic from "@/components/asign/newPlastic";

const Plastic = () => {
  const [open, setOpen] = useState<boolean>(false);
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပလတ်စတစ်အမျိုးအစား
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E55252",
              mt: 3,
              width: 350,
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
            ပလတ်စတစ်အမျိုးအစားအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {plastics.map((item) => {
            const workShopId = localStorage.getItem("selectedWorkShopId");
            const exit = item.workShopId === Number(workShopId);
            if (!exit) return null;
            return (
              <ItemCard
                key={item.id}
                icon={<LocalMallIcon />}
                title={item.name}
              />
            );
          })}
        </Box>

        <NewPlastic open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default Plastic;
