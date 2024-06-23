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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PayLeaf } from "@prisma/client";
import DeletePayLeaf from "@/components/payleaf/deletePayLeaf";
const PayLeafReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const payLeafs = useAppSelector((store) => store.payLeaf.item);
  const cocnernPayLeaf = payLeafs.filter((c) => c.workShopId === workShopId);
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectSeq, setSelectSeq] = useState<string>("");
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [payLeaf, setPayLeaf] = useState<PayLeaf[]>([]);
  const [seqs, setSeqs] = useState<string[]>([]);
  const [agent, setAgent] = useState<number | null>(null);
  let no = 0;

  const handleDate = (date: Date) => {
    const data = cocnernPayLeaf
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toLocaleDateString() === date.toLocaleDateString();
      })
      .sort((a, b) => a.id - b.id);
    setPayLeaf(data);
    setAgent(null);
    handelSeqs(data);
  };
  const handleAgent = (agentId: number) => {
    const data = cocnernPayLeaf
      .filter((c) => c.agentId === agentId)
      .sort((a, b) => a.id - b.id);
    setPayLeaf(data);
    handelSeqs(data);
    setAgent(agentId);
  };
  useEffect(() => {
    if (cocnernPayLeaf.length) {
      const concern = cocnernPayLeaf
        .filter((item) => {
          const itemDate = new Date(item.date);
          console.log("date", itemDate);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      setPayLeaf(concern);
      handelSeqs(concern);
    }
  }, [payLeafs]);

  const handelSeqs = (seq: PayLeaf[]) => {
    seq.forEach((item) => {
      const seq = item.seq;
      const exit = seqs.find((item) => item === seq);
      if (!exit) {
        seqs.push(seq);
        console.log("seq2", seqs);
      }
    });
  };
  console.log("leaf", payLeaf);
  console.log("seqs", seqs);

  return (
    <>
      <AdminLayout>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          ဖက်ပေးစာရင်းစစ်ခြင်း
        </Typography>

        <Box sx={{ display: "flex", mb: 3 }}>
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
            <th style={{ width: 50 }}>စဉ်</th>
            <th style={{ width: 150 }}>နေ့စွဲ</th>
            <th style={{ width: 150 }}>ကိုယ်စားလှယ်အမည်</th>
            <th style={{ width: 150 }}>ဖက်အမျိုးအစား</th>
            <th style={{ width: 150 }}>ပိုနံပါတ်</th>
            <th style={{ width: 150 }}>လျော့ပေးပိဿာ</th>
            <th style={{ width: 150 }}>အသားတင်ပိဿာ</th>
            <th style={{ width: 150 }}>ဈေးနှုန်း</th>
            <th style={{ width: 150 }}>စုစုပေါင်းသင့်ငွေ</th>
          </tr>

          {seqs.map((item) => {
            const exit = payLeaf.find((p) => p.seq === item);
            if (!exit) return;
            return (
              <tr key={item}>
                <th>{(no += 1)}</th>
                <td style={{ textAlign: "center" }}>
                  {new Date(exit.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {agents.find((a) => a.id === exit.agentId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>
                  {leaves.find((a) => a.id === exit.typeOfLeafId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>
                  {payLeaf
                    .filter((c) => c.seq === item)
                    .map((m) => m.batchNo)
                    .join(",")}
                </td>
                <td style={{ textAlign: "center" }}>{exit.discountViss}</td>
                <td style={{ textAlign: "center" }}>{exit.netViss}</td>
                <td style={{ textAlign: "center" }}>{exit.price}</td>
                <td style={{ textAlign: "center" }}>{exit.amount}</td>
                <td
                  style={{ textAlign: "center", width: 50 }}
                  onClick={() => {
                    setDeleteOpen(true), setSelectSeq(item);
                  }}
                >
                  {<DeleteIcon />}
                </td>
              </tr>
            );
          })}
        </table>
        <DeletePayLeaf
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedSeq={selectSeq}
        />
      </AdminLayout>
    </>
  );
};
export default PayLeafReport;
