import { useAppSelector } from "@/store/hooks";
import { selectedAgent } from "@/types/agentType";
import { createNewPayLeaf } from "@/types/payLeafType";
import {
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItemText,
} from "@mui/material";
import { Agent, AgentLeafViss } from "@prisma/client";
import { useState } from "react";

const defaultValue: selectedAgent = {
  agentId: undefined,
  phoneNo: undefined,
  address: "",
  cashBig: 0,
  cashSmall: 0,
  totalLeafViss: 0,
};

interface Props {
  newPayLeaf: createNewPayLeaf;
  setNewPayLeaf: (value: createNewPayLeaf) => void;
}

const PayLeafThree = ({ newPayLeaf, setNewPayLeaf }: Props) => {
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const [selectAgent, setSelectedAgent] = useState<selectedAgent>(defaultValue);
  const [remainLeaf, setRemainLeaf] = useState<AgentLeafViss[]>([]);
  const agents = useAppSelector((store) => store.agent.item);
  const concernAgent = agents.filter(
    (item) => item.workShopId === workShop?.id
  );
  const agentsLeafViss = useAppSelector((store) => store.agentLeafViss.item);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item).filter(
    (l) => l.workShopId === workShop?.id
  );
  const handleAgent = (agentId: number) => {
    const agent = agents.find((item) => item.id === agentId) as Agent;
    const concernAgentLeafViss = agentsLeafViss.filter(
      (item) => item.agentId === agentId
    );
    setRemainLeaf(concernAgentLeafViss);

    setNewPayLeaf({ ...newPayLeaf, agentId: agentId });

    setSelectedAgent({
      ...selectAgent,
      agentId: agentId,
      phoneNo: agent?.phoneNo,
      address: agent?.adderess,
      cashBig: agent.cashBalcanceBig,
      cashSmall: agent.cashBalcanceSmall,
    });
  };
  console.log("dfuhg", selectAgent);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: 2,
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>အမည်</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <InputLabel id="demo-simple-select-filled-label">အမည်</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectAgent.agentId}
              onChange={(evt) => {
                handleAgent(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernAgent.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            လိပ်စာ
          </Typography>
          <TextField
            value={selectAgent.address}
            placeholder="လိပ်စာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            ဖုန်းနံပါတ်
          </Typography>
          <TextField
            value={selectAgent.phoneNo}
            placeholder="ဖုန်းနံပါတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            လက်ကျန်ငွေ(အကြီး)
          </Typography>
          <TextField
            value={selectAgent.cashBig}
            placeholder="လက်ကျန်ငွေ(အကြီး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            လက်ကျန်ငွေ(အသေး)
          </Typography>
          <TextField
            value={selectAgent.cashSmall}
            placeholder="လက်ကျန်ငွေ(အသေး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
        {leaves.map((item) => {
          const find = remainLeaf.find((a) => a.typeOfLeafId === item.id);
          return (
            <Box sx={{ display: "flex", alignItems: "center" }} key={item.id}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                {item.name}
              </Typography>
              <TextField
                value={find?.viss}
                placeholder={item.name}
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={() => {}}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
};
export default PayLeafThree;
