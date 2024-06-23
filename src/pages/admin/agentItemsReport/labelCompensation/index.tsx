import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LabelCompensation from "@/components/compensation/labelCompensation";
import DeleteLabelCompensation from "@/components/compensation/deleteLabelCompensation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CompensationLabel } from "@prisma/client";
const LabelCompensations = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const findLabelCompensation = useAppSelector(
    (store) => store.compensationLabel.item
  );
  const labelCompensation = findLabelCompensation
    .filter((c) => c.workShopId === workShopId)
    .sort((a, b) => a.id - b.id);
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [agent, setAgent] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [concernCompensation, setConcernCompensation] = useState<
    CompensationLabel[]
  >([]);
  const handleDate = (date: Date) => {
    const data = labelCompensation
      .filter(
        (c) =>
          new Date(c.date).toLocaleDateString() === date.toLocaleDateString()
      )
      .sort((a, b) => a.id - b.id);
    setConcernCompensation(data);
    setAgent(null);
  };
  const handleAgent = (agentId: number) => {
    const data = labelCompensation
      .filter((c) => c.agentId === agentId)
      .sort((a, b) => a.id - b.id);
    setConcernCompensation(data);
    setAgent(agentId);
  };
  useEffect(() => {
    if (labelCompensation.length) {
      const data = labelCompensation
        .filter(
          (c) =>
            new Date(c.date).toLocaleDateString() ===
            selectedDate.toLocaleDateString()
        )
        .sort((a, b) => a.id - b.id);
      setConcernCompensation(data);
    }
  }, [findLabelCompensation]);
  let no = 0;
  return (
    <>
      <AdminLayout>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          တံဆိပ်အလျော်အစားစာရင်း
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>

        <Box sx={{ display: "flex", mb: 3 }}>
          <Box sx={{ mr: 2, display: "flex", mt: 4, width: 300 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date as Date);
                handleDate(date as Date);
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ကိုယ်စားလှယ်အမည်
            </Typography>
            <FormControl variant="filled" sx={{ width: 200 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={agent}
                onChange={(evt) => {
                  handleAgent(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {agents.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <table border={1}>
          <tr>
            <th style={{ width: 30 }}>စဉ်</th>
            <th style={{ width: 100 }}>ရက်စွဲ</th>
            <th style={{ width: 150 }}>ကိုယ်စားလှယ်အမည်</th>
            <th style={{ width: 150 }}>တံဆိပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>ကျန်လိပ်</th>
            <th style={{ width: 150 }}>လျှော်ပေးလိပ်</th>
            <th style={{ width: 150 }}>ရော်လိပ်</th>
            <th style={{ width: 150 }}>စုစုပေါင်းသင့်ငွေ</th>
            <th style={{ width: 200 }}>လက်ကျန်အကြီးထဲထည့်ငွေ</th>
            <th style={{ width: 200 }}>လက်ကျန်အသေးထဲထည့်ငွေ</th>
            <th style={{ width: 150 }}>လက်ငင်းရှင်းငွေ</th>
          </tr>

          {concernCompensation.map((item) => {
            return (
              <tr key={item.id}>
                <th>{(no += 1)}</th>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {agents.find((a) => a.id === item.agentId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>
                  {cheroots.find((l) => l.id === item.typeOfCherootId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.remainBandel}</td>
                <td style={{ textAlign: "center" }}>
                  {item.compensationBandle}
                </td>
                <td style={{ textAlign: "center" }}>{item.takeMoneyBandle}</td>
                <td style={{ textAlign: "center" }}>{item.tolAmount}</td>
                <td style={{ textAlign: "center" }}>{item.addCashBig}</td>
                <td style={{ textAlign: "center" }}>{item.addCashsmall}</td>
                <td style={{ textAlign: "center" }}>{item.inCash}</td>
                <td
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    setDeleteOpen(true), setSelectId(item.id);
                  }}
                >
                  {<DeleteIcon />}
                </td>
              </tr>
            );
          })}
        </table>
        <LabelCompensation open={open} setOpen={setOpen} />
        <DeleteLabelCompensation
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default LabelCompensations;
