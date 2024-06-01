import { useAppSelector } from "@/store/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { ReturnReadyCheroot } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/adminLayout";

const DailyCherootData = () => {
  const router = useRouter();
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const cherooots = useAppSelector((store) => store.typeOfCheroot.item);
  const concernCheroot = cherooots.filter(
    (item) => item.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item);
  const concernAgent = agents.filter((item) => item.workShopId === workShopId);
  const returnCheroots = useAppSelector((store) => store.returnCheroot.item);
  const concernReturnCheroots = returnCheroots.filter(
    (item) => item.workShopId === workShopId
  );
  const [concernData, setConcernData] = useState<ReturnReadyCheroot[]>([]);
  const [agent, setAgent] = useState<number | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const handleAgent = (agentId: number) => {
    const data = concernReturnCheroots.filter(
      (item) =>
        item.agentId === agentId &&
        new Date(item.date).getMonth() === selecteddate.getMonth() &&
        new Date(item.date).getFullYear() === selecteddate.getFullYear()
    );
    setConcernData(data);
    dateHandling(data);
    setAgent(agentId);
  };

  const handelDate = (date: Date) => {
    const dateData = concernReturnCheroots.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear() &&
        item.agentId === agent
    );
    setConcernData(dateData);
    dateHandling(dateData);
  };

  const dateHandling = (data: ReturnReadyCheroot[]) => {
    data.forEach((item) => {
      const itemdate = new Date(item.date);
      const exit = dates.find((d) => d === itemdate.toLocaleDateString());
      if (!exit) {
        dates.push(itemdate.toLocaleDateString());
      }
    });
  };

  if (
    !concernAgent.length ||
    !concernCheroot.length ||
    !concernReturnCheroots.length
  )
    return null;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          ကိုယ်စားလှယ်နေ့စဉ်ဆေးလိပ်အဝင်စာရင်း
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

        <Box sx={{ width: "80%", margin: "0 auto" }}>
          <table border={1} className="table">
            <tr>
              <th style={{ width: 150, backgroundColor: "#FFF9D0" }}>
                အမျိုးအစား
              </th>
              {concernCheroot.map((l) => {
                return (
                  <th
                    key={l.id}
                    style={{ width: 150, backgroundColor: "#FFEEA9" }}
                  >
                    {l.name}
                  </th>
                );
              })}
              <th style={{ width: 150, backgroundColor: "#FFEEA9" }}>
                သင့်ငွေ
              </th>
            </tr>

            <tr>
              <th style={{ backgroundColor: "#FFF9D0" }}>အချောနှုန်း</th>
              {concernCheroot.map((l) => {
                return (
                  <th key={l.id} style={{ backgroundColor: "#DBB5B5" }}>
                    {l.price}
                  </th>
                );
              })}
              <th style={{ backgroundColor: "#DBB5B5" }}></th>
            </tr>

            {dates.map((item) => {
              const exit = concernData.find(
                (c) => new Date(c.date).toLocaleDateString() == item
              );
              if (!exit) return null;
              const itemdate = new Date(exit.date);
              return (
                <tr key={item}>
                  <td style={{ textAlign: "center", height: 25 }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  {concernCheroot.map((i) => {
                    return (
                      <>
                        <td style={{ textAlign: "center" }} key={i.id}>
                          {
                            concernData.find(
                              (c) =>
                                c.typeOfCherootId === i.id &&
                                new Date(c.date).toLocaleDateString() === item
                            )?.goodQty
                          }
                        </td>
                      </>
                    );
                  })}
                  <td style={{ textAlign: "center" }}>
                    {concernData
                      .filter(
                        (data) =>
                          new Date(data.date).toLocaleDateString() === item
                      )
                      .reduce((total, d) => {
                        return (total += d.amount);
                      }, 0)}
                  </td>
                </tr>
              );
            })}

            <tr>
              <th style={{ backgroundColor: "#FFDB5C" }}>
                {concernData.reduce((total, d) => {
                  return (total += d.goodQty);
                }, 0)}
              </th>
              {concernCheroot.map((item) => {
                return (
                  <th style={{ backgroundColor: "#FFDB5C" }} key={item.id}>
                    {concernData
                      .filter((data) => data.typeOfCherootId === item.id)
                      .reduce((total, d) => {
                        return (total += d.goodQty);
                      }, 0)}
                  </th>
                );
              })}
              <th style={{ backgroundColor: "#FFDB5C" }}>
                {concernData.reduce((total, d) => {
                  return (total += d.amount);
                }, 0)}
              </th>
            </tr>
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default DailyCherootData;
