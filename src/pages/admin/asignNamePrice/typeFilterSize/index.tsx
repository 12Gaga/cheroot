import AdminLayout from "@/components/adminLayout";
import NewFilterSize from "@/components/asign/newFilterSize";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const TypeFilterSize = () => {
  const [open, setOpen] = useState<boolean>(false);
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
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
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {filterSizes.map((item) => {
            const workShopId = localStorage.getItem("selectedWorkShopId");
            const exit = item.workShopId === Number(workShopId);
            if (!exit) return null;
            return (
              <ItemCard
                key={item.id}
                icon={<FiberManualRecordIcon />}
                title={item.name}
              />
            );
          })}
        </Box>
        <NewFilterSize open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default TypeFilterSize;
