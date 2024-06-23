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
import NewTransferLabel from "@/components/garageTrans/newTransferLabel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "@/store/hooks";
import UpdateTransferLabel from "@/components/garageTrans/updateTransferLabel";
import DeleteLabelTransfer from "@/components/garageTrans/deleteLabelTransfer";
import { LabelTransferGarage } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const TransferLabel = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const labelTransfers = useAppSelector((store) => store.labelTransfer.item);
  const concernLabelTransfer = labelTransfers.filter(
    (item) => item.workShopId === workshop?.id
  );
  const garage = useAppSelector((store) => store.garage.item);
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabels = labels.filter(
    (item) => item.workShopId === workshop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [label, setLabel] = useState<number | null>(null);
  const [labelTransfer, setLabelTransfer] = useState<LabelTransferGarage[]>([]);

  const handleDate = (date: Date) => {
    const data = concernLabelTransfer
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toLocaleDateString() === date.toLocaleDateString();
      })
      .sort((a, b) => a.id - b.id);
    setLabelTransfer(data);
    setLabel(null);
  };

  const handelLabel = (labelId: number) => {
    const data = concernLabelTransfer
      .filter((item) => item.typeOfLabelId === labelId)
      .sort((a, b) => a.id - b.id);
    setLabelTransfer(data);
    setLabel(labelId);
  };

  useEffect(() => {
    if (concernLabelTransfer.length) {
      const data = concernLabelTransfer
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      setLabelTransfer(data);
    }
  }, [labelTransfers]);
  let no = 0;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          တံဆိပ်
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
          <Box sx={{}}>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                တံဆိပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={label}
                  onChange={(evt) => {
                    handelLabel(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernLabels.map((item) => (
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
          <tr>
            <th style={{ width: 50 }}>စဉ်</th>
            <th style={{ width: 150 }}>နေ့စွဲ</th>
            <th style={{ width: 150 }}>အထွက်ဂိုထောင်</th>
            <th style={{ width: 150 }}>အဝင်ဂိုထောင်</th>
            <th style={{ width: 150 }}>တံဆိပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>လိပ်</th>
          </tr>
          {labelTransfer.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <tr key={item.id}>
                  <th>{(no += 1)}</th>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {garage.find((g) => g.id === item.exitGarageId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {garage.find((g) => g.id === item.enterenceGarageId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {labels.find((f) => f.id === item.typeOfLabelId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bandle}</td>
                  <td
                    style={{ textAlign: "center", width: 50 }}
                    onClick={() => {
                      setUpdateOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<EditIcon />}
                  </td>
                  <td
                    style={{ textAlign: "center", width: 50 }}
                    onClick={() => {
                      setDeleteOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<DeleteIcon />}
                  </td>
                </tr>
              </>
            );
          })}
        </table>

        <NewTransferLabel open={open} setOpen={setOpen} />
        <UpdateTransferLabel
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteLabelTransfer
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TransferLabel;
