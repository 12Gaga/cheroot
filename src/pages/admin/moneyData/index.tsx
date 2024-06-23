import AdminLayout from "@/components/adminLayout";
import ItemCard from "@/components/itemCard";
import NewMoneyTitle from "@/components/money/newMoneyTitle";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import UpdateTitle from "@/components/money/updateTitle";
import DeleteTitle from "@/components/money/deleteTitle";
const MoneyData = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const [open, setOpen] = useState<boolean>(false);
  const titles = useAppSelector((store) => store.expensiveLabel.item);
  const concernTiltes = titles
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
          ငွေစာရင်းခေါင်းစဉ်ထည့်ခြင်း
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
            ငွေစာရင်းခေါင်းစဉ်အသစ်ထည့်ခြင်း
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {concernTiltes.map((item) => {
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

        <NewMoneyTitle open={open} setOpen={setOpen} />
        <UpdateTitle
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTitle
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default MoneyData;
