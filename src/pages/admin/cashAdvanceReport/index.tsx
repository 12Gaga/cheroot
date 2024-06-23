import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import {
  AgentRemainCash,
  CompensationFilterSize,
  CompensationLabel,
  CompensationLeaf,
  CompensationTabacco,
  OtherDeduction,
} from "@prisma/client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DailyCashAdvance = () => {
  let no = 0;
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const otherDeduction = useAppSelector((store) => store.otherDeduction.item);
  const concernOtherDeduction = otherDeduction.filter(
    (item) => item.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item);
  const concernAgent = agents.filter((a) => a.workShopId === workShopId);
  const [exitData, setExitData] = useState<AgentRemainCash[]>([]);
  const [concernRemainCash, setConcernRemainCash] = useState<AgentRemainCash[]>(
    []
  );
  const remainCash = useAppSelector(
    (store) => store.agentReaminCash.item
  ).filter((rc) => rc.workShopId === workShopId);
  const compensationLeaf = useAppSelector(
    (store) => store.compensationLeaf.item
  ).filter((ps) => ps.workShopId === workShopId);
  const compensationFilter = useAppSelector(
    (store) => store.compensationFilter.item
  ).filter((ps) => ps.workShopId === workShopId);
  const compensationTabacco = useAppSelector(
    (store) => store.compensationTabacco.item
  ).filter((ps) => ps.workShopId === workShopId);
  const compensationLabel = useAppSelector(
    (store) => store.compensationLabel.item
  ).filter((ps) => ps.workShopId === workShopId);

  const [concernData, setConcernData] = useState<OtherDeduction[]>([]);
  const [concernLeaf, setConcernLeaf] = useState<CompensationLeaf[]>([]);
  const [concernFilter, setConcernFilter] = useState<CompensationFilterSize[]>(
    []
  );
  const [concernTabacco, setConcernTabacco] = useState<CompensationTabacco[]>(
    []
  );
  const [concernLabel, setConcernLabel] = useState<CompensationLabel[]>([]);
  const [agent, setAgent] = useState<number | null>(null);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const handleAgent = (agentId: number) => {
    const exit = remainCash.filter((item) => {
      const month = selecteddate.getMonth();
      const year = selecteddate.getFullYear();
      const dd = new Date(`${year},${month + 1},1`);
      console.log("agebtdate", new Date(item.date).getTime());
      console.log("dd", dd.getTime());
      return (
        item.agentId === agentId && new Date(item.date).getTime() < dd.getTime()
      );
    });
    console.log("date", selecteddate.getMonth() - 1);
    console.log("exit", exit);
    if (exit.length) {
      setExitData(exit);
    } else {
      setExitData([]);
    }

    const dataone = remainCash.filter(
      (item) =>
        item.agentId === agentId &&
        new Date(item.date).getMonth() === selecteddate.getMonth() &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear()
    );

    const data = concernOtherDeduction
      .filter(
        (item) =>
          item.agentId === agentId &&
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear()
      )
      .sort((a, b) => a.id - b.id);

    const leafCompensation = compensationLeaf
      .filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear() &&
          item.agentId === agentId
      )
      .sort((a, b) => a.id - b.id);
    const filterCompensation = compensationFilter
      .filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear() &&
          item.agentId === agentId
      )
      .sort((a, b) => a.id - b.id);
    const tabaccoCompensation = compensationTabacco
      .filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear() &&
          item.agentId === agentId
      )
      .sort((a, b) => a.id - b.id);
    const labelCompensation = compensationLabel
      .filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear() &&
          item.agentId === agentId
      )
      .sort((a, b) => a.id - b.id);
    setConcernData(data);
    setConcernRemainCash(dataone);
    setConcernLeaf(leafCompensation);
    setConcernFilter(filterCompensation);
    setConcernTabacco(tabaccoCompensation);
    setConcernLabel(labelCompensation);
    setAgent(agentId);
  };

  const handelDate = (date: Date) => {
    const exit = remainCash.filter((item) => {
      console.log("date1", new Date(item.date).getMonth() - 1);
      return (
        item.agentId === agent && new Date(item.date).getTime() < date.getTime()
      );
    });
    console.log("date2", date.getMonth() - 1);
    console.log("exit", exit);
    if (exit.length) {
      setExitData(exit);
    } else {
      setExitData([]);
    }

    const dataone = remainCash.filter(
      (item) =>
        item.agentId === agent &&
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear()
    );

    const dateData = concernOtherDeduction
      .filter(
        (item) =>
          new Date(item.date).getMonth() === date.getMonth() &&
          new Date(item.date).getFullYear() === date.getFullYear() &&
          item.agentId === agent
      )
      .sort((a, b) => a.id - b.id);

    const leafCompensation = compensationLeaf
      .filter(
        (item) =>
          new Date(item.date).getMonth() === date.getMonth() &&
          new Date(item.date).getFullYear() === date.getFullYear() &&
          item.agentId === agent
      )
      .sort((a, b) => a.id - b.id);
    const filterCompensation = compensationFilter
      .filter(
        (item) =>
          new Date(item.date).getMonth() === date.getMonth() &&
          new Date(item.date).getFullYear() === date.getFullYear() &&
          item.agentId === agent
      )
      .sort((a, b) => a.id - b.id);
    const tabaccoCompensation = compensationTabacco
      .filter(
        (item) =>
          new Date(item.date).getMonth() === date.getMonth() &&
          new Date(item.date).getFullYear() === date.getFullYear() &&
          item.agentId === agent
      )
      .sort((a, b) => a.id - b.id);
    const labelCompensation = compensationLabel
      .filter(
        (item) =>
          new Date(item.date).getMonth() === date.getMonth() &&
          new Date(item.date).getFullYear() === date.getFullYear() &&
          item.agentId === agent
      )
      .sort((a, b) => a.id - b.id);
    setConcernData(dateData);
    setConcernRemainCash(dataone);
    setConcernLeaf(leafCompensation);
    setConcernFilter(filterCompensation);
    setConcernTabacco(tabaccoCompensation);
    setConcernLabel(labelCompensation);
  };
  console.log("exitdata", exitData);
  console.log("concerb", concernRemainCash);
  console.log("concerndata", concernData);
  // if (!concernOtherDeduction.length) return null;
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
                {exitData.length
                  ? exitData[exitData.length - 1].remainCashBig
                  : concernRemainCash.length &&
                    concernRemainCash[0].remainCashBig}
              </th>
              <th>
                {exitData.length
                  ? exitData[exitData.length - 1].remainCashSmall
                  : concernRemainCash.length &&
                    concernRemainCash[0].remainCashSmall}
              </th>
              <th></th>
              <th></th>
              <th>
                {exitData.length
                  ? exitData[exitData.length - 1].remainCashBig
                  : concernRemainCash.length &&
                    concernRemainCash[0].remainCashBig}
              </th>
              <th>
                {exitData.length
                  ? exitData[exitData.length - 1].remainCashSmall
                  : concernRemainCash.length &&
                    concernRemainCash[0].remainCashSmall}
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
                  {exitData.length
                    ? exitData[exitData.length - 1].remainCashBig
                    : concernRemainCash.length &&
                      concernRemainCash[0].remainCashBig +
                        concernData.reduce((total, c) => {
                          return (total += c.cashAdvanceBig);
                        }, 0)}
                </th>
                <th style={{ backgroundColor: "#FFDB5C" }}>
                  {exitData.length
                    ? exitData[exitData.length - 1].remainCashSmall
                    : concernRemainCash.length &&
                      concernRemainCash[0].remainCashSmall +
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
                  {concernRemainCash.length
                    ? concernRemainCash[concernRemainCash.length - 1]
                        .remainCashBig
                    : 0}
                </th>
                <th style={{ backgroundColor: "#FFDB5C" }}>
                  {concernRemainCash.length
                    ? concernRemainCash[concernRemainCash.length - 1]
                        .remainCashSmall
                    : 0}
                </th>
              </tr>
            )}
          </table>
        </Box>
        <Box sx={{ mt: 10 }}>
          <Typography sx={{ fontSize: "20px", mb: 1, color: "#059212" }}>
            အလျော်အစား
          </Typography>
          <table border={1}>
            <tr>
              <th style={{ width: 50, backgroundColor: "#95D2B3" }}>စဉ်</th>
              <th style={{ width: 150, backgroundColor: "#95D2B3" }}>
                ငွေ(အကြီး)
              </th>
              <th style={{ width: 150, backgroundColor: "#95D2B3" }}>
                ငွေ(အသေး)
              </th>
            </tr>

            <tr>
              <th>{(no += 1)}</th>
              <td style={{ textAlign: "center" }}>
                {concernLeaf.reduce((tol, leaf) => {
                  return (tol += leaf.addCashBig);
                }, 0) +
                  concernFilter.reduce((tol, filter) => {
                    return (tol += filter.addCashBig);
                  }, 0) +
                  concernTabacco.reduce((tol, tab) => {
                    return (tol += tab.addCashBig);
                  }, 0) +
                  concernLabel.reduce((tol, label) => {
                    return (tol += label.addCashBig);
                  }, 0)}
              </td>
              <td style={{ textAlign: "center" }}>
                {concernLeaf.reduce((tol, leaf) => {
                  return (tol += leaf.addCashsmall);
                }, 0) +
                  concernFilter.reduce((tol, filter) => {
                    return (tol += filter.addCashsmall);
                  }, 0) +
                  concernTabacco.reduce((tol, tab) => {
                    return (tol += tab.addCashsmall);
                  }, 0) +
                  concernLabel.reduce((tol, label) => {
                    return (tol += label.addCashsmall);
                  }, 0)}
              </td>
            </tr>
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default DailyCashAdvance;
