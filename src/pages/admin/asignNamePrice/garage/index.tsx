import AdminLayout from "@/components/adminLayout";
import NewGarage from "@/components/asign/newGarage";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { useDispatch } from "react-redux";
import { setSelectedGarage } from "@/store/slices/garage";
const Garage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const garages = useAppSelector((store) => store.garage.item);
  const { selectedGarage } = useAppSelector((store) => store.garage);
  const dispatch = useDispatch();
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဂိုထောင်
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
            ဂိုထောင်အသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {garages.map((item) => {
            const selected = item.id === selectedGarage?.id ? true : false;
            const workShopId = localStorage.getItem("selectedWorkShopId");
            const isAvailable =
              item.workShopId === Number(workShopId) ? true : false;

            return (
              <ItemCard
                key={item.id}
                icon={<WarehouseIcon />}
                title={item.name}
                selected={selected}
                isAvailable={isAvailable}
                onClcik={() => {
                  dispatch(setSelectedGarage(item));
                  localStorage.setItem("selectedGarageId", String(item.id));
                }}
              />
            );
          })}
        </Box>

        <NewGarage open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default Garage;
