import AdminLayout from "@/components/adminLayout";
import NewLabel from "@/components/asign/newLabel";
import NewLeaf from "@/components/asign/newLeaf";
import ItemCard from "@/components/itemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
const TypeLabel = () => {
  const [open, setOpen] = useState<boolean>(false);
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          တံဆိပ်အမျိုးအစား
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
            တံဆိပ်အမျိုးအစားအသစ်ထည့်ခြင်း
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {labels.map((item) => {
            const workShopId = localStorage.getItem("selectedWorkShopId");
            const exit = item.workShopId === Number(workShopId);
            if (!exit) return null;
            return (
              <ItemCard
                key={item.id}
                icon={<BookmarkIcon />}
                title={item.name}
              />
            );
          })}
        </Box>
        <NewLabel open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default TypeLabel;
