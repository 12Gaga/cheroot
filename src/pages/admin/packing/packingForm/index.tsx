import AdminLayout from "@/components/adminLayout";
import ItemCard from "@/components/itemCard";
import NewFormOfPacking from "@/components/pack/newFormOfPacking";
import { useAppSelector } from "@/store/hooks";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import UpdateFormOfPacking from "@/components/pack/updateFormOfPacking";
import DeleteFormOfPacking from "@/components/pack/deleteFormOfPacking";
const PackingForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const formOfPackings = useAppSelector((store) => store.formOfPacking.item);
  const concernFormOfPacking = formOfPackings
    .filter((f) => f.workShopId === workShopId)
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
          ထုပ်ပိုးမှုအမျိုးအစား
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
            ထုပ်ပိုးမှုအမျိုးအစားအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {concernFormOfPacking.map((item) => {
            return (
              <ItemCard
                key={item.id}
                icon={<Inventory2Icon />}
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

        <NewFormOfPacking open={open} setOpen={setOpen} />
        <UpdateFormOfPacking
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteFormOfPacking
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default PackingForm;
