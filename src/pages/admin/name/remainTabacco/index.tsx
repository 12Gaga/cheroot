import { useAppSelector } from "@/store/hooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminLayout from "@/components/adminLayout";
import NewAgentRemainTabacco from "@/components/agentName/newAgentRemainTabacco";
import { AgentLeftLabel, AgentLeftTabacco } from "@prisma/client";
const AgentRemainTabaccoPage = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const agents = useAppSelector((store) => store.agent.item);
  const AgentLeftFilterSize = useAppSelector((store) => store.agent.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concetnAgent = agents.filter(
    (item) => item.workShopId === workShop?.id
  );
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const leftTabacco = useAppSelector((store) => store.agentRemainTabacco.item);
  const concernLeftTabacco = leftTabacco
    .filter((item) => item.workShopId === workShop?.id)
    .sort((a, b) => a.id - b.id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  const [agent, setAgent] = useState<number | null>(null);
  const [concernData, setConcernData] = useState<AgentLeftTabacco[]>([]);
  let no = 0;
  const handleAgent = (agentId: number) => {
    const data = concernLeftTabacco
      .filter((c) => c.agentId === agentId)
      .sort((a, b) => a.id - b.id);
    setConcernData(data);
    setAgent(agentId);
  };
  useEffect(() => {
    setConcernData(concernLeftTabacco);
  }, [leftTabacco]);
  if (!session) return;
  return (
    <>
      <AdminLayout>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          ဆေးစပ်လက်ကျန်ထည့်ခြင်း
        </Typography>

        <Box sx={{}}>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ကိုယ်စားလှယ်အမည်
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={agent}
                onChange={(evt) => {
                  handleAgent(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concetnAgent.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

        <Box sx={{}}>
          <table border={1}>
            <tr>
              <th style={{ width: 50 }}>စဉ်</th>
              <th style={{ width: 150 }}>အမည်</th>
              <th style={{ width: 150 }}>ဆေးလိပ်အမျိုးအစား</th>
              <th style={{ width: 150 }}>ဆေးစပ်အမျိုးအစား</th>
              <th style={{ width: 150 }}>လက်ကျန်(တင်း)</th>
              <th style={{ width: 150 }}>လက်ကျန်(ပြည်)</th>
            </tr>
            {concernData.map((item) => (
              <tr key={item.id}>
                <th style={{ height: 25 }}>{(no += 1)}</th>
                <td style={{ textAlign: "center" }}>
                  {concetnAgent.find((a) => a.id === item.agentId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>
                  {cheroots.find((a) => a.id === item.typeOfCherootId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>
                  {tabaccos.find((f) => f.id === item.typeOfTabaccoId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.tin}</td>
                <td style={{ textAlign: "center" }}>{item.pyi}</td>
                {/* <td
                    onClick={() => {
                      setUpdateOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<EditIcon />}
                  </td>
                  <td
                    onClick={() => {
                      setDeleteOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<DeleteIcon />}
                  </td> */}
              </tr>
            ))}
          </table>
        </Box>
        <NewAgentRemainTabacco open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default AgentRemainTabaccoPage;
