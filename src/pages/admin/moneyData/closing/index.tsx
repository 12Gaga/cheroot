import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import AdminLayout from "@/components/adminLayout";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { addClosing } from "@/types/closingType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import DailyClosingData from "@/components/money/closingDay";
import MainClosingData from "@/components/money/closingMain";
import { LoadingButton } from "@mui/lab";
import { AddClosing, setIsLoading } from "@/store/slices/closing";
import { setOpenSnackbar } from "@/store/slices/snackBar";

const defaultValue: addClosing = {
  date: null,
  cashBalance: 0,
  replenishment: 0,
  dailyBalance: 0,
  dailyClosing: 0,
  directPayment: 0,
  mainBalance: 0,
  mainClosing: 0,
  payCheroot: 0,
};

const Closing = () => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const workShopId = useAppSelector(
    (store) => store.workShop.selectedWorkShop
  )?.id;
  const [closing, setclosing] = useState<addClosing>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.closing);
  const dispatch = useAppDispatch();
  const payCheroot = useAppSelector(
    (store) => store.otherDeduction.item
  ).filter((item) => item.workShopId === workShopId);
  const dailyExpensive = useAppSelector(
    (store) => store.dailyExpensive.item
  ).filter((item) => item.workShopId === workShopId);
  const cashBalance = useAppSelector((store) => store.dailyClosing.item).filter(
    (item) => item.workShopId === workShopId
  );
  const replenishment = useAppSelector(
    (store) => store.replenishment.item
  ).filter((item) => item.workShopId === workShopId);
  const totalDailyExpensive = dailyExpensive
    .filter((item) => {
      const itemdate = new Date(item.date);
      return (
        itemdate.toLocaleDateString() === selecteddate.toLocaleDateString()
      );
    })
    .reduce((total, daily) => {
      return (total += daily.amount);
    }, 0);
  const tolalPayCheroot = payCheroot
    .filter((item) => {
      const itemdate = new Date(item.date);
      return (
        itemdate.toLocaleDateString() === selecteddate.toLocaleDateString()
      );
    })
    .reduce((total, pay) => {
      return (total += pay.totalNetAgentPayment);
    }, 0);
  const tolCashBalance =
    cashBalance.length && cashBalance[cashBalance.length - 1].amount;

  const tolReplenishment = replenishment
    .filter((item) => {
      const itemdate = new Date(item.date);
      return (
        itemdate.toLocaleDateString() === selecteddate.toLocaleDateString()
      );
    })
    .reduce((total, reple) => {
      return (total += reple.amount);
    }, 0);

  const closingDay =
    tolCashBalance + tolReplenishment - (totalDailyExpensive + tolalPayCheroot);

  const mainBalance = useAppSelector((store) => store.mainMoney.item).filter(
    (item) => item.workShopId === workShopId
  );
  const totalMainBalance = mainBalance
    .filter((item) => {
      const itemdate = new Date(item.date);
      return (
        itemdate.toLocaleDateString() === selecteddate.toLocaleDateString()
      );
    })
    .reduce((total, main) => {
      return (total += main.amount);
    }, 0);

  const mainClosing = useAppSelector((store) => store.mainClosing.item).filter(
    (item) => item.workShopId === workShopId
  );
  const tolMainClosing =
    mainClosing.length && mainClosing[mainClosing.length - 1].amount;
  console.log("main", mainClosing);

  const directPayment = useAppSelector(
    (store) => store.directPayment.item
  ).filter((item) => {
    const itemdate = new Date(item.date);
    return itemdate.toLocaleDateString() === selecteddate.toLocaleDateString();
  });
  const tolDirectPayment = directPayment
    .filter((item) => {
      const itemdate = new Date(item.date);
      return (
        itemdate.toLocaleDateString() === selecteddate.toLocaleDateString()
      );
    })
    .reduce((total, direct) => {
      return (total += direct.amount);
    }, 0);

  const closingMain =
    totalMainBalance + tolMainClosing - (tolReplenishment + tolDirectPayment);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddClosing({
        ...closing,
        onSuccess: () => {
          const today = new Date();
          const nextDay = today.setHours(today.getHours() + 24);
          setSelectedDate(new Date(nextDay));
          dispatch(setOpenSnackbar({ message: "Saving complete" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setclosing({
      ...closing,
      date: selecteddate,
    });
  }, [selecteddate]);

  useEffect(() => {
    setclosing({
      ...closing,
      date: selecteddate,
      cashBalance: tolCashBalance,
      replenishment: tolReplenishment,
      dailyBalance: totalDailyExpensive,
      dailyClosing: closingDay,
      directPayment: tolDirectPayment,
      mainBalance: totalMainBalance + tolMainClosing,
      mainClosing: closingMain,
      payCheroot: tolalPayCheroot,
    });
  }, [closingMain, workShopId]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          စာရင်းပိတ်ခြင်း
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mr: 2,
          }}
        >
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => setSelectedDate(date as Date)}
          />
        </Box>

        <Box sx={{ display: "flex", mt: 3 }}>
          <Box sx={{ width: "50%" }}>
            <Typography sx={{ mr: 2, fontWeight: "bold", textAlign: "center" }}>
              နေ့စဉ်လက်ကျန်ငွေ
            </Typography>
            <DailyClosingData closing={closing} setClosing={setclosing} />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography sx={{ mr: 2, fontWeight: "bold", textAlign: "center" }}>
              ပင်မလက်ကျန်ငွေ
            </Typography>
            <MainClosingData closing={closing} setClosing={setclosing} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 10 }}>
          <LoadingButton
            variant="contained"
            onClick={handleClick}
            loading={isLoading}
          >
            စာရင်းပိတ်ခြင်း
          </LoadingButton>
        </Box>
      </AdminLayout>
    </>
  );
};
export default Closing;
