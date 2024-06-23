import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createCompensationTabacco } from "@/types/compensationTabaccoType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  TextField,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  CreatedCompensationTabacco,
  setIsLoading,
} from "@/store/slices/compensationTabacco";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { fetchApp } from "@/store/slices/app";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createCompensationTabacco = {
  date: null,
  agentId: undefined,
  typeOfCherootId: undefined,
  typeOfTabaccoId: undefined,
  remainPyi: 0,
  compensationPyi: 0,
  takeMoneyPyi: 0,
  tabaccoPrice: 0,
  tolAmount: 0,
  addCashBig: 0,
  addCashsmall: 0,
  inCash: 0,
};

const TabaccoCompensation = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.compensationTabacco);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (a) => a.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const [newCompensationTabacco, setNewCompensationTabacco] =
    useState<createCompensationTabacco>(defaultValue);
  const remainTabacco = useAppSelector(
    (store) => store.agentRemainTabacco.item
  ).filter((a) => a.workShopId === workShopId);

  const handelAgent = (agentId: number) => {
    const find = remainTabacco.find(
      (l) =>
        l.agentId === agentId &&
        l.typeOfCherootId === newCompensationTabacco.typeOfCherootId
    );
    const tabacco = tabaccos.find((l) => l.id === find?.typeOfTabaccoId);
    const tolPyi = find ? find.tin * 16 + find.pyi : 0;
    const tolPrice = tabacco
      ? newCompensationTabacco.takeMoneyPyi * tabacco.price
      : 0;
    setNewCompensationTabacco({
      ...newCompensationTabacco,
      agentId,
      typeOfTabaccoId: find ? find.typeOfTabaccoId : undefined,
      tabaccoPrice: tabacco ? tabacco.price : 0,
      remainPyi: tolPyi,
      tolAmount: tolPrice,
    });
  };

  const handleCheroot = (cherootId: number) => {
    const find = remainTabacco.find(
      (l) =>
        l.agentId === newCompensationTabacco.agentId &&
        l.typeOfCherootId === cherootId
    );
    const tabacco = tabaccos.find((l) => l.id === find?.typeOfTabaccoId);
    const tolPyi = find ? find.tin * 16 + find.pyi : 0;
    const tolPrice = tabacco
      ? newCompensationTabacco.takeMoneyPyi * tabacco.price
      : 0;
    setNewCompensationTabacco({
      ...newCompensationTabacco,
      typeOfCherootId: cherootId,
      typeOfTabaccoId: find ? find.typeOfTabaccoId : undefined,
      remainPyi: tolPyi,
      tabaccoPrice: tabacco ? tabacco.price : 0,
      tolAmount: tolPrice,
    });
  };

  const handleTake = (pyi: number) => {
    const tolPrice = pyi * newCompensationTabacco.tabaccoPrice;
    setNewCompensationTabacco({
      ...newCompensationTabacco,
      takeMoneyPyi: pyi,
      tolAmount: tolPrice,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreatedCompensationTabacco({
        ...newCompensationTabacco,
        onSuccess: () => {
          setOpen(false);
          setNewCompensationTabacco(defaultValue);
          dispatch(fetchApp({}));
          dispatch(
            setOpenSnackbar({ message: "Add Tabacco Compensation success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    setNewCompensationTabacco({
      ...newCompensationTabacco,
      date: selecteddate,
    });
  }, [selecteddate, open]);
  console.log("tabacco", newCompensationTabacco);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setNewCompensationTabacco(defaultValue);
        }}
      >
        <DialogContent>
          <Box
            sx={{ mr: 3, display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => {
                setSelectedDate(date as Date);
              }}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ကိုယ်စားလှယ်အမည်
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newCompensationTabacco.agentId}
                onChange={(evt) => {
                  handelAgent(Number(evt.target.value));
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

          <Box sx={{}}>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဆေးလိပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newCompensationTabacco.typeOfCherootId}
                  onChange={(evt) => {
                    handleCheroot(Number(evt.target.value));
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
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဆေးစပ်အမျိုးအစား
            </Typography>
            <TextField
              value={
                tabaccos.find(
                  (t) => t.id === newCompensationTabacco.typeOfTabaccoId
                )?.name
              }
              placeholder=""
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ကျန်ရှိပြည်
            </Typography>
            <TextField
              value={newCompensationTabacco.remainPyi}
              placeholder="ကျန်အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              လျော်ပေးပြည်
            </Typography>
            <TextField
              placeholder="လျော်ပေးပြည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationTabacco({
                  ...newCompensationTabacco,
                  compensationPyi: Number(evt.target.value),
                });
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ပေးချေရမည့်ပြည်
            </Typography>
            <TextField
              placeholder="ပေးချေရမည့်ပြည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                handleTake(Number(evt.target.value));
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဈေးနှုန်း
            </Typography>
            <TextField
              value={newCompensationTabacco.tabaccoPrice}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              စုစုပေါင်းဈေးနှုန်း
            </Typography>
            <TextField
              value={newCompensationTabacco.tolAmount}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ငွေ(အကြီး)
            </Typography>
            <TextField
              placeholder="ငွေ(အကြီး)"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationTabacco({
                  ...newCompensationTabacco,
                  addCashBig: Number(evt.target.value),
                });
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ငွေ(အသေး)
            </Typography>
            <TextField
              placeholder="ငွေ(အသေး)"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationTabacco({
                  ...newCompensationTabacco,
                  addCashsmall: Number(evt.target.value),
                });
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              တန်းရှင်း
            </Typography>
            <TextField
              placeholder="တန်းရှင်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationTabacco({
                  ...newCompensationTabacco,
                  inCash: Number(evt.target.value),
                });
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setNewCompensationTabacco(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleClick}
            loading={isLoading}
            disabled={
              !newCompensationTabacco.date ||
              !newCompensationTabacco.agentId ||
              !newCompensationTabacco.typeOfCherootId ||
              !newCompensationTabacco.compensationPyi === undefined ||
              !newCompensationTabacco.takeMoneyPyi === undefined ||
              !newCompensationTabacco.addCashBig === undefined ||
              !newCompensationTabacco.addCashsmall === undefined ||
              !newCompensationTabacco.inCash === undefined
            }
          >
            သိမ်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TabaccoCompensation;
