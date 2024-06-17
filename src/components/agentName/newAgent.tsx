import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { createNewAgent } from "@/types/agentType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { useState } from "react";
import AgentOne from "./agentOne";
import AgentTwo from "./agentTwo";
import { CreateAgent, setIsLoading } from "@/store/slices/agent";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewAgent = {
  name: "",
  phoneNo: "",
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
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setNewAgent(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newAgent.name ||
              !newAgent.phoneNo ||
              !newAgent.address ||
              !newAgent.cashBig === undefined ||
              !newAgent.cashSmall === undefined
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
