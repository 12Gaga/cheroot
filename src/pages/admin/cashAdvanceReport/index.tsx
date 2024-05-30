import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import { TheaterComedyOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { OtherDeduction } from "@prisma/client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DailyCashAdvance = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const otherDeduction = useAppSelector((store) => store.otherDeduction.item);
  const concernOtherDeduction = otherDeduction.filter(
    (item) => item.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item);
  const concernAgent = agents.filter((a) => a.workShopId === workShopId);
  const [exitData, setExitData] = useState<OtherDeduction | undefined>(
    undefined
  );
  const [concernData, setConcernData] = useState<OtherDeduction[]>([]);
  const [agent, setAgent] = useState<number | null>(null);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const handleAgent = (agentId: number) => {
    const exit = concernOtherDeduction.filter(
      (item) =>
        item.agentId === agentId &&
        new Date(item.date).getMonth() <= selecteddate.getMonth() - 1 &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear()
    );
    console.log("date", selecteddate.getMonth() - 1);
    console.log("exit", exit);
    if (exit.length) {
      setExitData(exit[exit.length - 1]);
    } else {
      setExitData(undefined);
    }

    const data = concernOtherDeduction.filter(
      (item) =>
        item.agentId === agentId &&
        new Date(item.date).getMonth() === selecteddate.getMonth() &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear()
    );
    setConcernData(data);
    setAgent(agentId);
  };

  const handelDate = (date: Date) => {
    const exit = concernOtherDeduction.filter((item) => {
      console.log("date1", new Date(item.date).getMonth() - 1);
      return (
        item.agentId === agent &&
        new Date(item.date).getMonth() <= date.getMonth() - 1 &&
        new Date(item.date).getFullYear() === date.getFullYear()
      );
    });
    console.log("date2", date.getMonth() - 1);
    console.log("exit", exit);
    if (exit.length) {
      setExitData(exit[exit.length - 1]);
    } else {
      setExitData(undefined);
    }

    const dateData = concernOtherDeduction.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear() &&
        item.agentId === agent
    );
    setConcernData(dateData);
  };
  console.log("exitdata", exitData);
  console.log("concerndata", concernData);
  if (!concernOtherDeduction.length) return null;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          ကိုယ်စားလှယ်ကြိုယူငွေလက်ကျန်ရှင်းတမ်း
        </Typography>

        <Box
          sx={{ display: "flex", alignItems: "center", ml: 5, mt: 3, mb: 5 }}
        >
          <Box sx={{ mr: 2, display: "flex", mt: 4, width: 300 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              showMonthYearPicker
              selected={selecteddate}
              onChange={(date) => {
                setSelectedDate(date as Date);
                handelDate(date as Date);
              }}
            />
          </Box>

          <Box sx={{}}>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ကိုယ်စားလှယ်အမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={agent}
                  onChange={(evt) => {
                    handleAgent(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernAgent.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: "80%", margin: " auto" }}>
          <table border={1} className="table">
            <tr>
              <th style={{ width: 200 }}></th>
              <th
                colSpan={2}
                style={{ width: 300, backgroundColor: "#FFE0B5" }}
              >
                ကြိုယူငွေ
              </th>
              <th
                colSpan={2}
                style={{ width: 300, backgroundColor: "#FFE0B5" }}
              >
                ကြိုယူ - ခုနှိမ်ငွေ
              </th>
              <th
                colSpan={2}
                style={{ width: 300, backgroundColor: "#FFE0B5" }}
              >
                ကြိုယူငွေလက်ကျန်
              </th>
            </tr>

            <tr>
              <th></th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အကြီး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အသေး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အကြီး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အသေး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အကြီး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အသေး)</th>
            </tr>

            <tr>
              <th style={{ backgroundColor: "#FFF9D0" }}>
                စာရင်းဖွင့်လက်ကျန်ငွေ
              </th>
              <th>
                {exitData
                  ? exitData.remainCashBig
                  : agents.find((a) => a.id === agent)?.cashBalcanceBig}
              </th>
              <th>
                {exitData
                  ? exitData.remainCashSmall
                  : agents.find((a) => a.id === agent)?.cashBalcanceSmall}
              </th>
              <th></th>
              <th></th>
              <th>
                {exitData
                  ? exitData.remainCashBig
                  : agents.find((a) => a.id === agent)?.cashBalcanceBig}
              </th>
              <th>
                {exitData
                  ? exitData.remainCashSmall
                  : agents.find((a) => a.id === agent)?.cashBalcanceSmall}
              </th>
            </tr>

            {concernData.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center", height: 30 }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernData.find(
                        (c) =>
                          new Date(c.date).toLocaleDateString() ===
                          itemdate.toLocaleDateString()
                      )?.cashAdvanceBig
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernData.find(
                        (c) =>
                          new Date(c.date).toLocaleDateString() ===
                          itemdate.toLocaleDateString()
                      )?.cashAdvanceSmall
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernData.find(
                        (c) =>
                          new Date(c.date).toLocaleDateString() ===
                          itemdate.toLocaleDateString()
                      )?.cashAdvanceBigDeduction
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernData.find(
                        (c) =>
                          new Date(c.date).toLocaleDateString() ===
                          itemdate.toLocaleDateString()
                      )?.cashAdvanceSmallDeduction
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernData.find(
                        (c) =>
                          new Date(c.date).toLocaleDateString() ===
                          itemdate.toLocaleDateString()
                      )?.remainCashBig
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernData.find(
                        (c) =>
                          new Date(c.date).toLocaleDateString() ===
                          itemdate.toLocaleDateString()
                      )?.remainCashSmall
                    }
                  </td>
                </tr>
              );
            })}
            {agent && (
              <tr>
                <td style={{ height: 30 }}></td>
                <th style={{ backgroundColor: "#FFDB5C" }}>
                  {exitData
                    ? exitData.remainCashBig
                    : (agents.find((a) => a.id === agent)
                        ?.cashBalcanceBig as number) +
                      concernData.reduce((total, c) => {
                        return (total += c.cashAdvanceBig);
                      }, 0)}
                </th>
                <th style={{ backgroundColor: "#FFDB5C" }}>
                  {exitData
                    ? exitData.remainCashSmall
                    : (agents.find((a) => a.id === agent)
                        ?.cashBalcanceSmall as number) +
                      concernData.reduce((total, c) => {
                        return (total += c.cashAdvanceSmall);
                      }, 0)}
                </th>
                <th style={{ backgroundColor: "#FFDB5C" }}>
                  {concernData.reduce((total, c) => {
                    return (total += c.cashAdvanceBigDeduction);
                  }, 0)}
                </th>
                <th style={{ backgroundColor: "#FFDB5C" }}>
                  {concernData.reduce((total, c) => {
                    return (total += c.cashAdvanceSmallDeduction);
                  }, 0)}
                </th>
                <th style={{ backgroundColor: "#FFDB5C" }}>
                  {concernData.length
                    ? concernData[concernData.length - 1].remainCashBig
                    : 0}
                </th>
                <th style={{ backgroundColor: "#FFDB5C" }}>
                  {concernData.length
                    ? concernData[concernData.length - 1].remainCashSmall
                    : 0}
                </th>
              </tr>
            )}
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default DailyCashAdvance;
