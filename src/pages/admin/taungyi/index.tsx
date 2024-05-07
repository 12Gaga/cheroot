import AdminLayout from "@/components/adminLayout";
import StoreIcon from "@mui/icons-material/Store";
import ItemCard from "@/components/itemCard";
import NewStore from "@/components/taungyi/newStore";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
const Store = () => {
  const [open, setOpen] = useState<boolean>(false);
  const stores = useAppSelector((store) => store.typeOfStore.item);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          သိုလှောင်ရုံ
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
            သိုလှောင်ရုံအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {stores.map((item) => {
            return (
              <ItemCard key={item.id} icon={<StoreIcon />} title={item.name} />
            );
          })}
        </Box>

        <NewStore open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default Store;
