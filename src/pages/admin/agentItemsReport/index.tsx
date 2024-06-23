import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import {
  AgentLeftFilterSize,
  CompensationFilterSize,
  PayOtherItem,
  ReturnReadyCheroot,
} from "@prisma/client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const RemainFilter = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item)
    .filter((c) => c.workShopId === workShopId)
    .sort((a, b) => a.id - b.id);
  const remainFilters = useAppSelector(
    (store) => store.agentRemainFilter.item
  ).filter((rf) => rf.workShopId === workShopId);
  const returnCheroots = useAppSelector(
    (store) => store.returnCheroot.item
  ).filter((rc) => rc.workShopId === workShopId);
  const payStocks = useAppSelector((store) => store.payStock.item).filter(
    (ps) => ps.workShopId === workShopId
  );
  const compensation = useAppSelector(
    (store) => store.compensationFilter.item
  ).filter((ps) => ps.workShopId === workShopId);
  const [agent, setAgent] = useState<number | null>(null);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const [payStock, setPayStock] = useState<PayOtherItem[]>([]);
  const [returnCheroot, setReturnCheroot] = useState<ReturnReadyCheroot[]>([]);
  const [remainFilter, setRemianFilter] = useState<AgentLeftFilterSize[]>([]);
  const [compensationFilter, setCompensationFilter] = useState<
    CompensationFilterSize[]
  >([]);
  const handelDate = (date: Date) => {
    const concernRetrnCheroot = returnCheroots.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear() &&
        item.agentId === agent
    );
    const concernPayStock = payStocks.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear() &&
        item.agentId === agent
    );
    const concernRemainFilter = remainFilters.filter(
      (item) => item.agentId === agent
    );
    const concernCompensation = compensation
      .filter(
        (item) =>
          new Date(item.date).getMonth() === date.getMonth() &&
          new Date(item.date).getFullYear() === date.getFullYear() &&
          item.agentId === agent
      )
      .sort((a, b) => a.id - b.id);
    filterDates(concernRetrnCheroot);
    setPayStock(concernPayStock);
    setReturnCheroot(concernRetrnCheroot);
    setRemianFilter(concernRemainFilter);
    setCompensationFilter(concernCompensation);
  };

  const handleAgent = (agentId: number) => {
    const concernRetrnCheroot = returnCheroots.filter(
      (item) =>
        new Date(item.date).getMonth() === selecteddate.getMonth() &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear() &&
        item.agentId === agentId
    );
    const concernPayStock = payStocks.filter(
      (item) =>
        new Date(item.date).getMonth() === selecteddate.getMonth() &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear() &&
        item.agentId === agentId
    );
    const concernRemainFilter = remainFilters.filter(
      (item) => item.agentId === agentId
    );
    const concernCompensation = compensation
      .filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear() &&
          item.agentId === agentId
      )
      .sort((a, b) => a.id - b.id);
    filterDates(concernRetrnCheroot);
    setPayStock(concernPayStock);
    setReturnCheroot(concernRetrnCheroot);
    setRemianFilter(concernRemainFilter);
    setCompensationFilter(concernCompensation);
    setAgent(agentId);
  };

  const filterDates = (data: ReturnReadyCheroot[]) => {
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
  let no = 0;
  return (
    <AdminLayout>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
      >
        အစီလုံးလက်ကျန်စာရင်း
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", ml: 5, mt: 3, mb: 5 }}>
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

      <Box sx={{ width: "90%", margin: "0 auto" }}>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 100 }}>ရက်စွဲ</th>
            <th style={{ width: 150 }}></th>
            {cheroots.map((item) => {
              return (
                <th
                  key={item.id}
                  style={{ width: 100, textAlign: "center", color: "red" }}
                >
                  {item.name}
                </th>
              );
            })}
            <td style={{ width: 100, textAlign: "center" }}>စုစုပေါင်း</td>
          </tr>
          <tr>
            <th></th>
            <th>ခွဲတမ်းလိပ်ရန်</th>
            {cheroots.map((c) => {
              return (
                <td key={c.id} style={{ textAlign: "center" }}>
                  {payStock
                    .filter((p) => p.typeOfCherootId === c.id)
                    .reduce((tol, cheroot) => {
                      return (tol += cheroot.cherootQty);
                    }, 0)}
                </td>
              );
            })}
            <td style={{ textAlign: "center" }}>
              {payStock.reduce((tol, cheroot) => {
                return (tol += cheroot.cherootQty);
              }, 0)}
            </td>
          </tr>
          <tr>
            {dates.map((d) => {
              const exit = returnCheroot.find(
                (c) =>
                  new Date(c.date).toLocaleDateString() ===
                  d.toLocaleDateString()
              );
              if (!exit) return null;
              const itemdate = new Date(exit.date);
              return (
                <>
                  <td key={d.toString()} style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <th>ဆေးလိပ်အဝင်</th>
                  {cheroots.map((cheroot) => {
                    return (
                      <td style={{ textAlign: "center" }}>
                        {returnCheroot
                          .filter(
                            (rc) =>
                              new Date(rc.date).toLocaleDateString() ===
                                d.toLocaleDateString() &&
                              rc.typeOfCherootId === cheroot.id
                          )
                          .reduce((tol, ch) => {
                            return (tol += ch.totalCherootQty);
                          }, 0)}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: "center" }}>
                    {returnCheroot
                      .filter(
                        (rc) =>
                          new Date(rc.date).toLocaleDateString() ===
                          d.toLocaleDateString()
                      )
                      .reduce((tol, ch) => {
                        return (tol += ch.totalCherootQty);
                      }, 0)}
                  </td>
                </>
              );
            })}
          </tr>
          <tr>
            <td></td>
            <th>လက်ကျန်ဆေးလိပ်</th>
            {cheroots.map((cheroot) => {
              return (
                <td style={{ textAlign: "center" }}>
                  {payStock
                    .filter((p) => p.typeOfCherootId === cheroot.id)
                    .reduce((tol, tp) => {
                      return (tol += tp.cherootQty);
                    }, 0) -
                    returnCheroot
                      .filter((c) => c.typeOfCherootId === cheroot.id)
                      .reduce((tol, tc) => {
                        return (tol += tc.totalCherootQty);
                      }, 0)}
                </td>
              );
            })}
            <td style={{ textAlign: "center" }}>
              {cheroots
                .map((cheroot) => {
                  return (
                    payStock
                      .filter((p) => p.typeOfCherootId === cheroot.id)
                      .reduce((tol, tp) => {
                        return (tol += tp.cherootQty);
                      }, 0) -
                    returnCheroot
                      .filter((c) => c.typeOfCherootId === cheroot.id)
                      .reduce((tol, tc) => {
                        return (tol += tc.totalCherootQty);
                      }, 0)
                  );
                })
                .reduce((tol, tc) => {
                  return (tol += tc);
                }, 0)}
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFDA78" }}></td>
            <th style={{ backgroundColor: "#FFDA78" }}>လက်ကျန်အစီခံ</th>
            {cheroots.map((item) => {
              const find = remainFilter.find(
                (r) => r.typeOfCherootId === item.id
              );
              return (
                <td
                  key={item.id}
                  style={{ textAlign: "center", backgroundColor: "#FFDA78" }}
                >
                  {find ? find.quantity : 0}
                </td>
              );
            })}
            <td style={{ textAlign: "center", backgroundColor: "#FFDA78" }}>
              {remainFilter.reduce((tol, f) => {
                return (tol += f.quantity);
              }, 0)}
            </td>
          </tr>
        </table>
      </Box>
      <Box sx={{ mt: 10 }}>
        <Typography sx={{ fontSize: "20px", mb: 1, color: "#059212" }}>
          အစီခံအလျော်အစား
        </Typography>
        <table border={1}>
          <tr>
            <th style={{ width: 50, backgroundColor: "#95D2B3" }}>စဉ်</th>
            <th style={{ width: 150, backgroundColor: "#95D2B3" }}>နေ့စွဲ</th>
            <th style={{ width: 150, backgroundColor: "#95D2B3" }}>
              ဆေးလိပ်အမျိုးအစား
            </th>
            <th style={{ width: 150, backgroundColor: "#95D2B3" }}>
              လျှော်ပေးအရေအတွက်
            </th>
            <th style={{ width: 150, backgroundColor: "#95D2B3" }}>
              ရော်အရေအတွက်
            </th>
          </tr>
          {compensationFilter.map((item) => {
            return (
              <tr key={item.id}>
                <th>{(no += 1)}</th>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {cheroots.find((c) => c.id === item.typeOfCherootId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.compensationQty}</td>
                <td style={{ textAlign: "center" }}>{item.takeMoneyQty}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={3}></td>
            <td style={{ textAlign: "center", backgroundColor: "#FFDA78" }}>
              {compensationFilter.reduce((tol, co) => {
                return (tol += co.compensationQty);
              }, 0)}
            </td>
            <td style={{ textAlign: "center", backgroundColor: "#FFDA78" }}>
              {compensationFilter.reduce((tol, co) => {
                return (tol += co.takeMoneyQty);
              }, 0)}
            </td>
          </tr>
        </table>
      </Box>
    </AdminLayout>
  );
};
export default RemainFilter;
