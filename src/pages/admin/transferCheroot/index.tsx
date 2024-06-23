import AdminLayout from "@/components/adminLayout";
import NewLocation from "@/components/cherootTransferring/newLocation";
import ItemCard from "@/components/itemCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppSelector } from "@/store/hooks";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import UpdateLocation from "@/components/cherootTransferring/updateLocation";
import DeleteLocation from "@/components/cherootTransferring/deleteLocation";

const TransferCheroot = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const concernLocation = locations
    .filter((l) => l.workShopId === workShopId)
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
          နေရာသတ်မှတ်ခြင်း
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
            နေရာအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {concernLocation.map((item) => {
            return (
              <ItemCard
                key={item.id}
                icon={<LocationOnIcon />}
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

        <NewLocation open={open} setOpen={setOpen} />
        <UpdateLocation
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteLocation
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TransferCheroot;
