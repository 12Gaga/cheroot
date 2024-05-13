import AdminLayout from "@/components/adminLayout";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewTransferTabacco from "@/components/garageTrans/newTransferTabacco";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTransferTabacco from "@/components/garageTrans/updateTransferTabacco";
import DeleteTabaccoTransfer from "@/components/garageTrans/deleteTabaccoTransfer";
const TransferTabacco = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const tabaccoTransfer = useAppSelector((store) => store.tabaccoTransfer.item);
  const concernTabaccoTransfer = tabaccoTransfer.filter(
    (item) => item.workShopId === workshop?.id
  );
  const garage = useAppSelector((store) => store.garage.item);
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
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
          ဆေးစပ်
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
              <th>အထွက်ဂိုထောင်</th>
              <th>အဝင်ဂိုထောင်</th>
              <th>ဆေးစပ်အမျိုးအစား</th>
              <th>တင်း</th>
              <th>ပြည်</th>
              <th>အိတ်</th>
            </tr>
          </thead>
          {concernTabaccoTransfer.map((item) => {
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{item.date}</td>
                    <td>
                      {garage.find((g) => g.id === item.exitGarageId)?.name}
                    </td>
                    <td>
                      {
                        garage.find((g) => g.id === item.enterenceGarageId)
                          ?.name
                      }
                    </td>
                    <td>
                      {tabacco.find((f) => f.id === item.typeOfTabaccoId)?.name}
                    </td>
                    <td>{item.tin}</td>
                    <td>{item.pyi}</td>
                    <td>{item.bag}</td>
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

        <NewTransferTabacco open={open} setOpen={setOpen} />
        <UpdateTransferTabacco
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTabaccoTransfer
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TransferTabacco;
