import AdminLayout from "@/components/adminLayout";
import DeleteReturnCheroot from "@/components/returnCheroot/deleteReturnCheroot";
import { useAppSelector } from "@/store/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import {
  Typography,
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import {
  LeafDeduction,
  OtherDeduction,
  ReturnReadyCheroot,
} from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ReturnCherootData = () => {
  const router = useRouter();
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const returnCheroots = useAppSelector((store) => store.returnCheroot.item);
  const cocnernReturnCheroot = returnCheroots.filter(
    (c) => c.workShopId === workShopId
  );
  const leafDeductions = useAppSelector((store) => store.leafDeduction.item);
  const cocnernLeafDeduction = leafDeductions.filter(
    (c) => c.workShopId === workShopId
  );
  const otherDeductions = useAppSelector((store) => store.otherDeduction.item);
  const cocnernOtherDeduction = otherDeductions.filter(
    (c) => c.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectSeq, setSelectSeq] = useState<string>("");
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [leafDeduction, setleafDeduction] = useState<LeafDeduction[]>([]);
  const [returnCheroot, setReturnCheroot] = useState<ReturnReadyCheroot[]>([]);
  const [otherDeduction, setOtherDeduction] = useState<OtherDeduction[]>([]);
  const [seqs, setSeqs] = useState<string[]>([]);
  const [agent, setAgent] = useState<number | null>(null);
  let no = 0;
  const handleDate = (date: Date) => {
    const dataOne = cocnernReturnCheroot.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    const dataTwo = cocnernLeafDeduction.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    const dataThree = cocnernOtherDeduction
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toLocaleDateString() === date.toLocaleDateString();
      })
      .sort((a, b) => a.id - b.id);
    setReturnCheroot(dataOne);
    setleafDeduction(dataTwo);
    setOtherDeduction(dataThree);
    handelSeqs(dataThree);
    setAgent(null);
  };
  const handleAgent = (agentId: number) => {
    const dataOne = cocnernReturnCheroot.filter((item) => {
      return item.agentId === agentId;
    });
    const dataTwo = cocnernLeafDeduction.filter((item) => {
      return item.agentId === agentId;
    });
    const dataThree = cocnernOtherDeduction
      .filter((item) => {
        return item.agentId === agentId;
      })
      .sort((a, b) => a.id - b.id);
    setReturnCheroot(dataOne);
    setleafDeduction(dataTwo);
    setOtherDeduction(dataThree);
    handelSeqs(dataThree);
    setAgent(agentId);
  };

  console.log("if", agent);
  useEffect(() => {
    if (cocnernOtherDeduction.length) {
      const dataOne = cocnernReturnCheroot.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      const dataTwo = cocnernLeafDeduction.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      const dataThree = cocnernOtherDeduction
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      setReturnCheroot(dataOne);
      setleafDeduction(dataTwo);
      setOtherDeduction(dataThree);
      handelSeqs(dataThree);
    }
  }, [otherDeductions]);

  const handelSeqs = (seq: OtherDeduction[]) => {
    seq.forEach((item) => {
      const seq = item.seq;
      const exit = seqs.find((item) => item === seq);
      if (!exit) {
        seqs.push(seq);
        console.log("seq2", seqs);
      }
    });
  };
  console.log("leaf", leafDeduction);
  console.log("cheroot", returnCheroot);
  console.log("deduct", otherDeduction);
  console.log("seqs", seqs);
  return (
    <AdminLayout>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        ကိုယ်စားလှယ်ဆေးလိပ်အဝင်စာရင်း
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

      <Box>
        <table border={1}>
          <tr>
            <th style={{ width: 30 }}>စဉ်</th>
            <th style={{ width: 100 }}>နေ့စွဲ</th>
            <th style={{ width: 150 }}>ကိုယ်စားလှယ်အမည်</th>
            <th style={{ width: 150 }}>ဆေးလိပ်သင့်ငွေ</th>
            <th style={{ width: 150 }}>ဖက်ဖိုးခုနှိမ်ငွေ</th>
            <th style={{ width: 150 }}>ခုနှိမ်ငွေအကြီး</th>
            <th style={{ width: 150 }}>ခုနှိမ်ငွေအသေး</th>
            <th style={{ width: 150 }}>အခြားခုနှိမ်ငွေ</th>
            <th style={{ width: 150 }}>ကြိုယူငွေအကြီး</th>
            <th style={{ width: 150 }}>ကြိုယူငွေအသေး</th>
            <th style={{ width: 150 }}>ဘောက်ဆူး</th>
            <th style={{ width: 200 }}>စုစုပေါင်းကိုယ်စားလှယ်ရှင်းငွေ</th>
          </tr>
          {seqs.map((item) => {
            const exit = otherDeduction.find((o) => o.seq === item);
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
                  {returnCheroot
                    .filter((r) => r.seq === item)
                    .reduce((tol, cheroot) => {
                      return (tol += cheroot.amount);
                    }, 0)}
                </td>
                <td style={{ textAlign: "center" }}>
                  {leafDeduction
                    .filter((r) => r.seq === item)
                    .reduce((tol, leaf) => {
                      return (tol += leaf.deductionAmount);
                    }, 0)}
                </td>
                <td style={{ textAlign: "center" }}>
                  {exit.cashAdvanceBigDeduction}
                </td>
                <td style={{ textAlign: "center" }}>
                  {exit.cashAdvanceSmallDeduction}
                </td>
                <td style={{ textAlign: "center" }}>{exit.otherDeduction}</td>
                <td style={{ textAlign: "center" }}>{exit.cashAdvanceBig}</td>
                <td style={{ textAlign: "center" }}>{exit.cashAdvanceSmall}</td>
                <td style={{ textAlign: "center" }}>{exit.bonusPayment}</td>
                <td style={{ textAlign: "center" }}>
                  {exit.totalNetAgentPayment}
                </td>
                <td
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    router.push(
                      `/admin/returnCheroot/printReturnCherootData?agentId=${exit.agentId}&seq=${item}&deductSeq=${exit.deductSeq}`
                    );
                  }}
                >
                  {<PrintIcon />}
                </td>
                <td
                  style={{ textAlign: "center" }}
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
      </Box>
      <DeleteReturnCheroot
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedSeq={selectSeq}
      />
    </AdminLayout>
  );
};
export default ReturnCherootData;
