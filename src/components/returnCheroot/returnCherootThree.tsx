import { useAppSelector } from "@/store/hooks";
import { selectedAgent } from "@/types/agentType";
import { createNewLeafDeduction } from "@/types/leafDeductionType";
import { createNewOtherDeduction } from "@/types/otherDeductionType";
import { createNewReturnCheroot } from "@/types/returnCherootType";
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
import { Agent } from "@prisma/client";
import { useState } from "react";

const defaultValue: selectedAgent = {
  agentId: undefined,
  phoneNo: "",
  address: "",
  cashBig: 0,
  cashSmall: 0,
  totalLeafViss: 0,
};

interface Props {
  newReturnCheroot: createNewReturnCheroot;
  setNewReturnCheroot: (value: createNewReturnCheroot) => void;
  newLeafDeduction: createNewLeafDeduction;
  setNewLeafDeduction: (value: createNewLeafDeduction) => void;
  newOtherDeduction: createNewOtherDeduction;
  setNewOtherDeduction: (value: createNewOtherDeduction) => void;
}

const ReturnCherootThree = ({
  newReturnCheroot,
  setNewReturnCheroot,
  newLeafDeduction,
  setNewLeafDeduction,
  newOtherDeduction,
  setNewOtherDeduction,
}: Props) => {
  const [selectAgent, setSelectedAgent] = useState<selectedAgent>(defaultValue);
  const agents = useAppSelector((store) => store.agent.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concernAgent = agents.filter(
    (item) => item.workShopId === workShop?.id
  );
  const agentsLeafViss = useAppSelector((store) => store.agentLeafViss.item);

  const handleAgent = (agentId: number) => {
    const agent = agents.find((item) => item.id === agentId) as Agent;

    setNewReturnCheroot({ ...newReturnCheroot, agentId: agentId });
    setNewLeafDeduction({ ...newLeafDeduction, agentId: agentId });
    setNewOtherDeduction({ ...newOtherDeduction, agentId: agentId });

    setSelectedAgent({
      ...selectAgent,
      agentId: agentId,
      phoneNo: agent?.phoneNo,
      address: agent?.adderess,
      cashBig: agent.cashBalcanceBig,
      cashSmall: agent.cashBalcanceSmall,
    });
  };
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
      </Box>
    </>
  );
};
export default ReturnCherootThree;
