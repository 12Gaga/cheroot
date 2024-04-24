import NewAgentLeafViss from "@/components/agentName/newAgentLeafViss";
import { useAppSelector } from "@/store/hooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const AgentLeafVissPage = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const agent = useAppSelector((store) => store.agent.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concetnAgent = agent.filter((item) => item.workShopId === workShop?.id);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter(
    (item) => item.workShopId === workShop?.id
  );
  const leafViss = useAppSelector((store) => store.agentLeafViss.item);
  const concernLeafViss = leafViss.filter(
    (item) => item.workShopId === workShop?.id
  );
  if (!session) return;
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
          ဖက်လက်ကျန်ထည့်ခြင်း
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

      <NewAgentLeafViss open={open} setOpen={setOpen} />

      <Box>
        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>အမည်</th>
              <th>ဖက်အမျိုးအစား</th>
              <th>ပိဿာ</th>
            </tr>
          </thead>
          {concernLeafViss.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>{concetnAgent.find((a) => a.id === item.agentId)?.name}</td>
                <td>
                  {concernLeaves.find((l) => l.id === item.typeOfLeafId)?.name}
                </td>
                <td>{item.viss}</td>
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
export default AgentLeafVissPage;
