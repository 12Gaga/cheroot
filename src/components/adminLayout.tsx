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
import HomeIcon from "@mui/icons-material/Home";
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
  { label: "ပလပ်စတစ်", url: "/admin/openingStock/plasticOp" },
];

const adding = [
  { label: "ပိုနံပါတ်", url: "/admin/addStock" },
  { label: "အဆီခံ (အရေအတွက်/အိတ်)", url: "/admin/addStock/addFilterSize" },
  { label: "ဆေးစပ် (တင်း/ပြည်)", url: "/admin/addStock/addTabacco" },
  { label: "တံဆိပ် (လိပ်) ", url: "/admin/addStock/addLabel" },
  { label: "ပလပ်စတစ် ", url: "/admin/addStock/addPlastic" },
];

const asigning = [
  { label: "ဖက်အမျိုးအစား", url: "/admin/asignNamePrice" },
  { label: "အဆီခံအမျိုးအစား", url: "/admin/asignNamePrice/typeFilterSize" },
  { label: "ဆေးစပ်အမျိုးအစား", url: "/admin/asignNamePrice/typeTabacco" },
  { label: "တံဆိပ်အမျိုးအစား", url: "/admin/asignNamePrice/typeLabel" },
  { label: "ဆေးလိပ်အမျိုးအစား", url: "/admin/asignNamePrice/typeCheroot" },
  { label: "ပလတ်စတစ်အမျိုးအစား", url: "/admin/asignNamePrice/plastic" },
  { label: "အလုပ်ရုံ", url: "/admin/asignNamePrice/workShop" },
  { label: "ဂိုထောင်", url: "/admin/asignNamePrice/garage" },
  { label: "ဆိုင်ခေါင်းစဉ်", url: "/admin/asignNamePrice/shopTitle" },
  { label: "ပစ္စည်းဝယ်ယူသည့်ဆိုင်အမည်", url: "/admin/asignNamePrice/shop" },
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
  {
    label: "ဆေးလိပ်တန်ဖိုးအရစ်ကျပေးချေခြင်း",
    url: "/admin/transferCheroot/cherootInstallment",
  },
];

const Taungyi = [
  { label: "သိုလှောင်ရုံ", url: "/admin/taungyi" },
  {
    label: "ပွဲရုံ",
    url: "/admin/taungyi/banquet",
  },
  {
    label: "သိုလှောင်ရုံပစ္စည်းစာရင်းထည့်ခြင်း",
    url: "/admin/taungyi/taungyiAddStock",
  },
  {
    label: "သိုလှောင်ရုံပစ္စည်းစာရင်းထုတ်ခြင်း",
    url: "/admin/taungyi/taungyiQuitStock",
  },
  {
    label: "ပစ္စည်းတန်ဖိုးအရစ်ကျစာရင်း",
    url: "/admin/taungyi/taungyiInstallment",
  },
  {
    label: "သိုလှောင်ရုံလက်ကျန်ပစ္စည်းစာရင်းစစ်ခြင်း",
    url: "/admin/taungyi/taungyiReport",
  },
];

const Bago = [
  { label: "ဖက်", url: "/admin/bago" },
  { label: "အစီခံ", url: "/admin/bago/bagoFilterSize" },
  { label: "တံဆိပ်", url: "/admin/bago/bagoLabel" },
  { label: "ပလပ်စတစ်", url: "/admin/bago/bagoPlastic" },
  {
    label: "ဖက်အရစ်ကျစာရင်း",
    url: "/admin/bago/bagoLeafInstallment",
  },
  {
    label: "အစီခံအရစ်ကျစာရင်း",
    url: "/admin/bago/bagoFilterSizeInstallment",
  },
  {
    label: "တံဆိပ်အရစ်ကျစာရင်း",
    url: "/admin/bago/bagoLabelInstallment",
  },
  {
    label: "ပလပ်စတစ်အရစ်ကျစာရင်း",
    url: "/admin/bago/bagoPlasticInstallment",
  },
];

const ReturnCherootReport = [
  {
    label: "ကိုယ်စားလှယ်နေ့စဉ်ဆေးလိပ်အဝင်စာရင်း",
    url: "/admin/returnCherootReport",
  },
  {
    label: "ဆေးလိပ်အဝင်လချုပ်စာရင်း",
    url: "/admin/returnCherootReport/monthlyCherootData",
  },
];

const CashAdvanceReport = [
  {
    label: "ကိုယ်စားလှယ်ကြိုယူငွေလက်ကျန်ရှင်းတမ်း",
    url: "/admin/cashAdvanceReport",
  },
  {
    label: "ကိုယ်စားလှယ်ကြိုယူငွေလက်ကျန်ရှင်းတမ်း(လချုပ်)",
    url: "/admin/cashAdvanceReport/monthlyCashAdvanceData",
  },
];

const LeafReport = [
  {
    label: "ကိုယ်စားလှယ်ဖက်စာရင်းရှင်းတမ်း",
    url: "/admin/leafReport",
  },
  {
    label: "ကိုယ်စားလှယ်ဖက်စာရင်းရှင်းတမ်း(လချုပ်)",
    url: "/admin/leafReport/monthlyLeafData",
  },
];

const GarageReport = [
  {
    label: "ဖက်လက်ကျန်စာရင်း",
    url: "/admin/garageReport",
  },
  {
    label: "အဆီခံလက်ကျန်စာရင်း",
    url: "/admin/garageReport/filterSizeData",
  },
  {
    label: "ဆေးစပ်လက်ကျန်စာရင်း",
    url: "/admin/garageReport/tabaccoData",
  },
  {
    label: "တံဆိပ်လက်ကျန်စာရင်း",
    url: "/admin/garageReport/labelData",
  },
  {
    label: "ပလပ်စတစ်လက်ကျန်စာရင်း",
    url: "/admin/garageReport/plasticData",
  },
  {
    label: "ရက်အလိုက်ဖက်လက်ကျန်စာရင်းစစ်ခြင်း",
    url: "/admin/garageReport/leafDateReport",
  },
  {
    label: "ရက်အလိုက်အဆီခံလက်ကျန်စာရင်းစစ်ခြင်း",
    url: "/admin/garageReport/filterSizeDateReport",
  },
  {
    label: "ရက်အလိုက်ဆေးစပ်လက်ကျန်စာရင်းစစ်ခြင်း",
    url: "/admin/garageReport/tabaccoDateReport",
  },
  {
    label: "ရက်အလိုက်တံဆိပ်လက်ကျန်စာရင်းစစ်ခြင်း",
    url: "/admin/garageReport/labelDateReport",
  },
  {
    label: "ရက်အလိုက်ပလပ်စတစ်လက်ကျန်စာရင်းစစ်ခြင်း",
    url: "/admin/garageReport/plasticDateReport",
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
  const taungyi = router.pathname.includes("taungyi");
  const transfer = router.pathname.includes("transferCheroot");
  const bago = router.pathname.includes("bago");
  const returnCherootReport = router.pathname.includes("returnCherootReport");
  const cashAdvanceReport = router.pathname.includes("cashAdvanceReport");
  const leafReport = router.pathname.includes("leafReport");
  const garageReport = router.pathname.includes("garageReport");
  const { selectedWorkShop, item: workShops } = useAppSelector(
    (store) => store.workShop
  );
  const work = workShops.find((item) => item.id === selectedWorkShop?.id);
  const { selectedGarage, item: garages } = useAppSelector(
    (store) => store.garage
  );
  const gar = garages.find((item) => item.id === selectedGarage?.id);

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
  } else if (taungyi) {
    data = [...Taungyi];
  } else if (bago) {
    data = [...Bago];
  } else if (returnCherootReport) {
    data = [...ReturnCherootReport];
  } else if (cashAdvanceReport) {
    data = [...CashAdvanceReport];
  } else if (garageReport) {
    data = [...GarageReport];
  } else if (leafReport) {
    data = [...LeafReport];
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
        {taungyi && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            တောင်ကြီးစာရင်း
          </Typography>
        )}
        {bago && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ပဲခူးပစ္စည်းစာရင်း
          </Typography>
        )}
        {returnCherootReport && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ဆေးလိပ်အဝင်စာရင်းစစ်ခြင်း
          </Typography>
        )}
        {cashAdvanceReport && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ကိုယ်စားလှယ်ကြိုယူငွေလက်ကျန်စစ်ခြင်း
          </Typography>
        )}
        {garageReport && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ဂိုထောင်လက်ကျန်ပစ္စည်းစစ်ခြင်း
          </Typography>
        )}
        {leafReport && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ဖက်စာရင်းစစ်ခြင်း
          </Typography>
        )}
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
            {work?.name} /
          </Typography>
          <Typography sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
            {gar?.name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", right: 10, top: 25, color: "white" }}>
        <HomeIcon
          onClick={() => router.push("/admin/home")}
          sx={{ fontSize: 40 }}
        />
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
