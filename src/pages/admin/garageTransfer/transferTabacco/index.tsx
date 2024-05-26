import AdminLayout from "@/components/adminLayout";
import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewTransferTabacco from "@/components/garageTrans/newTransferTabacco";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTransferTabacco from "@/components/garageTrans/updateTransferTabacco";
import DeleteTabaccoTransfer from "@/components/garageTrans/deleteTabaccoTransfer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TabaccoTransferGarage } from "@prisma/client";
import label from "../../openingStock/label";
const TransferTabacco = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const tabaccoTransfers = useAppSelector(
    (store) => store.tabaccoTransfer.item
  );
  const concernTabaccoTransfer = tabaccoTransfers.filter(
    (item) => item.workShopId === workshop?.id
  );
  const garage = useAppSelector((store) => store.garage.item);
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabaccos.filter(
    (item) => item.workShopId === workshop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [tabacco, setTabacco] = useState<number | null>(null);
  const [tabaccoTransfer, setTabaccoTransfer] = useState<
    TabaccoTransferGarage[]
  >([]);

  const handleDate = (date: Date) => {
    const data = concernTabaccoTransfer.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    setTabaccoTransfer(data);
    setTabacco(null);
  };

  const handelTabacco = (tabaccoId: number) => {
    const data = concernTabaccoTransfer.filter(
      (item) => item.typeOfTabaccoId === tabaccoId
    );
    setTabaccoTransfer(data);
    setTabacco(tabaccoId);
  };

  useEffect(() => {
    if (concernTabaccoTransfer.length) {
      const data = concernTabaccoTransfer.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setTabaccoTransfer(data);
    }
  }, [tabaccoTransfers]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဆေးစပ်
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Box sx={{ mr: 2, display: "flex", mt: 4, width: 300 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => {
                setSelectedDate(date as Date);
                handleDate(date as Date);
              }}
            />
          </Box>
          <Box sx={{ width: 300 }}>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဆေးစပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={tabacco}
                  onChange={(evt) => {
                    handelTabacco(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernTabacco.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

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
          {tabaccoTransfer.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
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
                      {
                        tabaccos.find((f) => f.id === item.typeOfTabaccoId)
                          ?.name
                      }
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
