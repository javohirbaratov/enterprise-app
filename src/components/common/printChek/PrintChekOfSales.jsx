import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { v4 as uuidv4 } from "uuid";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import formatCurrency from "../../../util/formatCurrency";
import LazyImage from "../lazyLoad/LazyImage";
import MainNumberFormat from "../numberFormat/MainNumberFormat";
import PrintChekTable from "./PrintChekTable";

function PrintChekOfSales(props, ref) {
  /* Props */
  const { printData = [] } = props;

  /* Ref */
  const printRef = React.useRef();

  const userData = useSelector(selectCurrentUser);

  /* Memo */
  const tableData = useMemo(() => {
    if (printData?.productList?.length) {
      return printData?.productList.map((item) => {
        return {
          id: uuidv4(),
          name: item?.productName,
          price: item?.price,
          mass: item?.mass,
          completedMass: item?.completedMass,
          total: item?.total,
          supplier: item.supplier,
          agent: item.agent,
        };
      });
    }
    return [];
  }, [printData]);

  /* Handle prind with ref */
  useImperativeHandle(ref, () => ({
    print: handlePrint,
  }));

  /* Handle prind */
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div ref={printRef} className={"printContainer"}>
      <LazyImage imgUrl={"/images/custom-logo.jpg"} width={120} />

      <p style={{ marginBottom: "1rem" }}>My system</p>
      <div>
        <small
          style={{ marginBottom: "1rem", textAlign: "right", fontSize: "12px" }}
        >
          Chek raqami: {printData?.orderId}
        </small>
      </div>

      <table className="printCheckTable printTable border">
        <tbody>
          <tr>
            <td>Mijoz:</td>
            <td>{printData?.customer?.name}</td>
          </tr>
          <tr>
            <td>Mijoz manzili:</td>
            <td>{printData?.customer?.location}</td>
          </tr>
          <tr>
            <td>Mijoz telefon:</td>
            <td>{printData?.customer?.allTelefon[0]}</td>
          </tr>
          <tr>
            <td>Sana:</td>
            <td>{printData?.date}</td>
          </tr>
          <tr>
            <td>Telefon</td>
            <td>+998(98)200-33-53</td>
          </tr>
          <tr>
            <td>Sotuvchi</td>
            <td>
              <div>
                {userData?.name} {userData?.surname} {userData?.telefon}
              </div>
            </td>
          </tr>
          <tr>
            <td>Agent:</td>
            <td>{printData?.agent}</td>
          </tr>
          <tr>
            <td>Yetkazib beruvchi:</td>
            <td>
              <div>
                {printData?.supplier?.name} {printData?.supplier?.telefon}
              </div>
            </td>
          </tr>
          <tr>
            <td>Eski qarz:</td>
            <td>{formatCurrency(printData?.customer?.old_balance)} so'm</td>
          </tr>
        </tbody>
      </table>

      <PrintChekTable
        columns={[
          {
            title: "Nomi",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "kg",
            dataIndex: "mass",
            key: "mass",
            render: (_, { completedMass }) => (
              <span>
                <MainNumberFormat value={completedMass} />
              </span>
            ),
          },
          {
            title: "Narxi so'm",
            dataIndex: "price",
            key: "price",
            render: (price) => <MainNumberFormat value={price} />,
          },
          {
            title: "Summa",
            dataIndex: "total",
            key: "total",
            render: (total) => <MainNumberFormat value={total} />,
          },
        ]}
        data={tableData}
      />
      <div
        style={{
          textAlign: "right",
          marginTop: "-2rem",
          marginBottom: "2rem",
          fontSize: "11px",
          fontWeight: "500",
          paddingTop: "10px",
        }}
      >
        <MainNumberFormat value={printData?.allPoductTotalPrice} /> so'm
      </div>

      <table className="printCheckTable printTable borderRow">
        <tbody>
          <tr>
            <td>Mijoz qarzi:</td>
            <td>
              <MainNumberFormat value={printData?.afterBalance} /> so'm
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          marginTop: "1rem",
          borderTop: "1px solid",
        }}
      >
        <p
          style={{
            paddingBottom: ".5rem",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        >
          "Sofchiken bilan halollik sari"
        </p>
      </div>
    </div>
  );
}

export default forwardRef(PrintChekOfSales);
