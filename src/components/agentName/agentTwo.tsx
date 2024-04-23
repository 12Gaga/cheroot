import { createNewAgent } from "@/types/agentType";
import { Typography, Box, TextField } from "@mui/material";

interface Props {
  newAgent: createNewAgent;
  setNewAgent: (value: createNewAgent) => void;
}

const AgentTwo = ({ newAgent, setNewAgent }: Props) => {
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>လက်ကျန်ငွေ(အကြီး)</Typography>
        <TextField
          placeholder="လက်ကျန်ငွေ(အကြီး)"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={(evt) =>
            setNewAgent({ ...newAgent, cashBig: Number(evt.target.value) })
          }
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>လက်ကျန်ငွေ(အသေး)</Typography>
        <TextField
          placeholder="လက်ကျန်ငွေ(အသေး)"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={(evt) =>
            setNewAgent({
              ...newAgent,
              cashSmall: Number(evt.target.value),
            })
          }
        />
      </Box>
    </>
  );
};
export default AgentTwo;
