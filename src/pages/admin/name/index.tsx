import AgentButton from "@/components/agentName/agentButton";
import NewAgent from "@/components/agentName/newAgent";
import { useAppSelector } from "@/store/hooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const NamePage = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const agents = useAppSelector((store) => store.agent.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concetnAgent = agents.filter(
    (item) => item.workShopId === workShop?.id
  );
  if (!session) return null;

  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          ကိုယ်စားလှယ်အမည်စာရင်း
        </Typography>
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

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#E55252",

            width: 180,
            height: 40,
            fontSize: 18,
            borderRadius: 10,
            "&:hover": {
              bgcolor: "#FCB500",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          ဖက်လက်ကျန်ထည့်ခြင်း
        </Button>
      </Box>
    </>
  );
};
export default NamePage;
