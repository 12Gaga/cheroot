import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { AgentRemainCash, OtherDeduction } from "@prisma/client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const MonthlyCashAdvanceReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const otherDeduction = useAppSelector((store) => store.otherDeduction.item);
  const concernOtherDeduction = otherDeduction.filter(
    (item) => item.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item);
  const [exitData, setExitData] = useState<AgentRemainCash[]>([]);
  const [concernRemainCash, setConcernRemainCash] = useState<AgentRemainCash[]>(
    []
  );
  const remainCash = useAppSelector(
    (store) => store.agentReaminCash.item
  ).filter((rc) => rc.workShopId === workShopId);
  const [concernData, setConcernData] = useState<OtherDeduction[]>([]);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [agentId, setAgentId] = useState<number[]>([]);
  let no = 0;
  const handelAgent = (data: OtherDeduction[]) => {
    data.forEach((item) => {
      const exit = agentId.find((a) => item.agentId === a);
      if (!exit) {
        agentId.push(item.agentId);
      }
    });
  };

  const handelDate = (date: Date) => {
    const exit = remainCash.filter((item) => {
      return new Date(item.date).getTime() < date.getTime();
    });
    console.log("exit", exit);
    if (exit.length) {
      setExitData(exit);
    } else {
      setExitData([]);
    }

    const dataone = remainCash.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear()
    );

    const dateData = concernOtherDeduction.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear()
    );
    setConcernData(dateData);
    setConcernRemainCash(dataone);
    handelAgent(dateData);
  };

  useEffect(() => {
    if (remainCash.length) {
      const exit = remainCash.filter((item) => {
        const month = selecteddate.getMonth();
        const year = selecteddate.getFullYear();
        const dd = new Date(`${year},${month + 1},1`);
        return new Date(item.date).getTime() < dd.getTime();
      });
      console.log("exit", exit);
      if (exit.length) {
        setExitData(exit);
      } else {
        setExitData([]);
      }

      const dataone = remainCash.filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear()
      );

      const dateData = concernOtherDeduction.filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear()
      );
      setConcernData(dateData);
      setConcernRemainCash(dataone);
      handelAgent(dateData);
    }
  }, [otherDeduction]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          ကိုယ်စားလှယ်ကြိုယူငွေလက်ကျန်ရှင်းတမ်း (လချုပ်)
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
              <th rowSpan={2} style={{ width: 40, backgroundColor: "#FFE0B5" }}>
                စဉ်
              </th>
              <th
                rowSpan={2}
                style={{ width: 150, backgroundColor: "#FFE0B5" }}
              >
                ကိုယ်စားလှယ်အမည်
              </th>
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
                ကြိုယူ -ခုနှိမ်ငွေ
              </th>
              <th
                colSpan={2}
                style={{ width: 300, backgroundColor: "#FFE0B5" }}
              >
                ကြိုယူငွေလက်ကျန်
              </th>
            </tr>

            <tr>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အကြီး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အသေး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အကြီး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အသေး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အကြီး)</th>
              <th style={{ backgroundColor: "#DBB5B5" }}>(အသေး)</th>
            </tr>
            {agentId.map((item) => {
              const exit = concernData.find((c) => c.agentId === item);
              if (!exit) return null;
              const findLastData = exitData.filter((i) => i.agentId === item);
              const lastDatum =
                findLastData.length && findLastData[findLastData.length - 1];

              const findLast = concernRemainCash.filter(
                (i) => i.agentId === item
              );
              const last = findLast.length && findLast[0];

              const findConcernLastData = concernData.filter(
                (a) => a.agentId === item
              );

              const concernLastDatum =
                findConcernLastData.length &&
                findConcernLastData[findConcernLastData.length - 1];
              no += 1;
              return (
                <tr key={item}>
                  <th style={{ height: 30 }}>{no}</th>
                  <td
                    style={{
                      color: "#10439F",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {agents.find((a) => a.id === item)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {lastDatum
                      ? lastDatum.remainCashBig
                      : last &&
                        last.remainCashBig +
                          findConcernLastData.reduce((total, concern) => {
                            return (total += concern.cashAdvanceBig);
                          }, 0)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {lastDatum
                      ? lastDatum.remainCashSmall
                      : last &&
                        last.remainCashSmall +
                          findConcernLastData.reduce((total, concern) => {
                            return (total += concern.cashAdvanceSmall);
                          }, 0)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {findConcernLastData.reduce((total, c) => {
                      return (total += c.cashAdvanceBigDeduction);
                    }, 0)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {findConcernLastData.reduce((total, c) => {
                      return (total += c.cashAdvanceSmallDeduction);
                    }, 0)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {concernLastDatum ? concernLastDatum.remainCashBig : 0}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {concernLastDatum ? concernLastDatum.remainCashSmall : 0}
                  </td>
                </tr>
              );
            })}
            <tr>
              <th style={{ height: 25 }}></th>
              <th></th>
              <th style={{ backgroundColor: "#FFDB5C" }}>
                {agentId
                  .map((item) => {
                    const exit = concernData.find((c) => c.agentId === item);
                    if (!exit) return null;
                    const findLastData = exitData.filter(
                      (i) => i.agentId === item
                    );
                    const lastDatum =
                      findLastData.length &&
                      findLastData[findLastData.length - 1];

                    const findLast = concernRemainCash.filter(
                      (i) => i.agentId === item
                    );
                    const last = findLast.length && findLast[0];

                    const findConcernLastData = concernData.filter(
                      (a) => a.agentId === item
                    );

                    return lastDatum
                      ? lastDatum.remainCashBig
                      : ((last &&
                          last.remainCashBig +
                            findConcernLastData.reduce((total, concern) => {
                              return (total += concern.cashAdvanceBig);
                            }, 0)) as number);
                  })
                  .reduce((tol: number, c) => {
                    return (tol += c as number);
                  }, 0)}
              </th>
              <th style={{ backgroundColor: "#FFDB5C" }}>
                {agentId
                  .map((item) => {
                    const exit = concernData.find((c) => c.agentId === item);
                    if (!exit) return null;
                    const findLastData = exitData.filter(
                      (i) => i.agentId === item
                    );
                    const lastDatum =
                      findLastData.length &&
                      findLastData[findLastData.length - 1];

                    const findLast = concernRemainCash.filter(
                      (i) => i.agentId === item
                    );
                    const last = findLast.length && findLast[0];

                    const findConcernLastData = concernData.filter(
                      (a) => a.agentId === item
                    );

                    return lastDatum
                      ? lastDatum.remainCashSmall
                      : ((last &&
                          last.remainCashSmall +
                            findConcernLastData.reduce((total, concern) => {
                              return (total += concern.cashAdvanceSmall);
                            }, 0)) as number);
                  })
                  .reduce((tol: number, c) => {
                    return (tol += c as number);
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
                {agentId
                  .map((item) => {
                    const exit = concernData.find((c) => c.agentId === item);
                    if (!exit) return null;
                    const findConcernLastData = concernRemainCash.filter(
                      (a) => a.agentId === item
                    );
                    const concernLastDatum =
                      findConcernLastData.length &&
                      findConcernLastData[findConcernLastData.length - 1];
                    return concernLastDatum
                      ? concernLastDatum.remainCashBig
                      : 0;
                  })
                  .reduce((total: number, c) => {
                    return (total += c as number);
                  }, 0)}
              </th>
              <th style={{ backgroundColor: "#FFDB5C" }}>
                {agentId
                  .map((item) => {
                    const exit = concernData.find((c) => c.agentId === item);
                    if (!exit) return null;
                    const findConcernLastData = concernRemainCash.filter(
                      (a) => a.agentId === item
                    );
                    const concernLastDatum =
                      findConcernLastData.length &&
                      findConcernLastData[findConcernLastData.length - 1];
                    return concernLastDatum
                      ? concernLastDatum.remainCashSmall
                      : 0;
                  })
                  .reduce((total: number, c) => {
                    return (total += c as number);
                  }, 0)}
              </th>
            </tr>
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default MonthlyCashAdvanceReport;
