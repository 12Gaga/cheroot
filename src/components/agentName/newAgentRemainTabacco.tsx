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
import { createAgentRemainTabacco } from "@/types/remainTabaccoType";
import {
  CreateAgentRemainTabacco,
  setIsLoading,
} from "@/store/slices/agentRemainTabacco";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createAgentRemainTabacco = {
  agentId: undefined,
  typeOfCherootId: undefined,
  typeOfTabaccoId: undefined,
  tin: 0,
  pyi: 0,
};

const NewAgentRemainTabacco = ({ open, setOpen }: Props) => {
  const [newAgentLeftTabacco, setNewAgentLeftTabacco] =
    useState<createAgentRemainTabacco>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.agentRemainTabacco);
  const dispatch = useAppDispatch();
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (a) => a.workShopId === workShopId
  );
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item).filter(
    (a) => a.workShopId === workShopId
  );

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateAgentRemainTabacco({
        ...newAgentLeftTabacco,
        onSuccess: () => {
          setOpen(false);
          setNewAgentLeftTabacco(defaultValue);
          dispatch(
            setOpenSnackbar({
              message: "Create new agent remain tabacco success",
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
          setNewAgentLeftTabacco(defaultValue);
        }}
      >
        <DialogTitle>ဆေးစပ်လက်ကျန်ထည့်စာရင်း</DialogTitle>
        <DialogContent>
          <Box
            sx={{
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
                      value={newAgentLeftTabacco.agentId}
                      onChange={(evt) => {
                        setNewAgentLeftTabacco({
                          ...newAgentLeftTabacco,
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
                      value={newAgentLeftTabacco.typeOfCherootId}
                      onChange={(evt) => {
                        setNewAgentLeftTabacco({
                          ...newAgentLeftTabacco,
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
                    ဆေးစပ်အမျိုးအစား
                  </Typography>
                  <FormControl variant="filled" sx={{ width: 300 }}>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={newAgentLeftTabacco.typeOfTabaccoId}
                      onChange={(evt) => {
                        setNewAgentLeftTabacco({
                          ...newAgentLeftTabacco,
                          typeOfTabaccoId: Number(evt.target.value),
                        });
                      }}
                      sx={{ bgcolor: "#EEE8CF" }}
                    >
                      {tabaccos.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    လက်ကျန်တင်း
                  </Typography>
                  <TextField
                    placeholder="လက်ကျန်အရေအတွက်"
                    sx={{ bgcolor: "#EEE8CF", width: 300 }}
                    onChange={(evt) =>
                      setNewAgentLeftTabacco({
                        ...newAgentLeftTabacco,
                        tin: Number(evt.target.value),
                      })
                    }
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    လက်ကျန်ပြည်
                  </Typography>
                  <TextField
                    placeholder="လက်ကျန်အရေအတွက်"
                    sx={{ bgcolor: "#EEE8CF", width: 300 }}
                    onChange={(evt) =>
                      setNewAgentLeftTabacco({
                        ...newAgentLeftTabacco,
                        pyi: Number(evt.target.value),
                      })
                    }
                  />
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
              setNewAgentLeftTabacco(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newAgentLeftTabacco.agentId ||
              !newAgentLeftTabacco.typeOfCherootId ||
              !newAgentLeftTabacco.typeOfTabaccoId ||
              !newAgentLeftTabacco.tin === undefined ||
              !newAgentLeftTabacco.pyi === undefined
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

export default NewAgentRemainTabacco;
