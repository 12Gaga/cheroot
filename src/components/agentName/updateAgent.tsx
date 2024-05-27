import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  SelectChangeEvent,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { updateAgent } from "@/types/agentType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { useEffect, useState } from "react";
import { UpdatedAgent, setIsLoading } from "@/store/slices/agent";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateAgent = {
  id: null,
  name: "",
  phoneNo: undefined,
  address: "",
  cashBig: 0,
  cashSmall: 0,
};

const UpdateAgent = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const agents = useAppSelector((store) => store.agent.item);
  const selectAgent = agents.find((item) => item.id === selectedId);
  const [updateAgent, setUpdateAgent] = useState<updateAgent>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.agent);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedAgent({
        ...updateAgent,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateAgent(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update agent success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    if (selectAgent) {
      setUpdateAgent({
        ...updateAgent,
        id: selectedId,
        name: selectAgent.name,
        phoneNo: selectAgent.phoneNo,
        address: selectAgent.adderess,
        cashBig: selectAgent.cashBalcanceBig,
        cashSmall: selectAgent.cashBalcanceSmall,
      });
    }
  }, [updateOpen, selectAgent]);

  if (!selectAgent) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle>ကိုယ်စားလှယ်အမည်စာရင်း</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectAgent.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setUpdateAgent({ ...updateAgent, name: evt.target.value })
              }
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>နေရပ်လိပ်စာ</Typography>
            <TextField
              defaultValue={selectAgent.adderess}
              placeholder="နေရပ်လိပ်စာ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setUpdateAgent({ ...updateAgent, address: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဖုန်းနံပါတ်</Typography>
            <TextField
              defaultValue={selectAgent.phoneNo}
              placeholder="ဖုန်းနံပါတ်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setUpdateAgent({
                  ...updateAgent,
                  phoneNo: Number(evt.target.value),
                })
              }
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              လက်ကျန်ငွေ(အကြီး)
            </Typography>
            <TextField
              defaultValue={selectAgent.cashBalcanceBig}
              placeholder="လက်ကျန်ငွေ(အကြီး)"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setUpdateAgent({
                  ...updateAgent,
                  cashBig: Number(evt.target.value),
                })
              }
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              လက်ကျန်ငွေ(အသေး)
            </Typography>
            <TextField
              defaultValue={selectAgent.cashBalcanceSmall}
              placeholder="လက်ကျန်ငွေ(အသေး)"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setUpdateAgent({
                  ...updateAgent,
                  cashSmall: Number(evt.target.value),
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setUpdateOpen(false);
              setUpdateAgent(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleClick}
            loading={isLoading}
          >
            အိုကေ
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateAgent;
