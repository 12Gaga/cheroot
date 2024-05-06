import NewAgent from "@/components/agentName/newAgent";
import { useAppSelector } from "@/store/hooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
const NamePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const agents = useAppSelector((store) => store.agent.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concetnAgent = agents.filter(
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
          ကိုယ်စားလှယ်အမည်စာရင်း
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
      <Box sx={{ position: "absolute", right: 10, top: 30, color: "white" }}>
        <HomeIcon onClick={() => router.push("/admin/home")} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddBoxIcon
          onClick={() => {
            setOpen(true);
          }}
          sx={{ fontSize: 50 }}
        />
      </Box>
      <NewAgent open={open} setOpen={setOpen} />

      <Box>
        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>အမည်</th>
              <th>နေရပ်လိပ်စာ</th>
              <th>ဖုန်းနံပါတ်</th>
              <th>လက်ကျန်ငွေ(အကြီး)</th>
              <th>လက်ကျန်ငွေ(အသေး)</th>
            </tr>
          </thead>
          {concetnAgent.map((item) => (
            <thead key={item.name}>
              <tr style={{ border: "1px solid" }}>
                <td>{item.name}</td>
                <td>{item.adderess}</td>
                <td>{item.phoneNo}</td>
                <td>{item.cashBalcanceBig}</td>
                <td>{item.cashBalcanceSmall}</td>
                <td>{<EditIcon />}</td>
                <td>{<DeleteIcon />}</td>
              </tr>
            </thead>
          ))}
        </table>
      </Box>

      <Box sx={{ position: "fixed", bottom: 10, right: 0 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#E55252",

            fontSize: 18,
            borderRadius: 10,
            "&:hover": {
              bgcolor: "#FCB500",
              color: "white",
              fontWeight: "bold",
            },
          }}
          onClick={() => router.push("/admin/name/leafViss")}
        >
          ဖက်လက်ကျန်ထည့်ခြင်း
        </Button>
      </Box>
    </>
  );
};
export default NamePage;
