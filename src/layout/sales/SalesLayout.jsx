import { Layout, Tag } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useMemo } from "react";
import MainHeader from "../../components/common/mainHeader/MainHeader";
import MainMenu from "../../components/common/mainMenu/MainMenu";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import SalesNotification from "../../components/sales/notification/SalesNotification";
import SalesOrderGrindDrawer from "../../components/sales/orderGrind/SalesOrderGrindDrawer";
import MainSegmented from "../../components/ui/segmented/MainSegmented";
import { useGetSalesReturnProductsHistoryQuery } from "../../features/sales/returnProduct/salesReturnProductApiSlice";
import {
  SALES_CANCEL_HISTORY_ROUTE,
  SALES_CUSTOMERS_ROUTE,
  SALES_CUSTOMER_DATA_ROUTE,
  SALES_DAILY_RECEIPTS_ROUTE,
  SALES_RESOLVED_DEBT_HISTORY_ROUTE,
  SALES_ORDER_HISTORY_ROUTE,
  SALES_ORDER_TO_GRIND_ROUTE,
  SALES_ORDER_TO_UPLOADER_ROUTE,
  SALES_REPORT_ALL_ROUTE,
  SALES_REPORT_CUSTOMER_ROUTE,
  SALES_REPORT_ROUTE,
  SALES_RETURN_PRODUCT_ROUTE,
} from "../../util/path";

function SalesLayout() {
  const { data } = useGetSalesReturnProductsHistoryQuery();

  /* Memo */
  const returnProductsCount = useMemo(() => {
    if (
      data?.success === true &&
      data?.data &&
      data?.data?.list &&
      Array.isArray(data?.data?.list)
    ) {
      return data.data.list.length;
    }
    return [];
  }, [data]);

  /* TABS */
  const headerTabs = [
    {
      value: SALES_ORDER_TO_GRIND_ROUTE,
      label: "Maydalashga buyurtma jo'natish",
    },
    {
      value: SALES_ORDER_TO_UPLOADER_ROUTE,
      label: "Yuklovchiga buyurtma jo'natish",
    },
    // {
    //   value: SALES_PRODUCT_SALE_ROUTE,
    //   label: "Mahsulot sotish",
    // },
    {
      value: SALES_CUSTOMERS_ROUTE,
      label: "Mijozlar",
    },
    {
      value: SALES_ORDER_HISTORY_ROUTE,
      label: "Buyurtmalar tarixi",
    },
    {
      value: SALES_RETURN_PRODUCT_ROUTE,
      label: (
        <div
          style={{
            background: "#fff1f0",
            margin: "0 -11px",
            padding: "0 11px",
            border: "1px solid #ffccc7",
            borderRadius: "6px",
          }}
        >
          Qaytarilgan buyurtmalar <Tag color="red">{returnProductsCount}</Tag>
        </div>
      ),
    },
    {
      value: SALES_REPORT_ROUTE,
      label: "Hisobot",
    },
    {
      value: SALES_REPORT_CUSTOMER_ROUTE,
      label: "Mijozlarning hisobotlari",
    },
    {
      value: SALES_REPORT_ALL_ROUTE,
      label: "Interval hisobat",
    },
    {
      value: SALES_DAILY_RECEIPTS_ROUTE,
      label: "Kunlik kirimlar",
    },
    {
      value: SALES_CANCEL_HISTORY_ROUTE,
      label: "Bekor qilingan buyurtmalar tarixi",
    },
    {
      value: SALES_CUSTOMER_DATA_ROUTE,
      label: "Mijoz va uning ma'lumotlari",
    },
    {
      value: SALES_RESOLVED_DEBT_HISTORY_ROUTE,
      label: "Yechilgan qarzlar tarixi",
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Header */}
      <MainHeader
        menu={
          <MainMenu
            otherItems={
              <>
                <SalesOrderGrindDrawer />
                <SalesNotification />
              </>
            }
          />
        }
      />

      {/* Tab panel */}
      <div>
        <MainSegmented options={headerTabs} />
      </div>

      {/* Content */}
      <Content
        style={{
          padding: "0 24px",
          minHeight: 280,
          overflow: "auto",
        }}
      >
        {/* Outlet */}
        <MainOutlet />
      </Content>
    </Layout>
  );
}

export default SalesLayout;
