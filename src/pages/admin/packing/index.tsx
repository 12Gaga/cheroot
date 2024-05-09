import AdminLayout from "@/components/adminLayout";
import ItemCard from "@/components/itemCard";
import NewTypeOfPacking from "@/components/pack/newTypeOfPacking";
import { useAppSelector } from "@/store/hooks";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import UpdateTypeOfPacking from "@/components/pack/updateTypeOfPacking";
import DeleteTypeOfPacking from "@/components/pack/deleteTypeOfPacking";
const Packing = () => {
  const [open, setOpen] = useState<boolean>(false);
  const typeOfPackings = useAppSelector((store) => store.typeOfPacking.item);
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
          ပါကင်အမျိုးအစား
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
            ပါကင်အမျိုးအစားအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {typeOfPackings.map((item) => {
            const workShopId = localStorage.getItem("selectedWorkShopId");
            const exit = item.workShopId === Number(workShopId);
            if (!exit) return null;
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

        <NewTypeOfPacking open={open} setOpen={setOpen} />
        <UpdateTypeOfPacking
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTypeOfPacking
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default Packing;
