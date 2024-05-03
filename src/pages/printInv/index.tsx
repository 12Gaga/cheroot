import { Box, Button, TextField, Typography } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const student = [
  { name: "မောင်မောင်", age: "၂၀", address: "ရန်ကုန်" },
  { name: "စုစု", age: "၁၈", address: "တောင်ငူ" },
  { name: "အေးအေး", age: "၂၁", address: "မန္တလေး" },
];

const Print = () => {
  const tableRef = useRef(null);
  const [value, setValue] = useState<string>("myanmar");
  console.log("value", value);
  const handlePrint = () => {
    if (tableRef.current) {
      window.print();
    }
  };
  return (
    <>
      <table border={1} ref={tableRef}>
        <thead>
          <tr style={{ border: "1px solid" }}>
            <th>အမည်</th>
            <th>အသက်</th>
            <th>နေရပ်လိပ်စာ</th>
          </tr>
        </thead>
        {student.map((item) => (
          <thead key={item.name}>
            <tr style={{ border: "1px solid" }}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
            </tr>
          </thead>
        ))}
      </table>

      <Button
        variant="contained"
        className="print-btn"
        onClick={() => handlePrint()}
        style={{ marginTop: 5 }}
      >
        Print
      </Button>
      <br />
      {console.log("value2", value)}
      <TextField
        className="print-btn"
        placeholder="ဝယ်ယူခဲ့သည့်ဆိုင်"
        sx={{ bgcolor: "#EEE8CF", my: 2 }}
        value={value}
        onChange={(evt) => {}}
      />
      <h1>{value}</h1>
      <Button
        className="print-btn"
        onClick={() => setValue("Korea")}
        variant="contained"
        sx={{ mt: 3, ml: 1 }}
      >
        click
      </Button>
      {console.log("value3", value)}
    </>
  );
};

export default Print;
