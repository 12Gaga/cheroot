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
import DeleteExtraPurchase from "@/components/extraPur/deleteExtraPurchase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ExtraPurchase } from "@prisma/client";
const LeafCompensations = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const findExtraPurchase = useAppSelector((store) => store.extraPurchase.item);
  const extraPurchase = findExtraPurchase.filter(
    (c) => c.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectSeq, setSelectSeq] = useState<string>("");
  const [agent, setAgent] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [concernExtraPurchase, setConcernExtraPurchase] = useState<
    ExtraPurchase[]
  >([]);
  const handleDate = (date: Date) => {
    const data = extraPurchase
      .filter(
        (c) =>
          new Date(c.date).toLocaleDateString() === date.toLocaleDateString()
      )
      .sort((a, b) => a.id - b.id);
    setConcernExtraPurchase(data);
    setAgent(null);
  };
  const handleAgent = (agentId: number) => {
    const data = extraPurchase
      .filter((c) => c.agentId === agentId)
      .sort((a, b) => a.id - b.id);
    setConcernExtraPurchase(data);
    setAgent(agentId);
  };
  useEffect(() => {
    if (extraPurchase.length) {
      const data = extraPurchase
        .filter(
          (c) =>
            new Date(c.date).toLocaleDateString() ===
            selectedDate.toLocaleDateString()
        )
        .sort((a, b) => a.id - b.id);
      setConcernExtraPurchase(data);
    }
  }, [findExtraPurchase]);
  let no = 0;
  return (
    <>
      <AdminLayout>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          ထပ်ဝယ်စာရင်းစစ်ခြင်း
        </Typography>

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
            <th style={{ width: 100 }}>နေ့စွဲ</th>
            <th style={{ width: 150 }}>ကိုယ်စားလှယ်အမည်</th>
            <th style={{ width: 150 }}>ဆေးလိပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>အစီခံအမျိုးအစား</th>
            <th style={{ width: 150 }}>အစီခံအရေအတွက်</th>
            <th style={{ width: 150 }}>အစီခံအိတ်</th>
            <th style={{ width: 150 }}>အစီခံသင့်ငွေ</th>
            <th style={{ width: 150 }}>ဆေးစပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>ဆေးစပ်တင်း</th>
            <th style={{ width: 150 }}>ဆေးစပ်ပြည်</th>
            <th style={{ width: 150 }}>ဆေးစပ်အိတ်</th>
            <th style={{ width: 150 }}>ဆေးစပ်သင့်ငွေ</th>
            <th style={{ width: 150 }}>တံဆိပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>တံဆိပ်လိပ်</th>
            <th style={{ width: 150 }}>တံဆိပ်သင့်ငွေ</th>
            <th style={{ width: 150 }}>စုစုပေါင်းသင့်ငွေ</th>
          </tr>

          {concernExtraPurchase.map((item) => {
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
                <td style={{ textAlign: "center" }}>
                  {
                    filterSizes.find((l) => l.id === item.typeOfFilterSizeId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.filterSizeQty}</td>
                <td style={{ textAlign: "center" }}>{item.filterSizeBag}</td>
                <td style={{ textAlign: "center" }}>{item.filterSizeAmount}</td>
                <td style={{ textAlign: "center" }}>
                  {tabaccos.find((l) => l.id === item.typeOfTabaccoId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoBag}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoAmount}</td>
                <td style={{ textAlign: "center" }}>
                  {labels.find((l) => l.id === item.typeOfLabelId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.labelBandle}</td>
                <td style={{ textAlign: "center" }}>{item.labelAmount}</td>
                <td style={{ textAlign: "center" }}>{item.totalAmount}</td>
                <td
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    setDeleteOpen(true), setSelectSeq(item.purchaseSeq);
                  }}
                >
                  {<DeleteIcon />}
                </td>
              </tr>
            );
          })}
        </table>
        <DeleteExtraPurchase
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedSeq={selectSeq}
        />
      </AdminLayout>
    </>
  );
};
export default LeafCompensations;
