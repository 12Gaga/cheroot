import AdminLayout from "@/components/adminLayout";
import NewLocation from "@/components/cherootTransferring/newLocation";
import ItemCard from "@/components/itemCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppSelector } from "@/store/hooks";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";

const TransferCheroot = () => {
  const [open, setOpen] = useState<boolean>(false);
  const locations = useAppSelector((store) => store.conveyLocation.item);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          နေရာသတ်မှတ်ခြင်း
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
            နေရာအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {locations.map((item) => {
            const workShopId = localStorage.getItem("selectedWorkShopId");
            const exit = item.workShopId === Number(workShopId);
            if (!exit) return null;
            return (
              <ItemCard
                key={item.id}
                icon={<LocationOnIcon />}
                title={item.name}
              />
            );
          })}
        </Box>

        <NewLocation open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default TransferCheroot;
