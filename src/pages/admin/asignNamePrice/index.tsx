import AdminLayout from "@/components/adminLayout";
import NewLeaf from "@/components/asign/newLeaf";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SpaIcon from "@mui/icons-material/Spa";
import UpdateLeaf from "@/components/asign/updateLeaf";
import DeleteLeaf from "@/components/asign/deleteLeaf";
const AsignNamePrice = () => {
  const [open, setOpen] = useState<boolean>(false);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  console.log("id", selectId);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဖက်အမျိုးအစား
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
            ဖက်အမျိုးအစားအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {leaves.map((item) => {
            const workShopId = localStorage.getItem("selectedWorkShopId");
            const exit = item.workShopId === Number(workShopId);
            if (!exit) return null;
            return (
              <>
                <ItemCard
                  key={item.id}
                  icon={<SpaIcon />}
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
              </>
            );
          })}
        </Box>

        <NewLeaf open={open} setOpen={setOpen} />
        <UpdateLeaf
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteLeaf
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default AsignNamePrice;
