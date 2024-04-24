import { useAppSelector } from "@/store/hooks";
import { CreateNewAgentLeafViss } from "@/types/agentLeafVissType";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  ListItemText,
} from "@mui/material";

interface Props {
  newAgentLeafViss: CreateNewAgentLeafViss;
  setNewAgentLeafViss: (value: CreateNewAgentLeafViss) => void;
}

const AgentThree = ({ newAgentLeafViss, setNewAgentLeafViss }: Props) => {
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter(
    (item) => item.workShopId === workShop?.id
  );
  const agents = useAppSelector((store) => store.agent.item);
  const concernAgent = agents.filter(
    (item) => item.workShopId === workShop?.id
  );
  return (
    <>
      <Box>
        {/* <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            bgcolor: "#FCB500",
            width: 200,
            p: 1,
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
          }}
        >
          လက်ကျန်ဖက်ပိဿာ
        </Typography> */}
        <Box
        // sx={{
        //   display: "flex",
        //   ml: 2,
        //   alignItems: "center",
        //   flexWrap: "wrap",
        // }}
        >
          <Box sx={{ width: 300, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              ကိုယ်စားလှယ်အမည်
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newAgentLeafViss.agentId}
                onChange={(evt) => {
                  setNewAgentLeafViss({
                    ...newAgentLeafViss,
                    agentId: Number(evt.target.value),
                  });
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

          <Box sx={{ width: 300, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newAgentLeafViss.typeOfLeafId}
                onChange={(evt) => {
                  setNewAgentLeafViss({
                    ...newAgentLeafViss,
                    typeOfLeafId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernLeaves.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: 300, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဖက်ပိဿာ</Typography>
            <TextField
              placeholder="ဖက်ပိဿာ"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewAgentLeafViss({
                  ...newAgentLeafViss,
                  viss: Number(evt.target.value),
                })
              }
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default AgentThree;
