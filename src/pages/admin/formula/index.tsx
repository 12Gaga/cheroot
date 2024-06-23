import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewFormula } from "@/components/formula/newFormula";
import { useRouter } from "next/router";
import UpdateFormula from "@/components/formula/updateFormula";
import DeleteFormula from "@/components/formula/deleteFormula";

const Formula = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const formula = useAppSelector((store) => store.formula.item);
  const concernFormula = formula
    .filter((item) => item.workShopId === workShop?.id)
    .sort((a, b) => a.id - b.id);
  const { selectedWorkShop, item: workShops } = useAppSelector(
    (store) => store.workShop
  );
  const work = workShops.find((item) => item.id === selectedWorkShop?.id);
  const { selectedGarage, item: garages } = useAppSelector(
    (store) => store.garage
  );
  const gar = garages.find((item) => item.id === selectedGarage?.id);
  const router = useRouter();
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  let no = 0;
  if (!session) return null;
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          Formula ထည့်သွင်းခြင်း
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
            {work?.name} /
          </Typography>
          <Typography sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
            {gar?.name}
          </Typography>
        </Box>
        <Box sx={{ position: "absolute", right: 10, top: 25, color: "white" }}>
          <HomeIcon
            onClick={() => router.push("/admin/home")}
            sx={{ fontSize: 40 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddBoxIcon
          onClick={() => {
            setOpen(true);
          }}
          sx={{ fontSize: 50 }}
        />
      </Box>

      <Box sx={{ ml: 5 }}>
        <table border={1}>
          <tr>
            <th style={{ width: 50 }}>စဉ်</th>
            <th style={{ width: 150 }}>ဆေးလိပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>ဆေးလိပ်အရေအတွက်</th>
            <th style={{ width: 150 }}>အဆီခံအမျိုးအစား</th>
            <th style={{ width: 150 }}>အဆီခံအရေအတွက်</th>
            <th style={{ width: 150 }}>ဆေးစပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>အရေအတွက်</th>
            <th style={{ width: 150 }}>တင်း</th>
            <th style={{ width: 150 }}>ပြည်</th>
          </tr>
          {concernFormula.map((item) => (
            <tr key={item.id}>
              <th style={{ height: 25 }}>{(no += 1)}</th>
              <td style={{ textAlign: "center" }}>
                {cheroots.find((c) => c.id === item.typeOfCherootId)?.name}
              </td>
              <td style={{ textAlign: "center" }}>{item.cherootQty}</td>
              <td style={{ textAlign: "center" }}>
                {
                  filterSizes.find((f) => f.id === item.typeOfFilterSizeId)
                    ?.name
                }
              </td>
              <td style={{ textAlign: "center" }}>{item.filterSizeQty}</td>
              <td style={{ textAlign: "center" }}>
                {tabaccos.find((f) => f.id === item.typeOfTabaccoId)?.name}
              </td>
              <td style={{ textAlign: "center" }}>{item.tabaccoQty}</td>
              <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
              <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
              <td
                style={{ textAlign: "center", width: 50 }}
                onClick={() => {
                  setUpdateOpen(true), setSelectId(item.id);
                }}
              >
                {<EditIcon />}
              </td>
              <td
                style={{ textAlign: "center", width: 50 }}
                onClick={() => {
                  setDeleteOpen(true), setSelectId(item.id);
                }}
              >
                {<DeleteIcon />}
              </td>
            </tr>
          ))}
        </table>
      </Box>
      <NewFormula open={open} setOpen={setOpen} />
      <UpdateFormula
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
        selectedId={selectId}
      />
      <DeleteFormula
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedId={selectId}
      />
    </>
  );
};

export default Formula;
