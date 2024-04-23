import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
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
import { CreateNewAgentLeafViss } from "@/types/agentLeafVissType";
import { CreateAgentLeafViss } from "@/store/slices/agentLeafViss";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: CreateNewAgentLeafViss = {
  agentId: undefined,
  typeOfLeafId: undefined,
  viss: 0,
};

const NewAgentLeafViss = ({ open, setOpen }: Props) => {
  const [newAgentLeafViss, setNewAgentLeafViss] =
    useState<CreateNewAgentLeafViss>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.agentLeafViss);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateAgentLeafViss({
        ...newAgentLeafViss,
        onSuccess: () => {
          setOpen(false);
          setNewAgentLeafViss(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new agent leaf viss success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>ဖက်လက်ကျန်ထည့်စာရင်း</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", mt: 2 }}>
            <Box
              sx={{
                width: "75%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <AgentThree
                newAgentLeafViss={newAgentLeafViss}
                setNewAgentLeafViss={setNewAgentLeafViss}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newAgentLeafViss.agentId ||
              !newAgentLeafViss.typeOfLeafId ||
              !newAgentLeafViss.viss
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

export default NewAgentLeafViss;
