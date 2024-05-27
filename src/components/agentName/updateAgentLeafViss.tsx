import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { useEffect, useState } from "react";
import { updateAgentLeafViss } from "@/types/agentLeafVissType";
import {
  UpdatedAgentLeafViss,
  setIsLoading,
} from "@/store/slices/agentLeafViss";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateAgentLeafViss = {
  id: null,
  agentId: undefined,
  typeOfLeafId: undefined,
  viss: 0,
};

const UpdateAgentLeafViss = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const agentsLeaf = useAppSelector((store) => store.agentLeafViss.item);
  const selectAgentLeaf = agentsLeaf.find((item) => item.id === selectedId);
  const [updateAgentLeafViss, setUpdateAgentLeafViss] =
    useState<updateAgentLeafViss>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.agentLeafViss);
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter(
    (item) => item.workShopId === workShop?.id
  );
  const agents = useAppSelector((store) => store.agent.item);
  const concernAgent = agents.filter(
    (item) => item.workShopId === workShop?.id
  );

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedAgentLeafViss({
        ...updateAgentLeafViss,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateAgentLeafViss(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update agent leaf viss success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    if (selectAgentLeaf) {
      setUpdateAgentLeafViss({
        ...updateAgentLeafViss,
        id: selectedId,
        agentId: selectAgentLeaf.agentId,
        typeOfLeafId: selectAgentLeaf.typeOfLeafId,
        viss: selectAgentLeaf.viss,
      });
    }
  }, [updateOpen, selectAgentLeaf]);

  if (!selectAgentLeaf) return null;

  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
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
              <Box>
                <Box>
                  <Box sx={{ width: 300, mt: 2 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      ကိုယ်စားလှယ်အမည်
                    </Typography>
                    <FormControl variant="filled" sx={{ width: 225 }}>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        defaultValue={selectAgentLeaf.agentId}
                        value={updateAgentLeafViss.agentId}
                        onChange={(evt) => {
                          setUpdateAgentLeafViss({
                            ...updateAgentLeafViss,
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
                    <Typography sx={{ fontWeight: "bold" }}>
                      ဖက်အမျိုးအစား
                    </Typography>
                    <FormControl variant="filled" sx={{ width: 225 }}>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        defaultValue={selectAgentLeaf.typeOfLeafId}
                        value={updateAgentLeafViss.typeOfLeafId}
                        onChange={(evt) => {
                          setUpdateAgentLeafViss({
                            ...updateAgentLeafViss,
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
                      defaultValue={selectAgentLeaf.viss}
                      placeholder="ဖက်ပိဿာ"
                      sx={{ bgcolor: "#EEE8CF" }}
                      onChange={(evt) =>
                        setUpdateAgentLeafViss({
                          ...updateAgentLeafViss,
                          viss: Number(evt.target.value),
                        })
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setUpdateOpen(false);
              setUpdateAgentLeafViss(defaultValue);
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

export default UpdateAgentLeafViss;
