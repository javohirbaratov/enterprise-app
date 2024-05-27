import { Row } from "antd";
import React, { useMemo, useState } from "react";
import AdminStatisticCard from "../../../components/admin/statistic/AdminStatisticCard";
import ColumnBarChart from "../../../components/common/charts/ColumnBarChart";
import LineChart from "../../../components/common/charts/line/LineChart";
import { useGetAdminBalanceQuery } from "../../../features/admin/statistic/adminStatisticApiSlice";
import MainRangeDatePicker from "../../../components/ui/rangeDatePicker/MainRangeDatePicker";
import { useGetAdminBenefitQuery } from "../../../features/admin/benefit/adminBenefitApiSlice";

function AdminHome() {
  // State 
  const [selectDate, setSelectDate] = useState({
    start: "",
    end: "",
  });
  // Api 
  const { data, isLoading, isError, refetch } = useGetAdminBalanceQuery();
  const dataBenefit = useGetAdminBenefitQuery({
    ...selectDate
  })

  const { bank, karta, naqdUsd, naqdSum } = useMemo(() => {
    if (data?.success === true && data?.data) {
      return {
        bank: data?.data?.bank,
        karta: data?.data?.karta,
        naqdUsd: data?.data?.naqdusd,
        naqdSum: data?.data?.naqdsum,
      };
    }
    return {};
  }, [data]);

  const {balans, foyda, harajat, ostatka, saldo, taminotchi} = useMemo(() => {
    if (dataBenefit.data?.success === true && dataBenefit.data?.data) {
      return {
        balans: dataBenefit.data?.data?.balans,
        foyda: dataBenefit.data?.data?.foyda,
        harajat: dataBenefit.data?.data?.harajat,
        ostatka: dataBenefit.data?.data?.ostatka,
        saldo: dataBenefit.data?.data?.saldo,
        taminotchi: dataBenefit.data?.data?.taminotchi,
      };
    }
    return {};
  }, [dataBenefit.data]);
  console.log();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <Row gutter={[1, 1]}>
        <MainRangeDatePicker setValue={setSelectDate} value={selectDate} />
      </Row>
      <Row gutter={[16, 16]}>
        <AdminStatisticCard
          danger={naqdSum < 0}
          title={"Naqd so'm"}
          value={naqdSum}
          isLoading={isLoading}
        />
        <AdminStatisticCard
          danger={naqdUsd < 0}
          title={"Naqd USD"}
          value={naqdUsd || 0}
          isLoading={isLoading}
          suffix="$"
        />
        <AdminStatisticCard
          danger={bank < 0}
          title={"Bank"}
          value={bank || 0}
          isLoading={isLoading}
        />
        <AdminStatisticCard
          danger={karta < 0}
          title={"Karta"}
          value={karta || 0}
          isLoading={isLoading}
        />
        <AdminStatisticCard
          danger={balans < 0}
          title={"Balans"}
          value={balans || 0}
          isLoading={dataBenefit.isLoading}
        />
        <AdminStatisticCard
          danger={foyda < 0}
          title={"Foyda"}
          value={foyda || 0}
          isLoading={dataBenefit.isLoading}
        />
        <AdminStatisticCard
          danger={harajat < 0}
          title={"Harajat"}
          value={harajat || 0}
          isLoading={dataBenefit.isLoading}
        />
        <AdminStatisticCard
          danger={ostatka < 0}
          title={"Ostatka"}
          value={ostatka || 0}
          isLoading={dataBenefit.isLoading}
        />
        <AdminStatisticCard
          danger={saldo < 0}
          title={"Saldo"}
          value={saldo || 0}
          isLoading={dataBenefit.isLoading}
        />
        <AdminStatisticCard
          danger={taminotchi < 0}
          title={"Taminotchi"}
          value={taminotchi || 0}
          isLoading={dataBenefit.isLoading}
        />
      </Row>

      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <ColumnBarChart />
        <LineChart />
      </div>
    </div>
  );
}

export default AdminHome;
