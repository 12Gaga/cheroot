import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import AdminLayout from "@/components/adminLayout";
import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Leaf, LeafTransferGarage, PayLeaf } from "@prisma/client";
const LeafDateReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter((l) => l.workShopId === workShopId);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const leafStock = useAppSelector((store) => store.leafStock.item);
  const leafGarageTransfer = useAppSelector((store) => store.leafTransfer.item);
  const payLeaf = useAppSelector((store) => store.payLeaf.item);
  const [garage, setGarage] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [concernLeafStock, setLeafStock] = useState<Leaf[]>([]);
  const [concernPayLeaf, setPayLeaf] = useState<PayLeaf[]>([]);
  const [concernLeafTransfer, setLeafTransfer] = useState<LeafTransferGarage[]>(
    []
  );
  const handleGarage = (garageId: number) => {
    const dataone = leafStock.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datatwo = leafGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datathree = payLeaf.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    setLeafStock(dataone);
    setLeafTransfer(datatwo);
    setPayLeaf(datathree);
    setGarage(garageId);
  };

  const handleStartDate = (start: Date) => {
    const dataone = leafStock.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datatwo = leafGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datathree = payLeaf.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    setLeafStock(dataone);
    setLeafTransfer(datatwo);
    setPayLeaf(datathree);
    setStartDate(start);
  };

  const handleEndDate = (end: Date) => {
    const dataone = leafStock.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datatwo = leafGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datathree = payLeaf.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    setLeafStock(dataone);
    setLeafTransfer(datatwo);
    setPayLeaf(datathree);
    setEndDate(end);
  };

  console.log("leafStock", concernLeafStock);
  console.log("leafTransfer", concernLeafTransfer);
  console.log("payLeaf", concernPayLeaf);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဖက်လက်ကျန်စာရင်း
        </Typography>
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>
              စသောရက်စွဲ
            </Typography>
            <DatePicker
              selected={startDate}
              onChange={(date) => handleStartDate(date as Date)}
            />
          </Box>
          <Box>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>
              ဆုံးသောရက်စွဲ
            </Typography>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleEndDate(date as Date)}
            />
          </Box>
        </Box>

        <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 100 }}>
            ဂိုထောင်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={garage}
              onChange={(evt) => {
                handleGarage(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernGarages.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around", mb: 4 }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ဖက်သွင်းစာရင်း
            </Typography>
            <table border={1} className="table">
              <tr>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ဖက်အမျိုးအစား
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ပိုလုံးရေ
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ပိသာပေါင်း
                </th>
              </tr>
              {garage &&
                concernLeaves.map((item) => {
                  const concern = concernLeafStock.filter(
                    (l) => l.typeOfLeafId === item.id
                  );
                  const total = concern.reduce((tol, c) => {
                    return (tol += c.viss);
                  }, 0);
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center" }}>{item.name}</td>
                      <td style={{ textAlign: "center" }}>{concern.length}</td>
                      <td style={{ textAlign: "center" }}>{total}</td>
                    </tr>
                  );
                })}
            </table>
          </Box>
          <Box sx={{ ml: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ဖက်ထုတ်စာရင်း
            </Typography>
            <table border={1} className="table">
              <tr>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ဖက်အမျိုးအစား
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ပိုလုံးရေ
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ပိသာပေါင်း
                </th>
              </tr>
              {garage &&
                concernLeaves.map((item) => {
                  const concern = concernPayLeaf.filter(
                    (pl) => pl.typeOfLeafId === item.id
                  );
                  const total = concern.reduce((tol, pay) => {
                    return (tol += pay.viss);
                  }, 0);
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center" }}>{item.name}</td>
                      <td style={{ textAlign: "center" }}>{concern.length}</td>
                      <td style={{ textAlign: "center" }}>{total}</td>
                    </tr>
                  );
                })}
            </table>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ဖက်ထုတ်စာရင်း
            </Typography>
            <table border={1} className="table">
              <tr>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ဖက်အမျိုးအစား
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ပိုလုံးရေ
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ပိသာပေါင်း
                </th>
              </tr>
              {garage &&
                concernLeaves.map((item) => {
                  const findConcern = concernLeafTransfer.filter(
                    (pl) => pl.typeOfLeafId === item.id
                  );
                  const concernBatch = findConcern.map((tl) => tl.batchNo);

                  const total = leafStock
                    .filter(
                      (l) =>
                        l.typeOfLeafId === item.id &&
                        concernBatch.includes(l.batchNo)
                    )
                    .reduce((tol, l) => {
                      return (tol += l.viss);
                    }, 0);

                  console.log("total", total);
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center" }}>{item.name}</td>
                      <td style={{ textAlign: "center" }}>
                        {concernBatch.length}
                      </td>
                      <td style={{ textAlign: "center" }}>{total}</td>
                    </tr>
                  );
                })}
            </table>
          </Box>

          <Box sx={{ ml: 5 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ကျန်ရှိစာရင်း
            </Typography>
            <table border={1} className="table">
              <tr>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ဖက်အမျိုးအစား
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ကျန်ရှိပိုနံပါတ်
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ကျန်ရှိပိသာ
                </th>
              </tr>

              {garage &&
                concernLeaves.map((item) => {
                  const leafStockData = leafStock
                    .filter((l) => {
                      const ldate = new Date(l.date);
                      return (
                        l.typeOfLeafId === item.id &&
                        l.garageId === garage &&
                        ldate.getTime() <= endDate.getTime() + 24
                      );
                    })
                    .reduce((total, leaf) => {
                      return (total += leaf.viss);
                    }, 0);
                  console.log("data", leafStockData);
                  const findLeafTransferData = leafGarageTransfer.filter(
                    (gl) => {
                      const ldate = new Date(gl.date);
                      return (
                        gl.exitGarageId === garage &&
                        gl.typeOfLeafId === item.id &&
                        ldate.getTime() <= endDate.getTime() + 24
                      );
                    }
                  );

                  const findbatchNo = findLeafTransferData.map(
                    (fd) => fd.batchNo
                  );
                  const leafTransferData = leafStock
                    .filter((l) => {
                      const ldate = new Date(l.date);
                      return (
                        l.typeOfLeafId === item.id &&
                        l.garageId === garage &&
                        findbatchNo.includes(l.batchNo) &&
                        ldate.getTime() <= endDate.getTime() + 24
                      );
                    })
                    .reduce((total, leaf) => {
                      return (total += leaf.viss);
                    }, 0);
                  console.log("data2", leafTransferData);
                  const findBatchs = leafStock
                    .filter((l) => {
                      const ldate = new Date(l.date);
                      return (
                        l.typeOfLeafId === item.id &&
                        l.garageId === garage &&
                        !findbatchNo.includes(l.batchNo) &&
                        ldate.getTime() <= endDate.getTime() + 24
                      );
                    })
                    .map((lb) => lb.batchNo);
                  const findPayleaf = payLeaf.filter((p) => {
                    const pdate = new Date(p.date);
                    return (
                      p.typeOfLeafId === item.id &&
                      p.garageId === garage &&
                      pdate.getTime() <= endDate.getTime() + 24
                    );
                  });
                  const payLeafData = findPayleaf.reduce((tol, pl) => {
                    return (tol += pl.viss);
                  }, 0);
                  const paybatchs = findPayleaf.map((p) => p.batchNo);
                  const lastBatchs = findBatchs.filter(
                    (pb) => !paybatchs.includes(pb)
                  );
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center", height: 30 }}>
                        {item.name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {lastBatchs.length}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {leafStockData - (leafTransferData + payLeafData)}
                      </td>
                    </tr>
                  );
                })}
            </table>
          </Box>
        </Box>
      </AdminLayout>
    </>
  );
};
export default LeafDateReport;
