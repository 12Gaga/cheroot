import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  ExtraPurchase,
  FilterSize,
  FilterSizeTransferGarage,
  PayOtherItem,
} from "@prisma/client";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import filterSizeStock from "@/store/slices/filterSizeStock";
const FilterSizeDateReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSizes = filterSizes.filter(
    (l) => l.workShopId === workShopId
  );
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const filterSizeStocks = useAppSelector(
    (store) => store.filterSizeStock.item
  );
  const filterGarageTransfer = useAppSelector(
    (store) => store.filterSizeTransfer.item
  );
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  const [garage, setGarage] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [concernFilterSizeStock, setFilterSizeStock] = useState<FilterSize[]>(
    []
  );
  const [concernFilterTransferExit, setFilterTransferExit] = useState<
    FilterSizeTransferGarage[]
  >([]);
  const [concernFilterTransferEnter, setFilterTransferEnter] = useState<
    FilterSizeTransferGarage[]
  >([]);
  const [concernExtraPurchase, setExtraPurchase] = useState<ExtraPurchase[]>(
    []
  );
  const [concernPayOther, setPayOther] = useState<PayOtherItem[]>([]);

  const handleGarage = (garageId: number) => {
    const dataone = filterSizeStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datatwo = filterGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datathree = payOther.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datafour = extraPurchase.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datafive = filterGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    setFilterSizeStock(dataone);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setFilterTransferExit(datatwo);
    setFilterTransferEnter(datafive);
    setGarage(garageId);
  };

  const handleStartDate = (start: Date) => {
    const dataone = filterSizeStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datatwo = filterGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datathree = payOther.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datafour = extraPurchase.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datafive = filterGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    setFilterSizeStock(dataone);
    setFilterTransferExit(datatwo);
    setFilterTransferEnter(datafive);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setStartDate(start);
  };

  const handleEndDate = (end: Date) => {
    const dataone = filterSizeStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datatwo = filterGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datathree = payOther.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datafour = extraPurchase.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datafive = filterGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    setFilterSizeStock(dataone);
    setFilterTransferExit(datatwo);
    setFilterTransferEnter(datafive);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setEndDate(end);
  };

  console.log("filterStock", concernFilterSizeStock);
  console.log("filterTransferexit", concernFilterTransferExit);
  console.log("filterTransferenter", concernFilterTransferEnter);
  console.log("payOther", concernPayOther);
  console.log("extraPurchase", concernExtraPurchase);

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
              အဆီခံသွင်းစာရင်း
            </Typography>
            <table border={1} className="table">
              <tr>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  အဆီခံအမျိုးအစား
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  စုစုပေါင်းအရေအတွက်
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  အိတ်ပေါင်း
                </th>
              </tr>

              {garage &&
                concernFilterSizes.map((item) => {
                  const findData = concernFilterSizeStock.filter(
                    (f) => f.typeOfFilterSizeId === item.id
                  );
                  const findQty = findData.reduce((tol, fl) => {
                    return (tol += fl.quantity);
                  }, 0);
                  const findbag = findData.reduce((tol, fl) => {
                    return (tol += fl.bag);
                  }, 0);
                  const findEnterData = concernFilterTransferEnter.filter(
                    (f) => f.typeOfFilterSizeId === item.id
                  );
                  const findEnterQty = findEnterData.reduce((tol, fl) => {
                    return (tol += fl.quantity);
                  }, 0);
                  const findEnterbag = findEnterData.reduce((tol, fl) => {
                    return (tol += fl.bag);
                  }, 0);
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center" }}>{item.name}</td>
                      <td style={{ textAlign: "center" }}>
                        {findQty + findEnterQty}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {findbag + findEnterbag}
                      </td>
                    </tr>
                  );
                })}
            </table>
          </Box>
          <Box sx={{ ml: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              အဆီခံပေးစာရင်း
            </Typography>
            <table border={1} className="table">
              <tr>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  အဆီခံအမျိုးအစား
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  စုစုပေါင်းအရေအတွက်
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  အိတ်ပေါင်း
                </th>
              </tr>

              {garage &&
                concernFilterSizes.map((item) => {
                  const findPayData = concernPayOther.filter(
                    (f) => f.typeOfFilterSizeId === item.id
                  );
                  const findPayQty = findPayData.reduce((tol, fl) => {
                    return (tol += fl.filterSizeQty);
                  }, 0);
                  const findpaybag = findPayData.reduce((tol, fl) => {
                    return (tol += fl.filterSizeBag);
                  }, 0);
                  const findExtraData = concernExtraPurchase.filter(
                    (f) => f.typeOfFilterSizeId === item.id
                  );
                  const findExtraQty = findExtraData.reduce((tol, fl) => {
                    return (tol += fl.filterSizeQty);
                  }, 0);
                  const findExtrabag = findExtraData.reduce((tol, fl) => {
                    return (tol += fl.filterSizeBag);
                  }, 0);
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center" }}>{item.name}</td>
                      <td style={{ textAlign: "center" }}>
                        {findPayQty + findExtraQty}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {findpaybag + findExtrabag}
                      </td>
                    </tr>
                  );
                })}
            </table>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box sx={{ mr: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              အဆီခံဂိုထောင်ကူးပြောင်းစာရင်း
            </Typography>
            <table border={1} className="table">
              <tr>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  အဆီခံအမျိုးအစား
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  စုစုပေါင်းအရေအတွက်
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  အိတ်ပေါင်း
                </th>
              </tr>
              {garage &&
                concernFilterSizes.map((item) => {
                  const findData = concernFilterTransferExit.filter(
                    (f) => f.typeOfFilterSizeId === item.id
                  );
                  const findQty = findData.reduce((tol, fl) => {
                    return (tol += fl.quantity);
                  }, 0);
                  const findbag = findData.reduce((tol, fl) => {
                    return (tol += fl.bag);
                  }, 0);
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center" }}>{item.name}</td>
                      <td style={{ textAlign: "center" }}>{findQty}</td>
                      <td style={{ textAlign: "center" }}>{findbag}</td>
                    </tr>
                  );
                })}
            </table>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ကျန်ရှိစာရင်း
            </Typography>
            <table border={1} className="table">
              <tr>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  အဆီခံအမျိုးအစား
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ကျန်ရှိအရေအတွက်
                </th>
                <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                  ကျန်ရှိအိတ်
                </th>
              </tr>
              {garage &&
                concernFilterSizes.map((item) => {
                  const findFilterSizeData = filterSizeStocks.filter((f) => {
                    const fdate = new Date(f.date);
                    return (
                      f.typeOfFilterSizeId === item.id &&
                      f.garageId === garage &&
                      fdate.getTime() <= endDate.getTime() + 24
                    );
                  });
                  console.log("data", findFilterSizeData);
                  const filterSizeQty = findFilterSizeData.reduce(
                    (total, filter) => {
                      return (total += filter.quantity);
                    },
                    0
                  );
                  const filterSizeBag = findFilterSizeData.reduce(
                    (total, filter) => {
                      return (total += filter.bag);
                    },
                    0
                  );
                  //findFilterGarageTrnsfer(EnterGarage)
                  const findEnterFilter = filterGarageTransfer.filter((ef) => {
                    const fdate = new Date(ef.date);
                    return (
                      ef.typeOfFilterSizeId === item.id &&
                      ef.enterenceGarageId === garage &&
                      fdate.getTime() <= endDate.getTime() + 24
                    );
                  });
                  const enterFilterQty = findEnterFilter.reduce(
                    (total, filter) => {
                      return (total += filter.quantity);
                    },
                    0
                  );
                  const enterFilterBag = findEnterFilter.reduce(
                    (total, filter) => {
                      return (total += filter.bag);
                    },
                    0
                  );
                  //findFilterGarageTrnsfer(ExitGarage)
                  const findExitFilter = filterGarageTransfer.filter((ef) => {
                    const fdate = new Date(ef.date);
                    return (
                      ef.typeOfFilterSizeId === item.id &&
                      ef.exitGarageId === garage &&
                      fdate.getTime() <= endDate.getTime() + 24
                    );
                  });
                  const exitFilterQty = findExitFilter.reduce(
                    (total, filter) => {
                      return (total += filter.quantity);
                    },
                    0
                  );
                  const exitFilterBag = findExitFilter.reduce(
                    (total, filter) => {
                      return (total += filter.bag);
                    },
                    0
                  );
                  //find from payother
                  const findPayFilter = payOther.filter((ef) => {
                    const fdate = new Date(ef.date);
                    return (
                      ef.typeOfFilterSizeId === item.id &&
                      ef.garageId === garage &&
                      fdate.getTime() <= endDate.getTime() + 24
                    );
                  });
                  const payFilterQty = findPayFilter.reduce((total, filter) => {
                    return (total += filter.filterSizeQty);
                  }, 0);
                  const payFilterBag = findPayFilter.reduce((total, filter) => {
                    return (total += filter.filterSizeBag);
                  }, 0);
                  //find from extraPurchase
                  const findExtraFilter = extraPurchase.filter((ef) => {
                    const fdate = new Date(ef.date);
                    return (
                      ef.typeOfFilterSizeId === item.id &&
                      ef.garageId === garage &&
                      fdate.getTime() <= endDate.getTime() + 24
                    );
                  });
                  const extraFilterQty = findExtraFilter.reduce(
                    (total, filter) => {
                      return (total += filter.filterSizeQty);
                    },
                    0
                  );
                  const extraFilterBag = findExtraFilter.reduce(
                    (total, filter) => {
                      return (total += filter.filterSizeBag);
                    },
                    0
                  );
                  return (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center", height: 30 }}>
                        {item.name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {filterSizeQty +
                          enterFilterQty -
                          (exitFilterQty + payFilterQty + extraFilterQty)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {filterSizeBag +
                          enterFilterBag -
                          (exitFilterBag + payFilterBag + extraFilterBag)}
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
export default FilterSizeDateReport;
