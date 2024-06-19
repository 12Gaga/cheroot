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
import { useState } from "react";
import { createAgentRemainLabel } from "@/types/remainLabelType";
import {
  CreateAgentRemainLabel,
  setIsLoading,
} from "@/store/slices/agentRemainLabel";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createAgentRemainLabel = {
  agentId: undefined,
  typeOfCherootId: undefined,
  typeOfLabelId: undefined,
  bandle: 0,
};

const NewAgentRemainLabel = ({ open, setOpen }: Props) => {
  const [newAgentLeftLabel, setNewAgentLeftLabel] =
    useState<createAgentRemainLabel>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.agentRemainLabel);
  const dispatch = useAppDispatch();
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (a) => a.workShopId === workShopId
  );
  const labels = useAppSelector((store) => store.typeOfLabel.item).filter(
    (a) => a.workShopId === workShopId
  );

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateAgentRemainLabel({
        ...newAgentLeftLabel,
        onSuccess: () => {
          setOpen(false);
          setNewAgentLeftLabel(defaultValue);
          dispatch(
            setOpenSnackbar({
              message: "Create new agent remain label success",
            })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setNewAgentLeftLabel(defaultValue);
        }}
      >
        <DialogTitle>တံဆိပ်လက်ကျန်ထည့်စာရင်း</DialogTitle>
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
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      ကိုယ်စားလှယ်အမည်
                    </Typography>
                    <FormControl variant="filled" sx={{ width: 300 }}>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={newAgentLeftLabel.agentId}
                        onChange={(evt) => {
                          setNewAgentLeftLabel({
                            ...newAgentLeftLabel,
                            agentId: Number(evt.target.value),
                          });
                        }}
                        sx={{ bgcolor: "#EEE8CF" }}
                      >
                        {agents.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <ListItemText primary={item.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      ဆေးလိပ်အမျိုးအစား
                    </Typography>
                    <FormControl variant="filled" sx={{ width: 300 }}>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={newAgentLeftLabel.typeOfCherootId}
                        onChange={(evt) => {
                          setNewAgentLeftLabel({
                            ...newAgentLeftLabel,
                            typeOfCherootId: Number(evt.target.value),
                          });
                        }}
                        sx={{ bgcolor: "#EEE8CF" }}
                      >
                        {cheroots.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <ListItemText primary={item.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      တံဆိပ်အမျိုးအစား
                    </Typography>
                    <FormControl variant="filled" sx={{ width: 300 }}>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={newAgentLeftLabel.typeOfLabelId}
                        onChange={(evt) => {
                          setNewAgentLeftLabel({
                            ...newAgentLeftLabel,
                            typeOfLabelId: Number(evt.target.value),
                          });
                        }}
                        sx={{ bgcolor: "#EEE8CF" }}
                      >
                        {labels.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <ListItemText primary={item.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      လက်ကျန်လိပ်
                    </Typography>
                    <TextField
                      placeholder="လက်ကျန်အရေအတွက်"
                      sx={{ bgcolor: "#EEE8CF", width: 300 }}
                      onChange={(evt) =>
                        setNewAgentLeftLabel({
                          ...newAgentLeftLabel,
                          bandle: Number(evt.target.value),
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
              setOpen(false);
              setNewAgentLeftLabel(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newAgentLeftLabel.agentId ||
              !newAgentLeftLabel.typeOfCherootId ||
              !newAgentLeftLabel.typeOfLabelId ||
              !newAgentLeftLabel.bandle === undefined
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

export default NewAgentRemainLabel;
