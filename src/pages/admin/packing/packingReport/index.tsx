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
import { FormOfPacking, TypeOfPacking } from "@prisma/client";
import { useState } from "react";

const PackingReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const transferCheroot = useAppSelector((store) => store.cherootTransfer.item);
  const packingData = useAppSelector((store) => store.packingData.item);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (item) => item.workShopId === workShopId
  );
  const typeOfPacking = useAppSelector(
    (store) => store.typeOfPacking.item
  ).filter((item) => item.workShopId === workShopId);
  const formOfPacking = useAppSelector(
    (store) => store.formOfPacking.item
  ).filter((item) => item.workShopId === workShopId);

  const [concernTypePacking, setConcernTypePacking] = useState<TypeOfPacking[]>(
    []
  );
  const [concernFormPacking, setConcernFormPacking] = useState<FormOfPacking[]>(
    []
  );
  const [concernData, setConcernData] = useState<number>(0);
  const [cheroot, setCheroot] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(null);
  const [form, setForm] = useState<number | null>(null);
  const handleCheroot = (cherootId: number) => {
    const findTypeData = typeOfPacking.filter(
      (et) => et.typeOfCherootId === cherootId
    );
    setConcernTypePacking(findTypeData);
    setCheroot(cherootId);
    setType(null);
    setForm(null);
  };
  const handleType = (typeId: number) => {
    const findFormData = formOfPacking.filter(
      (item) => item.typeOfPackingId === typeId
    );
    setConcernFormPacking(findFormData);
    setType(typeId);
    setForm(null);
  };
  const handleForm = (formId: number) => {
    const transferData = transferCheroot
      .filter(
        (item) =>
          item.typeOfCherootId === cheroot &&
          item.typeOfPackingId === type &&
          item.formOfPackingId === formId
      )
      .reduce((tol, l) => {
        return (tol += l.quantity);
      }, 0);
    const storeData = packingData
      .filter(
        (item) =>
          item.typeOfCherootId === cheroot &&
          item.typeOfPackingId === type &&
          item.formOfPackingId === formId
      )
      .reduce((tol, l) => {
        return (tol += l.quantity);
      }, 0);
    setConcernData(storeData - transferData);
    setForm(formId);
  };
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပါကင်လက်ကျန်စာရင်းစစ်ခြင်း
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            my: 5,
          }}
        >
          <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဆေးလိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={cheroot}
                onChange={(evt) => {
                  handleCheroot(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {cheroots.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ပါကင်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={type}
                onChange={(evt) => {
                  handleType(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernTypePacking.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ထုပ်ပိုးမှုအမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={form}
                onChange={(evt) => {
                  handleForm(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernFormPacking.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ width: "50%", margin: "0 auto" }}>
          <table border={1} className="table">
            <tr>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ဆေးလိပ်အမျိုးအစား
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ပါကင်အမျိုးအစား
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ထုပ်ပိုးမှုအမျိုးအစား
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိအရေအတွက်
              </th>
            </tr>
            {concernFormPacking && (
              <tr>
                <td style={{ textAlign: "center", height: 30 }}>
                  {cheroots.find((c) => c.id === cheroot)?.name}
                </td>
                <td style={{ textAlign: "center", height: 30 }}>
                  {typeOfPacking.find((t) => t.id === type)?.name}
                </td>
                <td style={{ textAlign: "center", height: 30 }}>
                  {formOfPacking.find((f) => f.id === form)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{concernData}</td>
              </tr>
            )}
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default PackingReport;
