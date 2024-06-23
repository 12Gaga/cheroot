import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import { Typography, Box } from "@mui/material";
import { AgentRemineLeaf, PayLeaf, LeafDeduction } from "@prisma/client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const MonthlyLeafData = () => {
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
  const leaves = useAppSelector((store) => store.typeOfLeaf.item)
    .filter((l) => l.workShopId === workShopId)
    .sort((a, b) => a.id - b.id);
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
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [agentId, setAgentId] = useState<number[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  let no = 0;
  const handelAgent = (data: AgentRemineLeaf[]) => {
    data.forEach((item) => {
      const exit = agentId.find((a) => item.agentId === a);
      if (!exit) {
        agentId.push(item.agentId);
      }
    });
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
  const handelDate = (date: Date) => {
    const exit = remainleaf.filter((item) => {
      return new Date(item.date).getTime() < date.getTime();
    });
    console.log("exit", exit);
    if (exit.length) {
      setExitData(exit);
    } else {
      setExitData([]);
    }

    const dateData = remainleaf.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear()
    );
    const datatwo = payLeaf.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear()
    );

    const datathree = leafDeduction.filter(
      (item) =>
        new Date(item.date).getMonth() === date.getMonth() &&
        new Date(item.date).getFullYear() === date.getFullYear()
    );
    setConcernRemainLeaf(dateData);
    setConcernPayLeaf(datatwo);
    setConcernLeafDeduct(datathree);
    handelAgent(dateData);
    filterDates(dateData);
  };

  useEffect(() => {
    if (remainleaf.length) {
      const exit = remainleaf.filter((item) => {
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

      const dateData = remainleaf.filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear()
      );
      const datatwo = payLeaf.filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear()
      );

      const datathree = leafDeduction.filter(
        (item) =>
          new Date(item.date).getMonth() === selecteddate.getMonth() &&
          new Date(item.date).getFullYear() === selecteddate.getFullYear()
      );
      setConcernRemainLeaf(dateData);
      setConcernPayLeaf(datatwo);
      setConcernLeafDeduct(datathree);
      handelAgent(dateData);
      filterDates(dateData);
    }
  }, [remainleaf]);
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

        <Box>
          <table border={1} className="table">
            <tr>
              <th rowSpan={3} style={{ width: 40 }}>
                စဉ်
              </th>
              <th rowSpan={3} style={{ width: 100 }}>
                ကိုယ်စားလှယ်
              </th>
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

            {agentId.map((item) => {
              const exit = concernRemainLeaf.find((c) => c.agentId === item);
              if (!exit) return null;
              no += 1;
              return (
                <tr key={item}>
                  <td style={{ textAlign: "center" }}>{no}</td>
                  <td>{agents.find((a) => a.id === item)?.name}</td>

                  {leaves.map((l) => {
                    const findRemainData = concernRemainLeaf.filter(
                      (rd) => rd.leafId === l.id && rd.agentId === item
                    );

                    let data;
                    if (exitData.length) {
                      const findData = exitData.filter(
                        (d) => d.leafId === l.id && d.agentId === item
                      );
                      data =
                        findData.length && findData[findData.length - 1].Viss;
                    } else {
                      const findData = concernRemainLeaf.filter(
                        (d) => d.leafId === l.id && d.agentId === item
                      );
                      data = findData.length && findData[0].Viss;
                    }

                    const findPayData = dates
                      .map((d) => {
                        const datum = concernPayLeaf.filter(
                          (pl) =>
                            new Date(pl.date).toLocaleDateString() ===
                              d.toLocaleDateString() &&
                            pl.typeOfLeafId === l.id &&
                            pl.agentId === item
                        );
                        return datum.length
                          ? datum[datum.length - 1].netViss
                          : 0;
                      })
                      .reduce((tol, value) => {
                        return (tol += value);
                      }, 0);

                    const findDeductData = concernLeafDeduct
                      .filter(
                        (ld) => ld.typeOfLeafId === l.id && ld.agentId === item
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
                          {findPayData + data}
                        </td>
                        <td key={l.id} style={{ textAlign: "center" }}>
                          {findDeductData}
                        </td>
                        <td style={{ textAlign: "center" }} key={l.id}>
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
              <td colSpan={2}></td>
              {leaves.map((l) => {
                const dataPay = agentId
                  .map((item) => {
                    return dates
                      .map((d) => {
                        const datum = concernPayLeaf.filter(
                          (pl) =>
                            new Date(pl.date).toLocaleDateString() ===
                              d.toLocaleDateString() &&
                            pl.typeOfLeafId === l.id &&
                            pl.agentId === item
                        );
                        return datum.length
                          ? datum[datum.length - 1].netViss
                          : 0;
                      })
                      .reduce((tol, value) => {
                        return (tol += value);
                      }, 0);
                  })
                  .reduce((tol, viss) => {
                    return (tol += viss);
                  }, 0);

                const dataPaytwo =
                  agentId.length &&
                  agentId
                    .map((a) => {
                      if (exitData.length) {
                        const findData = exitData.filter(
                          (d) => d.leafId === l.id && d.agentId === a
                        );
                        return findData.length
                          ? findData[findData.length - 1].Viss
                          : 0;
                      } else {
                        const findData = concernRemainLeaf.filter(
                          (d) => d.leafId === l.id && d.agentId === a
                        );
                        return findData.length ? findData[0].Viss : 0;
                      }
                    })
                    .reduce((tol, val) => {
                      return (tol += val);
                    });

                const dataLeafDeduct = concernLeafDeduct
                  .filter((ld) => ld.typeOfLeafId === l.id)
                  .reduce((tol, leaf) => {
                    return (tol += leaf.deductViss);
                  }, 0);

                const remainData = agentId
                  .map((a) => {
                    const data = concernRemainLeaf.filter(
                      (rd) => rd.leafId === l.id && rd.agentId === a
                    );
                    return data.length ? data[data.length - 1].Viss : 0;
                  })
                  .reduce((tol, val) => {
                    return (tol += val);
                  }, 0);
                return (
                  <>
                    <th key={l.id} style={{ backgroundColor: "#FFDB5C" }}>
                      {dataPay + dataPaytwo}
                    </th>
                    <th key={l.id} style={{ backgroundColor: "#FFDB5C" }}>
                      {dataLeafDeduct}
                    </th>
                    <th key={l.id} style={{ backgroundColor: "#FFDB5C" }}>
                      {remainData}
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
export default MonthlyLeafData;
