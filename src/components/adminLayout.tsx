import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { WorkShop } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const opening = [
  { label: "ပိုနံပါတ်", url: "/admin/openingStock" },
  { label: "အဆီခံ (အရေအတွက်/အိတ်)", url: "/admin/openingStock/filterSize" },
  { label: "ဆေးစပ် (တင်း/ပြည်)", url: "/admin/openingStock/tabacco" },
  { label: "တံဆိပ် (လိပ်) ", url: "/admin/openingStock/label" },
];

const adding = [
  { label: "ပိုနံပါတ်", url: "/admin/addStock" },
  { label: "အဆီခံ (အရေအတွက်/အိတ်)", url: "/admin/addStock/addFilterSize" },
  { label: "ဆေးစပ် (တင်း/ပြည်)", url: "/admin/addStock/addTabacco" },
  { label: "တံဆိပ် (လိပ်) ", url: "/admin/addStock/addLabel" },
];

const asigning = [
  { label: "ဖက်အမျိုးအစား", url: "/admin/asignNamePrice" },
  { label: "အဆီခံအမျိုးအစား", url: "/admin/asignNamePrice/typeFilterSize" },
  { label: "ဆေးစပ်အမျိုးအစား", url: "/admin/asignNamePrice/typeTabacco" },
  { label: "တံဆိပ်အမျိုးအစား", url: "/admin/asignNamePrice/typeLabel" },
  { label: "ဆေးလိပ်အမျိုးအစား", url: "/admin/asignNamePrice/typeCheroot" },
  { label: "အလုပ်ရုံ", url: "/admin/asignNamePrice/workShop" },
  { label: "ဂိုထောင်", url: "/admin/asignNamePrice/garage" },
];

const moneyList = [
  { label: "ငွေစာရင်းခေါင်းစဉ်သတ်မှတ်ခြင်း", url: "/admin/moneyData" },
  { label: "နေ့စဉ်အသုံးစာရိတ်", url: "/admin/moneyData/dailyExpenses" },
  { label: "ပင်မငွေစာရင်း", url: "/admin/moneyData/mainMoney" },
  { label: "ဖြည့်တင်းငွေ", url: "/admin/moneyData/addMoney" },
  { label: "နေ့စဉ်လက်ကျန်ငွေ", url: "/admin/moneyData/closingBalance" },
  { label: "ပင်မလက်ကျန်ငွေ", url: "/admin/moneyData/mainClosingBalance" },
  {
    label: "ပင်မငွေစာရင်းမှတိုက်ရိုက်ထုတ်ယူခြင်း",
    url: "/admin/moneyData/directPayment",
  },
  { label: "စာရင်းပိတ်ခြင်း", url: "/admin/moneyData/closing" },
];

const garageList = [
  { label: "ပိုနံပါတ်", url: "/admin/garageTransfer" },
  {
    label: "အဆီခံ (အရေအတွက်/အိတ်)",
    url: "/admin/garageTransfer/transferFilterSize",
  },
  { label: "ဆေးစပ် (တင်း/ပြည်)", url: "/admin/garageTransfer/transferTabacco" },
  { label: "တံဆိပ် (လိပ်) ", url: "/admin/garageTransfer/transferLabel" },
];

const packing = [
  { label: "ပါကင်အမျိုးအစား", url: "/admin/packing" },
  { label: "ထုပ်ပိုးမှုအမျိုးအစား", url: "/admin/packing/packingForm" },
  { label: "ပါကင်စာရင်းထည့်ခြင်း", url: "/admin/packing/packingData" },
];

const transferring = [
  { label: "နေရာသတ်မှတ်ခြင်း", url: "/admin/transferCheroot" },
  {
    label: "ဆေးလိပ်ပို့စာရင်း",
    url: "/admin/transferCheroot/transferCherootData",
  },
];

const AdminLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const open = router.pathname.includes("openingStock");
  const add = router.pathname.includes("addStock");
  const asign = router.pathname.includes("asignNamePrice");
  const garage = router.pathname.includes("garageTransfer");
  const money = router.pathname.includes("moneyData");
  const pack = router.pathname.includes("packing");
  const transfer = router.pathname.includes("transferCheroot");
  const { selectedWorkShop } = useAppSelector((store) => store.workShop);
  const workShops = useAppSelector((store) => store.workShop.item);
  const work = workShops.find((item) => item.id === selectedWorkShop?.id);

  let data;
  if (open) {
    data = [...opening];
  } else if (add) {
    data = [...adding];
  } else if (asign) {
    data = [...asigning];
  } else if (garage) {
    data = [...garageList];
  } else if (money) {
    data = [...moneyList];
  } else if (pack) {
    data = [...packing];
  } else if (transfer) {
    data = [...transferring];
  }

  if (!session) return null;

  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 2,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {open && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ဂိုထောင်အဖွင့်ကုန်ကြမ်းစာရင်း
          </Typography>
        )}
        {add && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ကုန်ကြမ်းထပ်ဖြည့်ခြင်း
          </Typography>
        )}
        {asign && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ကုန်ကြမ်းအမည်သတ်မှတ်ခြင်းနှင့်ဈေးနှုန်းသတ်မှတ်ခြင်း
          </Typography>
        )}
        {garage && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ဂိုထောင်အကူးအပြောင်းစာရင်း
          </Typography>
        )}
        {money && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ငွေစာရင်း
          </Typography>
        )}
        {pack && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ပစ္စည်းပါကင်ထုပ်ခြင်း
          </Typography>
        )}
        {transfer && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ဆေးလိပ်ပို့ခြင်း
          </Typography>
        )}
        <Box>
          <Typography sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
            {work?.name}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", position: "relative", zIndex: 5, flex: 1 }}>
        <Box
          sx={{
            minWidth: 250,
            bgcolor: "#F7F79A",
            borderTopRightRadius: "20px",
            minHeight: "100vh",
          }}
        >
          <List sx={{ p: 0 }}>
            {data &&
              data.map((item) => (
                <Link
                  href={item.url}
                  key={item.label}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    disablePadding
                    sx={{ "&:hover": { backgroundColor: "yellow" } }}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={item.label}
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
          </List>
        </Box>
        <Box sx={{ px: 3, py: 2, width: "100%", height: "100%" }}>
          {children}
        </Box>
      </Box>
    </>
  );
};
export default AdminLayout;
