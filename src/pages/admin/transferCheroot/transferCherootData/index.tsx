import AdminLayout from "@/components/adminLayout";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewTransferCherootData from "@/components/cherootTransferring/newTransferCherootData";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTransferCherootData from "@/components/cherootTransferring/updateTransferCherootData";
import DeleteTransferCherootData from "@/components/cherootTransferring/deleteCherootTransferData";
const TransferCherootData = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concernCherootTransfer = useAppSelector(
    (store) => store.cherootTransfer.item
  ).filter((item) => item.workShopId === workshop?.id);
  const locations = useAppSelector((store) => store.conveyLocation.item);
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
          ဆေးလိပ်ပို့စာရင်းထည့်ခြင်း
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
              <th>မြို့နာမည်</th>
              <th>ဆေးလိပ်အမျိုးအစား</th>
              <th>ပါကင်အမျိုးအစား</th>
              <th>ထုပ်ပိုးမှုအမျိုးအစား</th>
              <th>အရေအတွက်</th>
              <th>တန်ဖိုး</th>
              <th>စုစုပေါင်းတန်ဖိုး</th>
            </tr>
          </thead>
          {concernCherootTransfer.map((item) => {
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{item.date}</td>
                    <td>
                      {
                        locations.find((l) => l.id === item.conveyLocationId)
                          ?.name
                      }
                    </td>
                    <td>
                      {
                        cheroots.find((l) => l.id === item.typeOfCherootId)
                          ?.name
                      }
                    </td>
                    <td>
                      {
                        typeOfPacking.find((l) => l.id === item.typeOfPackingId)
                          ?.name
                      }
                    </td>
                    <td>
                      {
                        formOfPacking.find((l) => l.id === item.formOfPackingId)
                          ?.name
                      }
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                    <td>{item.totalPrice}</td>
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

        <NewTransferCherootData open={open} setOpen={setOpen} />
        <UpdateTransferCherootData
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTransferCherootData
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TransferCherootData;
