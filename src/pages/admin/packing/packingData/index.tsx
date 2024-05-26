import AdminLayout from "@/components/adminLayout";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewPackingData from "@/components/pack/newPackingData";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdatePackingData from "@/components/pack/updatePackingData";
import DeletePackingData from "@/components/pack/deletePackingData";
const PackingData = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concernPackingData = useAppSelector(
    (store) => store.packingData.item
  ).filter((i) => i.workShopId === workShop?.id);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const typeOfPacking = useAppSelector((store) => store.typeOfPacking.item);
  const formOfPacking = useAppSelector((store) => store.formOfPacking.item);
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
          ပါကင်စာရင်းထည့်ခြင်း
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>ဆေးလိပ်အမျိုးအစား</th>
              <th>ပါကင်အမျိုးအစား</th>
              <th>ထုပ်ပိုးမှုအမျိုးအစား</th>
              <th>အရေအတွက်</th>
            </tr>
          </thead>
          {concernPackingData.map((item) => {
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{item.date}</td>
                    <td>
                      {
                        cheroots.find((c) => c.id === item.typeOfCherootId)
                          ?.name
                      }
                    </td>
                    <td>
                      {
                        typeOfPacking.find((p) => p.id === item.typeOfPackingId)
                          ?.name
                      }
                    </td>
                    <td>
                      {
                        formOfPacking.find((f) => f.id === item.formOfPackingId)
                          ?.name
                      }
                    </td>
                    <td>{item.quantity}</td>
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
        <NewPackingData open={open} setOpen={setOpen} />
        <UpdatePackingData
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeletePackingData
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default PackingData;
