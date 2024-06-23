import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createCompensationFilterSize } from "@/types/compensationFilterType";
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
  CreatedCompensationFilterSize,
  setIsLoading,
} from "@/store/slices/compensationFilterSize";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { fetchApp } from "@/store/slices/app";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createCompensationFilterSize = {
  date: null,
  agentId: undefined,
  typeOfCherootId: undefined,
  typeOfFilterId: undefined,
  remainQty: 0,
  compensationQty: 0,
  takeMoneyQty: 0,
  filterPrice: 0,
  tolAmount: 0,
  addCashBig: 0,
  addCashsmall: 0,
  inCash: 0,
};

const FilterCompensation = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.compensationFilter);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (a) => a.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const [newCompensationFilter, setNewCompensationFilter] =
    useState<createCompensationFilterSize>(defaultValue);
  const remainFilter = useAppSelector(
    (store) => store.agentRemainFilter.item
  ).filter((a) => a.workShopId === workShopId);

  const handelAgent = (agentId: number) => {
    const find = remainFilter.find(
      (l) =>
        l.agentId === agentId &&
        l.typeOfCherootId === newCompensationFilter.typeOfCherootId
    );
    const filter = filterSizes.find((l) => l.id === find?.typeOfFilterSizeId);
    const tolPrice = filter
      ? newCompensationFilter.takeMoneyQty * filter.price
      : 0;
    setNewCompensationFilter({
      ...newCompensationFilter,
      agentId,
      typeOfFilterId: find ? find.typeOfFilterSizeId : undefined,
      filterPrice: filter ? filter.price : 0,
      remainQty: find ? find.quantity : 0,
      tolAmount: tolPrice,
    });
  };

  const handleCheroot = (cherootId: number) => {
    const find = remainFilter.find(
      (l) =>
        l.agentId === newCompensationFilter.agentId &&
        l.typeOfCherootId === cherootId
    );
    const filter = filterSizes.find((l) => l.id === find?.typeOfFilterSizeId);
    const tolPrice = filter
      ? newCompensationFilter.takeMoneyQty * filter.price
      : 0;
    setNewCompensationFilter({
      ...newCompensationFilter,
      typeOfCherootId: cherootId,
      typeOfFilterId: find ? find.typeOfFilterSizeId : undefined,
      remainQty: find ? find.quantity : 0,
      filterPrice: filter ? filter.price : 0,
      tolAmount: tolPrice,
    });
  };

  const handleTake = (qty: number) => {
    const tolPrice = qty * newCompensationFilter.filterPrice;
    setNewCompensationFilter({
      ...newCompensationFilter,
      takeMoneyQty: qty,
      tolAmount: tolPrice,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreatedCompensationFilterSize({
        ...newCompensationFilter,
        onSuccess: () => {
          setOpen(false);
          setNewCompensationFilter(defaultValue);
          dispatch(fetchApp({}));
          dispatch(
            setOpenSnackbar({ message: "Add Filter Size Compensation success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    setNewCompensationFilter({ ...newCompensationFilter, date: selecteddate });
  }, [selecteddate, open]);
  console.log("filter", newCompensationFilter);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setNewCompensationFilter(defaultValue);
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
                value={newCompensationFilter.agentId}
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
                value={newCompensationFilter.typeOfCherootId}
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
              အစီခံအမျိုးအစား
            </Typography>
            <TextField
              value={
                filterSizes.find(
                  (f) => f.id === newCompensationFilter.typeOfFilterId
                )?.name
              }
              placeholder=""
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ကျန်အရေအတွက်
            </Typography>
            <TextField
              value={newCompensationFilter.remainQty}
              placeholder="ကျန်အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              လျော်ပေးအရေအတွက်
            </Typography>
            <TextField
              placeholder="လျော်ပေးအရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationFilter({
                  ...newCompensationFilter,
                  compensationQty: Number(evt.target.value),
                });
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ပေးချေရမည့်အရေအတွက်
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
              value={newCompensationFilter.filterPrice}
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
              value={newCompensationFilter.tolAmount}
              placeholder="စုစုပေါင်းဈေးနှုန်း"
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
                setNewCompensationFilter({
                  ...newCompensationFilter,
                  addCashBig: Number(evt.target.value),
                });
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              {" "}
              ငွေ(အသေး)
            </Typography>
            <TextField
              placeholder="ငွေ(အသေး)"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationFilter({
                  ...newCompensationFilter,
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
                setNewCompensationFilter({
                  ...newCompensationFilter,
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
              setNewCompensationFilter(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleClick}
            loading={isLoading}
            disabled={
              !newCompensationFilter.date ||
              !newCompensationFilter.agentId ||
              !newCompensationFilter.typeOfCherootId ||
              !newCompensationFilter.compensationQty === undefined ||
              !newCompensationFilter.takeMoneyQty === undefined ||
              !newCompensationFilter.addCashBig === undefined ||
              !newCompensationFilter.addCashsmall === undefined ||
              !newCompensationFilter.inCash === undefined
            }
          >
            သိမ်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterCompensation;
