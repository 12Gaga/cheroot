import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewFormula } from "@/components/formula/newFormula";
const Formula = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const formula = useAppSelector((store) => store.formula.item);
  const concernFormula = formula.filter(
    (item) => item.workShopId === workShop?.id
  );
  const { selectedWorkShop, item: workShops } = useAppSelector(
    (store) => store.workShop
  );
  const work = workShops.find((item) => item.id === selectedWorkShop?.id);
  const { selectedGarage, item: garages } = useAppSelector(
    (store) => store.garage
  );
  const gar = garages.find((item) => item.id === selectedGarage?.id);
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
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddBoxIcon
          onClick={() => {
            setOpen(true);
          }}
          sx={{ fontSize: 50 }}
        />
      </Box>
      <NewFormula open={open} setOpen={setOpen} />
      <Box>
        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>ဆေးလိပ်အမျိုးအစား</th>
              <th>ဆေးလိပ်အရေအတွက်</th>
              <th>အဆီခံအမျိုးအစား</th>
              <th>အဆီခံအရေအတွက်</th>
              <th>အိတ်</th>
              <th>ဆေးစပ်အမျိုးအစား</th>
              <th>အရေအတွက်</th>
              <th>တင်း</th>
              <th>ပြည်</th>
            </tr>
          </thead>
          {concernFormula.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>
                  {cheroots.find((c) => c.id === item.typeOfCherootId)?.name}
                </td>
                <td>{item.cherootQty}</td>
                <td>
                  {
                    filterSizes.find((f) => f.id === item.typeOfFilterSizeId)
                      ?.name
                  }
                </td>
                <td>{item.filterSizeQty}</td>
                <td>{item.filterSizeBag}</td>
                <td>
                  {tabaccos.find((f) => f.id === item.typeOfTabaccoId)?.name}
                </td>
                <td>{item.tabaccoQty}</td>
                <td>{item.tabaccoTin}</td>
                <td>{item.tabaccoPyi}</td>
                <td>{<EditIcon />}</td>
                <td>{<DeleteIcon />}</td>
              </tr>
            </thead>
          ))}
        </table>
      </Box>
    </>
  );
};

export default Formula;