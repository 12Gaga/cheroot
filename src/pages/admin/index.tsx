import { useRef } from "react";

const student = [
  { name: "မောင်မောင်", age: "၂၀", address: "ရန်ကုန်" },
  { name: "စုစု", age: "၁၈", address: "တောင်ငူ" },
  { name: "အေးအေး", age: "၂၁", address: "မန္တလေး" },
];

const AdminPage = () => {
  const tableRef = useRef(null);

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

      <button className="print-btn" onClick={() => handlePrint()}>
        Print
      </button>
    </>
  );
};

export default AdminPage;
