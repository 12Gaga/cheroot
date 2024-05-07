import AdminLayout from "@/components/adminLayout";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import ItemCard from "@/components/itemCard";
import NewStore from "@/components/taungyi/newStore";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import NewBanquet from "@/components/taungyi/newBanquet";
const Banquet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const banquets = useAppSelector((store) => store.typeOfBanquet.item);
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

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {banquets.map((item) => {
            return (
              <ItemCard
                key={item.id}
                icon={<HouseSidingIcon />}
                title={item.name}
              />
            );
          })}
        </Box>

        <NewBanquet open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default Banquet;
