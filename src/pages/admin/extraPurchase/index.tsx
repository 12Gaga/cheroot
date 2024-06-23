import LabelExtra from "@/components/extraPur/extraLabel";
import FilterSizeExtra from "@/components/extraPur/extraPurFilterSize";
import TabaccoExtra from "@/components/extraPur/extraTabacco";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CreateExtraPurchase,
  setIsLoading,
} from "@/store/slices/extraPurchase";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewExtraPurchase } from "@/types/extraPurchaseType";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const defaultValue: createNewExtraPurchase = {
  date: null,
  agentId: undefined,
  typeOfCherootId: undefined,
  typeOfFilterSizeId: undefined,
  filterSizeQty: 0,
  filterSizeBag: 0,
  filterSizePrice: 0,
  filterSizeAmount: 0,
  typeOfTabaccoId: undefined,
  tabaccoQty: 0,
  tabaccoTin: 0,
  tabaccoPyi: 0,
  tabaccoBag: 0,
  tabaccoPrice: 0,
  tabaccoAmount: 0,
  typeOfLabelId: undefined,
  labelBandle: 0,
  labelPrice: 0,
  labelAmount: 0,
  totalAmount: 0,
  garageId: undefined,
};
const ExtraPurchase = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.extraPurchase);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const [newExtraPurchase, setNewExtraPurchase] =
    useState<createNewExtraPurchase>(defaultValue);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const agent = useAppSelector((store) => store.agent.item);
  const concernAgent = agent.filter((item) => item.workShopId === workShop);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (c) => c.workShopId === workShop
  );
  const garage = useAppSelector((store) => store.garage.item);
  const concernGarage = garage.filter((item) => item.workShopId === workShop);
  const filterSize = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSize = filterSize.filter(
    (item) => item.workShopId === workShop
  );
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter((item) => item.workShopId === workShop);
  const label = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabel = label.filter((item) => item.workShopId === workShop);
  const formula = useAppSelector((store) => store.formula.item);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateExtraPurchase({
        ...newExtraPurchase,
        onSuccess: () => {
          setNewExtraPurchase(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Extra Purchase success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  const handleCheroot = (cherootId: number) => {
    const findFormula = formula.find((f) => f.typeOfCherootId === cherootId);
    setNewExtraPurchase({
      ...newExtraPurchase,
      typeOfFilterSizeId: findFormula
        ? findFormula.typeOfFilterSizeId
        : concernFilterSize[0].id,
      typeOfTabaccoId: findFormula
        ? findFormula.typeOfTabaccoId
        : concernTabacco[0].id,
      typeOfCherootId: findFormula
        ? findFormula.typeOfCherootId
        : concernTabacco[0].id,
      date: selecteddate,
    });
  };

  useEffect(() => {
    setNewExtraPurchase({ ...newExtraPurchase, date: selecteddate });
  }, [selecteddate]);

  useEffect(() => {
    if (concernFilterSize.length) {
      setNewExtraPurchase({
        ...newExtraPurchase,
        typeOfFilterSizeId: concernFilterSize[0].id,
        typeOfTabaccoId: concernTabacco[0].id,
        typeOfLabelId: concernLabel[0].id,
        date: selecteddate,
      });
      console.log("hello");
    }
  }, [filterSize]);

  console.log("datedfg", newExtraPurchase);
  if (!session) return;
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          ထပ်ဝယ်စာရင်း
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            mt: 2,
            ml: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold", mr: 2 }}>
            ကိုယ်စားလှယ်အမည်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newExtraPurchase?.agentId}
              onChange={(evt) => {
                setNewExtraPurchase({
                  ...newExtraPurchase,
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

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 120 }}>
            ဂိုထောင်အမည်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newExtraPurchase.garageId}
              onChange={(evt) => {
                setNewExtraPurchase({
                  ...newExtraPurchase,
                  garageId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernGarage.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5, mt: 2 }}>
          <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => setSelectedDate(date as Date)}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: 400,
          mt: 2,
          ml: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold", mr: 2 }}>
          ဆေးလိပ်အမျိုးအစား
        </Typography>
        <FormControl variant="filled" sx={{ width: 225 }}>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={newExtraPurchase?.typeOfCherootId}
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

      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        အဆီခံ
      </Typography>

      <FilterSizeExtra
        newExtraPurchase={newExtraPurchase}
        setNewExtraPurchase={setNewExtraPurchase}
        workshopId={workShop}
      />

      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        ဆေးစပ်
      </Typography>

      <TabaccoExtra
        newExtraPurchase={newExtraPurchase}
        setNewExtraPurchase={setNewExtraPurchase}
        workshopId={workShop}
      />

      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        တံဆိပ်
      </Typography>

      <LabelExtra
        newExtraPurchase={newExtraPurchase}
        setNewExtraPurchase={setNewExtraPurchase}
        workshopId={workShop}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          disabled={
            !newExtraPurchase.agentId ||
            !newExtraPurchase.garageId ||
            !newExtraPurchase.typeOfCherootId
          }
          sx={{
            bgcolor: "#D83E3E",
            width: 220,
            height: 50,
            fontSize: 18,
            borderRadius: 10,
            mr: 2,
            "&:hover": {
              bgcolor: "#F7A71B",
              color: "white",
              fontWeight: "bold",
            },
          }}
          onClick={() => handleClick()}
        >
          သိမ်းမည်
        </LoadingButton>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#D83E3E",

            width: 220,
            height: 50,
            fontSize: 18,
            borderRadius: 10,
            "&:hover": {
              bgcolor: "#FCB500",
              color: "white",
              fontWeight: "bold",
            },
          }}
          onClick={() => router.push("/admin/home")}
        >
          ထွက်မည်
        </Button>
      </Box>
    </>
  );
};
export default ExtraPurchase;
