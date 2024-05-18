import AdminLayout from "@/components/adminLayout";
import NewTaungyiQuitStock from "@/components/taungyi/newTaungyiQuit";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTaungyiQuitStock from "@/components/taungyi/updateTaungyiQuit";
import DeleteTaungyiExitStock from "@/components/taungyi/deleteTaungyiExitStock";
const TaungyiQuitStock = () => {
  const [open, setOpen] = useState<boolean>(false);
  const cigratteIndustryId = useAppSelector((store) => store.industry.item)?.id;
  const taungyiExitStock = useAppSelector(
    (store) => store.taungyiExitStock.item
  );
  const concernTaungyiExitStock = taungyiExitStock.filter(
    (item) => item.cigratteIndustryId === cigratteIndustryId
  );
  const stores = useAppSelector((store) => store.typeOfStore.item);
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
          သိုလှောင်ရုံပစ္စည်းထုတ်စာရင်း
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
            သိုလှောင်ရုံပစ္စည်းထုတ်ခြင်း
          </Button>
        </Box>

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>ထုတ်ပေးသောသိုလှောင်ရုံ</th>
              <th>လုံးရေ</th>
              <th>ကုန်ချိန်</th>
            </tr>
          </thead>
          {concernTaungyiExitStock.map((item) => {
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{item.date}</td>
                    <td>{stores.find((s) => s.id === item.storeId)?.name}</td>
                    <td>{item.tolBatchNo}</td>
                    <td>{item.netWeight}</td>
                    <td
                      onClick={() => {
                        setUpdateOpen(true), setSelectId(item.id);
                      }}
                    >
                      {<EditIcon />}
                    </td>
                    <td
                      onClick={() => {
                        setDeleteOpen(true), setSelectId(item.id);
                      }}
                    >
                      {<DeleteIcon />}
                    </td>
                  </tr>
                </thead>
              </>
            );
          })}
        </table>

        <NewTaungyiQuitStock open={open} setOpen={setOpen} />
        <UpdateTaungyiQuitStock
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTaungyiExitStock
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TaungyiQuitStock;
