import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createCompensationLabel } from "@/types/compensationLabelType";
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
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  CreatedCompensationLabel,
  setIsLoading,
} from "@/store/slices/compensationLabel";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { fetchApp } from "@/store/slices/app";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createCompensationLabel = {
  date: null,
  agentId: undefined,
  typeOfCherootId: undefined,
  typeOfLabelId: undefined,
  remainBandel: 0,
  compensationBandle: 0,
  takeMoneyBandle: 0,
  labelPrice: 0,
  tolAmount: 0,
  addCashBig: 0,
  addCashsmall: 0,
  inCash: 0,
};

const LabelCompensation = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.compensationLabel);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (a) => a.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const [newCompensationLabel, setNewCompensationLabel] =
    useState<createCompensationLabel>(defaultValue);
  const remainLabel = useAppSelector(
    (store) => store.agentRemainLabel.item
  ).filter((a) => a.workShopId === workShopId);

  const handelAgent = (agentId: number) => {
    const find = remainLabel.find(
      (l) =>
        l.agentId === agentId &&
        l.typeOfCherootId === newCompensationLabel.typeOfCherootId
    );
    const label = labels.find((l) => l.id === find?.typeOfLabelId);
    const tolPrice = label
      ? newCompensationLabel.takeMoneyBandle * label.price
      : 0;
    setNewCompensationLabel({
      ...newCompensationLabel,
      agentId,
      typeOfLabelId: find ? find.typeOfLabelId : undefined,
      labelPrice: label ? label.price : 0,
      remainBandel: find ? find.bandle : 0,
      tolAmount: tolPrice,
    });
  };

  const handleCheroot = (cherootId: number) => {
    const find = remainLabel.find(
      (l) =>
        l.agentId === newCompensationLabel.agentId &&
        l.typeOfCherootId === cherootId
    );
    const label = labels.find((l) => l.id === find?.typeOfLabelId);
    const tolPrice = label
      ? newCompensationLabel.takeMoneyBandle * label.price
      : 0;
    setNewCompensationLabel({
      ...newCompensationLabel,
      typeOfCherootId: cherootId,
      typeOfLabelId: find ? find.typeOfLabelId : undefined,
      remainBandel: find ? find.bandle : 0,
      labelPrice: label ? label.price : 0,
      tolAmount: tolPrice,
    });
  };

  const handleTake = (bandle: number) => {
    const tolPrice = bandle * newCompensationLabel.labelPrice;
    setNewCompensationLabel({
      ...newCompensationLabel,
      takeMoneyBandle: bandle,
      tolAmount: tolPrice,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreatedCompensationLabel({
        ...newCompensationLabel,
        onSuccess: () => {
          setOpen(false);
          setNewCompensationLabel(defaultValue);
          dispatch(fetchApp({}));
          dispatch(
            setOpenSnackbar({ message: "Add Label Compensation success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    setNewCompensationLabel({ ...newCompensationLabel, date: selecteddate });
  }, [selecteddate, open]);

  console.log("label", newCompensationLabel);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setNewCompensationLabel(defaultValue);
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
                value={newCompensationLabel.agentId}
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

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဆေးလိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newCompensationLabel.typeOfCherootId}
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

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              တံဆိပ်အမျိုးအစား
            </Typography>
            <TextField
              value={
                labels.find((l) => l.id === newCompensationLabel.typeOfLabelId)
                  ?.name
              }
              placeholder=""
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ကျန်ရှိလိပ်
            </Typography>
            <TextField
              value={newCompensationLabel.remainBandel}
              placeholder="ကျန်အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              လျော်ပေးလိပ်
            </Typography>
            <TextField
              placeholder="လျော်ပေးအရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationLabel({
                  ...newCompensationLabel,
                  compensationBandle: Number(evt.target.value),
                });
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ပေးချေရမည့်လိပ်
            </Typography>
            <TextField
              placeholder="ပေးချေရမည့်အရေအတွက်"
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
              value={newCompensationLabel.labelPrice}
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
              value={newCompensationLabel.tolAmount}
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
                setNewCompensationLabel({
                  ...newCompensationLabel,
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
              placeholder=" ငွေ(အသေး)"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationLabel({
                  ...newCompensationLabel,
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
                setNewCompensationLabel({
                  ...newCompensationLabel,
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
              setNewCompensationLabel(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleClick}
            loading={isLoading}
            disabled={
              !newCompensationLabel.date ||
              !newCompensationLabel.agentId ||
              !newCompensationLabel.typeOfCherootId ||
              !newCompensationLabel.compensationBandle === undefined ||
              !newCompensationLabel.takeMoneyBandle === undefined ||
              !newCompensationLabel.addCashBig === undefined ||
              !newCompensationLabel.addCashsmall === undefined ||
              !newCompensationLabel.inCash === undefined
            }
          >
            သိမ်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LabelCompensation;
