import AdminLayout from "@/components/adminLayout";
import NewGarage from "@/components/asign/newGarage";
import NewLeaf from "@/components/asign/newLeaf";
import NewWorkShop from "@/components/asign/newWorkShop";
import ItemCard from "@/components/itemCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { setSelectedWorkShop } from "@/store/slices/workShop";
const WorkShop = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShops = useAppSelector((store) => store.workShop.item);
  const dispatch = useAppDispatch();
  const { selectedWorkShop } = useAppSelector((store) => store.workShop);
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

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {workShops.map((item) => {
            const selected = item.id === selectedWorkShop?.id ? true : false;

            return (
              <ItemCard
                key={item.id}
                icon={<HomeWorkIcon />}
                title={item.name}
                selected={selected}
                onClcik={() => {
                  dispatch(setSelectedWorkShop(item));
                  localStorage.setItem("selectedWorkShopId", String(item.id));
                }}
              />
            );
          })}
        </Box>

        <NewWorkShop open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default WorkShop;
