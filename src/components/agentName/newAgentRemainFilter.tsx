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
import { createAgentRemainFilterSize } from "@/types/remainFiltersizeType";
import {
  CreateAgentRemainFilterSize,
  setIsLoading,
} from "@/store/slices/agentRemainFilter";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createAgentRemainFilterSize = {
  agentId: undefined,
  typeOfCherootId: undefined,
  typeOfFilterSizeId: undefined,
  quantity: 0,
};

const NewAgentRemainFilterSize = ({ open, setOpen }: Props) => {
  const [newAgentLeftFilter, setNewAgentLeftFilter] =
    useState<createAgentRemainFilterSize>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.agentRemainFilter);
  const dispatch = useAppDispatch();
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (a) => a.workShopId === workShopId
  );
  const filterSizes = useAppSelector(
    (store) => store.typeOfFilterSize.item
  ).filter((a) => a.workShopId === workShopId);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateAgentRemainFilterSize({
        ...newAgentLeftFilter,
        onSuccess: () => {
          setOpen(false);
          setNewAgentLeftFilter(defaultValue);
          dispatch(
            setOpenSnackbar({
              message: "Create new agent remain filter size success",
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
          setNewAgentLeftFilter(defaultValue);
        }}
      >
        <DialogTitle>အစီခံလက်ကျန်ထည့်စာရင်း</DialogTitle>
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
                        value={newAgentLeftFilter.agentId}
                        onChange={(evt) => {
                          setNewAgentLeftFilter({
                            ...newAgentLeftFilter,
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
                        value={newAgentLeftFilter.typeOfCherootId}
                        onChange={(evt) => {
                          setNewAgentLeftFilter({
                            ...newAgentLeftFilter,
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
                      အစီခံအမျိုးအစား
                    </Typography>
                    <FormControl variant="filled" sx={{ width: 300 }}>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={newAgentLeftFilter.typeOfFilterSizeId}
                        onChange={(evt) => {
                          setNewAgentLeftFilter({
                            ...newAgentLeftFilter,
                            typeOfFilterSizeId: Number(evt.target.value),
                          });
                        }}
                        sx={{ bgcolor: "#EEE8CF" }}
                      >
                        {filterSizes.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <ListItemText primary={item.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      လက်ကျန်အရေအတွက်
                    </Typography>
                    <TextField
                      placeholder="လက်ကျန်အရေအတွက်"
                      sx={{ bgcolor: "#EEE8CF", width: 300 }}
                      onChange={(evt) =>
                        setNewAgentLeftFilter({
                          ...newAgentLeftFilter,
                          quantity: Number(evt.target.value),
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
              setNewAgentLeftFilter(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newAgentLeftFilter.agentId ||
              !newAgentLeftFilter.typeOfCherootId ||
              !newAgentLeftFilter.typeOfFilterSizeId ||
              !newAgentLeftFilter.quantity === undefined
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

export default NewAgentRemainFilterSize;
