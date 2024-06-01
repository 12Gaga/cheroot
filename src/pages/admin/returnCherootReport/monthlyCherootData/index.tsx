import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { ReturnReadyCheroot } from "@prisma/client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthlyData = () => {
  const workShopId = useAppSelector(
    (store) => store.workShop.selectedWorkShop
  )?.id;
  const cherooots = useAppSelector((store) => store.typeOfCheroot.item);
  const concernCheroot = cherooots.filter(
    (item) => item.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item);
  const concernAgent = agents.filter((item) => item.workShopId === workShopId);
  const returnCheroot = useAppSelector((store) => store.returnCheroot.item);
  const concernReturnCheroot = returnCheroot.filter(
    (item) => item.workShopId === workShopId
  );
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [concernData, setConcernData] = useState<ReturnReadyCheroot[]>([]);
  const [agentId, setAgentId] = useState<number[]>([]);
  let no = 0;

  const handelAgent = (data: ReturnReadyCheroot[]) => {
    data.forEach((item) => {
      const exit = agentId.find((a) => item.agentId === a);
      if (!exit) {
        agentId.push(item.agentId);
      }
    });
  };

  const handelDate = (date: Date) => {
    const dateData = concernReturnCheroot.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear()
    );
    setConcernData(dateData);
    handelAgent(dateData);
  };

  useEffect(() => {
    if (concernReturnCheroot.length) {
      const dateData = concernReturnCheroot.filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear()
      );
      setConcernData(dateData);
      handelAgent(dateData);
    }
  }, [returnCheroot]);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          ဆေးလိပ်အဝင် လချုပ် စာရင်း
        </Typography>

        <Box sx={{ ml: 5, display: "flex", mt: 4, width: 300, mb: 5 }}>
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

        <Box sx={{ width: "80%", margin: "0 auto" }}>
          <table border={1} className="table">
            <tr>
              <th style={{ width: 30 }}>စဉ်</th>
              <th style={{ width: 150 }}>ကိုယ်စားလှယ်</th>
              <th style={{ width: 150 }}>စုစုပေါင်း</th>
              {concernCheroot.map((item) => {
                return (
                  <th
                    key={item.id}
                    style={{ width: 150, backgroundColor: "#FFE0B5" }}
                  >
                    {item.name}
                  </th>
                );
              })}
            </tr>
            {agentId.map((item) => {
              const exit = concernData.find((c) => c.agentId === item);
              if (!exit) return null;
              no += 1;
              return (
                <tr key={item}>
                  <th style={{ height: 25 }}>{no}</th>
                  <td
                    style={{
                      color: "#10439F",
                      fontWeight: "bold",
                      fontSize: 17,
                    }}
                  >
                    {concernAgent.find((a) => a.id === item)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {concernData
                      .filter((c) => c.agentId === item)
                      .reduce((total, cheroot) => {
                        return (total += cheroot.goodQty);
                      }, 0)}
                  </td>
                  {concernCheroot.map((cheroot) => {
                    return (
                      <td key={cheroot.id} style={{ textAlign: "center" }}>
                        {concernData
                          .filter(
                            (c) =>
                              c.typeOfCherootId === cheroot.id &&
                              c.agentId === item
                          )
                          .reduce((total, c) => {
                            return (total += c.goodQty);
                          }, 0)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              <th style={{ backgroundColor: "#FFC100" }}></th>
              <th style={{ backgroundColor: "#FFC100" }}></th>
              <th style={{ backgroundColor: "#FFC100" }}>
                {concernData.reduce((total, c) => {
                  return (total += c.goodQty);
                }, 0)}
              </th>
              {concernCheroot.map((item) => {
                return (
                  <th style={{ backgroundColor: "#FFC100" }} key={item.id}>
                    {concernData
                      .filter((c) => c.typeOfCherootId === item.id)
                      .reduce((total, cheroot) => {
                        return (total += cheroot.goodQty);
                      }, 0)}
                  </th>
                );
              })}
            </tr>
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default MonthlyData;
