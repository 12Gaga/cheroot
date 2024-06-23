import AdminLayout from "@/components/adminLayout";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import NewShop from "@/components/asign/newShop";
import UpdateShop from "@/components/asign/updateShop";
import DeleteShop from "@/components/asign/deleteShop";

const Shop = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops
    .filter((item) => item.workShopId === workShopId)
    .sort((a, b) => a.id - b.id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပစ္စည်းဝယ်ယူသည့်ဆိုင်အမည်
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
            ဆိုင်အမည်အသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {concernShop.map((item) => {
            return (
              <ItemCard
                key={item.id}
                icon={<HomeWorkIcon />}
                title={item.name}
                onUpdateClcik={() => {
                  setUpdateOpen(true);
                  setSelectId(item.id);
                }}
                onDeleteClcik={() => {
                  setDeleteOpen(true);
                  setSelectId(item.id);
                }}
              />
            );
          })}
        </Box>

        <NewShop open={open} setOpen={setOpen} />
        <UpdateShop
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteShop
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default Shop;
