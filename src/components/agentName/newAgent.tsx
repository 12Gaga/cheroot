import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import newGarage from "../asign/newGarage";
import { createNewAgent } from "@/types/agentType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CreateGarage } from "@/store/slices/garage";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { setIsLoading } from "@/store/slices/workShop";
import { useState } from "react";
import AgentOne from "./agentOne";
import AgentThree from "./agentThree";
import AgentTwo from "./agentTwo";
import { CreateAgent } from "@/store/slices/agent";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewAgent = {
  name: "",
  phoneNo: undefined,
  address: "",
  cashBig: 0,
  cashSmall: 0,
};

const NewAgent = ({ open, setOpen }: Props) => {
  const [newAgent, setNewAgent] = useState<createNewAgent>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.agent);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateAgent({
        ...newAgent,
        onSuccess: () => {
          setOpen(false);
          setNewAgent(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new agent success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>ကိုယ်စားလှယ်အမည်စာရင်း</DialogTitle>
        <DialogContent>
          <AgentOne setNewAgent={setNewAgent} newAgent={newAgent} />
          <AgentTwo setNewAgent={setNewAgent} newAgent={newAgent} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newAgent.name ||
              !newAgent.phoneNo ||
              !newAgent.address ||
              !newAgent.cashBig ||
              !newAgent.cashSmall
            }
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

export default NewAgent;
