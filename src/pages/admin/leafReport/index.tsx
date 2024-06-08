import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { AgentRemineLeaf, LeafDeduction, PayLeaf } from "@prisma/client";
import { useState } from "react";
import { exit } from "process";

const LeafReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const remainleaf = useAppSelector(
    (store) => store.agentReaminLeaf.item
  ).filter((rl) => rl.workShopId === workShopId);
  const payLeaf = useAppSelector((store) => store.payLeaf.item).filter(
    (pl) => pl.workShopId === workShopId
  );
  const leafDeduction = useAppSelector(
    (store) => store.leafDeduction.item
  ).filter((ld) => ld.workShopId === workShopId);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item).filter(
    (l) => l.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );

  const [exitData, setExitData] = useState<AgentRemineLeaf[]>([]);
  const [concernRemainLeaf, setConcernRemainLeaf] = useState<AgentRemineLeaf[]>(
    []
  );
  const [concernPayLeaf, setConcernPayLeaf] = useState<PayLeaf[]>([]);
  const [concernLeafDeduct, setConcernLeafDeduct] = useState<LeafDeduction[]>(
    []
  );
  const [agent, setAgent] = useState<number | null>(null);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const handleAgent = (agentId: number) => {
    const exit = remainleaf.filter(
      (item) =>
        item.agentId === agentId &&
        new Date(item.date).getMonth() <= selecteddate.getMonth() - 1 &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear()
    );
    console.log("date", selecteddate.getMonth() - 1);
    console.log("exit", exit);
    if (exit.length) {
      setExitData(exit);
    } else {
      setExitData([]);
    }

    const data = remainleaf.filter(
      (item) =>
        item.agentId === agentId &&
        new Date(item.date).getMonth() === selecteddate.getMonth() &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear()
    );

    const datatwo = payLeaf.filter(
      (item) =>
        item.agentId === agentId &&
        new Date(item.date).getMonth() === selecteddate.getMonth() &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear()
    );

    const datathree = leafDeduction.filter(
      (item) =>
        item.agentId === agentId &&
        new Date(item.date).getMonth() === selecteddate.getMonth() &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear()
    );
    filterDates(data);
    setConcernRemainLeaf(data);
    setConcernPayLeaf(datatwo);
    setConcernLeafDeduct(datathree);
    setAgent(agentId);
  };

  const handelDate = (date: Date) => {
    const exit = remainleaf.filter((item) => {
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
      setExitData(exit);
    } else {
      setExitData([]);
    }

    const dateData = remainleaf.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear() &&
        item.agentId === agent
    );
    const datatwo = payLeaf.filter(
      (item) =>
        item.agentId === agent &&
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear()
    );

    const datathree = leafDeduction.filter(
      (item) =>
        item.agentId === agent &&
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear()
    );
    filterDates(dateData);
    setConcernRemainLeaf(dateData);
    setConcernPayLeaf(datatwo);
    setConcernLeafDeduct(datathree);
  };

  const filterDates = (data: AgentRemineLeaf[]) => {
    data.forEach((item) => {
      const itemdate = new Date(item.date);
      const exit = dates.find(
        (d) => d.toLocaleDateString() === itemdate.toLocaleDateString()
      );
      if (!exit) {
        dates.push(itemdate);
      }
    });
  };
  console.log("exit", exitData);
  console.log("data", concernRemainLeaf);
  console.log("data2", concernPayLeaf);
  console.log("data3", concernLeafDeduct);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          ကိုယ်စားလှယ်ဖက်စာရင်းရှင်းတမ်း
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
                  {agents.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Box>
          <table border={1} className="table">
            <tr>
              <th style={{ width: 130, backgroundColor: "#FFDE95" }}>နေ့စွဲ</th>
              {leaves.map((item) => {
                return (
                  <th
                    colSpan={3}
                    key={item.id}
                    style={{ width: 300, backgroundColor: "#FFDE95" }}
                  >
                    {item.name}
                  </th>
                );
              })}
            </tr>

            <tr>
              <td></td>
              {leaves.map((item) => {
                return (
                  <>
                    <th style={{ backgroundColor: "#B3E2A7" }}>ကြိုယူ</th>
                    <th style={{ backgroundColor: "#B3E2A7" }}>ခုနှိမ်</th>
                    <th style={{ backgroundColor: "#B3E2A7" }}>Bal:</th>
                  </>
                );
              })}
            </tr>

            <tr>
              <td></td>
              {leaves.map((item) => {
                return (
                  <>
                    <th key={item.id} style={{ backgroundColor: "#B3E2A7" }}>
                      {item.price}
                    </th>
                    <th style={{ backgroundColor: "#B3E2A7" }}>ပိဿာ</th>
                    <th style={{ backgroundColor: "#B3E2A7" }}>ပိဿာ</th>
                  </>
                );
              })}
            </tr>

            <tr>
              <th style={{ color: "red" }}>စာရင်းဖွင့်စာရင်း</th>
              {leaves.map((item) => {
                let data;
                if (exitData.length) {
                  const findData = exitData.filter((d) => d.leafId === item.id);
                  data = findData.length && findData[findData.length - 1].Viss;
                } else {
                  const findData = concernRemainLeaf.filter(
                    (d) => d.leafId === item.id
                  );
                  data = findData.length && findData[0].Viss;
                }
                console.log("value", data);
                return (
                  <>
                    <td></td>
                    <td></td>
                    <th
                      style={{
                        color: "red",
                        backgroundColor: "#FFFDB5",
                      }}
                    >
                      {data}
                    </th>
                  </>
                );
              })}
            </tr>

            {dates.map((item) => {
              const exit = concernRemainLeaf.find(
                (c) =>
                  new Date(c.date).toLocaleDateString() ==
                  item.toLocaleDateString()
              );
              if (!exit) return null;
              const itemdate = new Date(exit.date);
              return (
                <tr key={item.toString()}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  {leaves.map((l) => {
                    const findRemainData = concernRemainLeaf.filter(
                      (rd) =>
                        new Date(rd.date).toLocaleDateString() ===
                          item.toLocaleDateString() && rd.leafId === l.id
                    );

                    const findPayData = concernPayLeaf.filter(
                      (pl) =>
                        new Date(pl.date).toLocaleDateString() ===
                          item.toLocaleDateString() && pl.typeOfLeafId === l.id
                    );
                    const findDeductData = concernLeafDeduct
                      .filter(
                        (ld) =>
                          new Date(ld.date).toLocaleDateString() ===
                            item.toLocaleDateString() &&
                          ld.typeOfLeafId === l.id
                      )
                      .reduce((tol, leaf) => {
                        return (tol += leaf.deductViss);
                      }, 0);
                    return (
                      <>
                        <td
                          key={l.id}
                          style={{ textAlign: "center", height: 25 }}
                        >
                          {findPayData.length &&
                            findPayData[findPayData.length - 1].netViss}
                        </td>
                        <td key={l.id} style={{ textAlign: "center" }}>
                          {findDeductData}
                        </td>
                        <td
                          style={{
                            backgroundColor: "#FFD0D0",
                            textAlign: "center",
                          }}
                          key={l.id}
                        >
                          {findRemainData.length &&
                            findRemainData[findRemainData.length - 1].Viss}
                        </td>
                      </>
                    );
                  })}
                </tr>
              );
            })}

            <tr>
              <td></td>
              {leaves.map((item) => {
                const findRemainData = concernRemainLeaf.filter(
                  (rd) => rd.leafId === item.id
                );

                const findPayData = dates
                  .map((d) => {
                    const datum = concernPayLeaf.filter(
                      (pl) =>
                        new Date(pl.date).toLocaleDateString() ===
                          d.toLocaleDateString() && pl.typeOfLeafId === item.id
                    );
                    return datum.length ? datum[datum.length - 1].netViss : 0;
                  })
                  .reduce((tol, value) => {
                    return (tol += value);
                  }, 0);

                const findDeductData = concernLeafDeduct
                  .filter((ld) => ld.typeOfLeafId === item.id)
                  .reduce((tol, leaf) => {
                    return (tol += leaf.deductViss);
                  }, 0);
                return (
                  <>
                    <th key={item.id} style={{ backgroundColor: "#FFDB5C" }}>
                      {findPayData}
                    </th>
                    <th key={item.id} style={{ backgroundColor: "#FFDB5C" }}>
                      {findDeductData}
                    </th>
                    <th style={{ backgroundColor: "#FFDB5C" }} key={item.id}>
                      {findRemainData.length &&
                        findRemainData[findRemainData.length - 1].Viss}
                    </th>
                  </>
                );
              })}
            </tr>
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default LeafReport;
