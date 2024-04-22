import AdminLayout from "@/components/adminLayout";
import NewCheroot from "@/components/asign/newCheroot";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const TypeCheroot = () => {
  const [open, setOpen] = useState<boolean>(false);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဆေးလိပ်အမျိုးအစား
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
            ဆေးလိပ်အမျိုးအစားအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {cheroots.map((item) => {
            const workShopId = localStorage.getItem("selectedWorkShopId");
            const exit = item.workShopId === Number(workShopId);
            if (!exit) return null;
            return (
              <ItemCard
                key={item.id}
                icon={<SmokingRoomsIcon />}
                title={item.name}
              />
            );
          })}
        </Box>

        <NewCheroot open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default TypeCheroot;
