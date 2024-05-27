import { createNewAgent } from "@/types/agentType";
import { Box, TextField, Typography } from "@mui/material";

interface Props {
  newAgent: createNewAgent;
  setNewAgent: (value: createNewAgent) => void;
}

const AgentOne = ({ newAgent, setNewAgent }: Props) => {
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
        <TextField
          placeholder="အမည်"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={(evt) =>
            setNewAgent({ ...newAgent, name: evt.target.value })
          }
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>နေရပ်လိပ်စာ</Typography>
        <TextField
          placeholder="နေရပ်လိပ်စာ"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={(evt) =>
            setNewAgent({ ...newAgent, address: evt.target.value })
          }
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>ဖုန်းနံပါတ်</Typography>
        <TextField
          placeholder="ဖုန်းနံပါတ်"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={(evt) =>
            setNewAgent({ ...newAgent, phoneNo: Number(evt.target.value) })
          }
        />
      </Box>
    </>
  );
};
export default AgentOne;
