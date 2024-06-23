import AdminLayout from "@/components/adminLayout";
import NewCheroot from "@/components/asign/newCheroot";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import UpdateCheroot from "@/components/asign/updateCheroot";
import DeleteCheroot from "@/components/asign/deleteCheroot";

const TypeCheroot = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const concernCheroot = cheroots
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
          {concernCheroot.map((item) => {
            return (
              <ItemCard
                key={item.id}
                icon={<SmokingRoomsIcon />}
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

        <NewCheroot open={open} setOpen={setOpen} />
        <UpdateCheroot
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteCheroot
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TypeCheroot;
