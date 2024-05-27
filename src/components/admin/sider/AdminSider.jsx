import {
  ApartmentOutlined,
  AppstoreOutlined,
  AuditOutlined,
  CarOutlined,
  CloudUploadOutlined,
  ContactsOutlined,
  CreditCardOutlined,
  DollarOutlined,
  DropboxOutlined,
  FundProjectionScreenOutlined,
  InteractionOutlined,
  PieChartOutlined,
  RiseOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { admin_routes } from "../../../util/path";
import LazyImage from "../../common/lazyLoad/LazyImage";

const { Sider } = Layout;

const siderLocalName = "siderCollapsed";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const checkOpen = (items) => {
  let result = items.find((item) => {
    if (item.key === window.location.pathname) return item;
    else if (item.children) {
      return item.children.find((i) => i.key === window.location.pathname);
    }
    return null;
  });
  return result?.key.toString();
};

const items = [
  getItem("Dashboard", admin_routes.home, <PieChartOutlined size={200} />),

  // Settings 
  getItem("Sozlamalar", "sub-1", <ApartmentOutlined />, [
    // Department
    getItem("Bo'lim", admin_routes.department, <ApartmentOutlined />),
    // Polka 
    getItem("Polka", admin_routes.polka, <AppstoreOutlined />),
    // Products 
    getItem("Mahsulotlar", admin_routes.product, <UnorderedListOutlined />),
    // Workers 
    getItem("Ishchilar", admin_routes.workers, <UsergroupAddOutlined />),
    // Custumer rate
    getItem(
      "Mijoz tariflari",
      admin_routes.customerCategory,
      <UserSwitchOutlined />
    ),
    // Users 
    getItem("Foydalanuvchilar", admin_routes.user, <UserOutlined />),
    // Exepences 
    getItem("Xarajat", "sub1", <CreditCardOutlined />, [
      getItem("Xarajat", admin_routes.expenses),
      getItem("Xarajat turi", admin_routes.expensesCategory),
    ]),
  ]),

  //Statistcs
  getItem("Statistika", "sub-2", <RiseOutlined />, [
    getItem("Yetkazib beruvchilar hisoboti", admin_routes.reportSupplier),
  ]),
  // Dvidends
  getItem("Dvidentlar", "sub-3", <FundProjectionScreenOutlined />, [
    getItem("Pul olish", admin_routes.devident),
    getItem("Pul qo'yish", admin_routes.devidentAnclose),
    getItem("Dividend turi", admin_routes.devidentCategory),
  ]),
  {
    type: "divider",
  },

  getItem("Bo'limlar faoliyati", "sub-4", <UnorderedListOutlined />, [
    // Ostatka 
    getItem("Ostatka", admin_routes.residue, <DropboxOutlined />),
    // Grinding report 
    getItem("Maydalash hisoboti", admin_routes.reportGrind, <AuditOutlined />),
    // Storage
    getItem("Saqlash bo'limi", "sub2", <DropboxOutlined />, [
      getItem("Sklad", admin_routes.storageSkladDepart),
      getItem("Taminotchilar", admin_routes.storageProviderDepart),
      getItem("Maydalash bo'limidan", admin_routes.storageOrderFromGrindDepart),
      getItem("Xom ashyo zahirasi", admin_routes.storagePolkaDepart),
      getItem("Bajarilgan buyurtmalar", admin_routes.storageCompltedOrderDepart),
      getItem("Mahsulotlar", admin_routes.storageSpareDepart),
      getItem("Hisibotlar", admin_routes.storageReportDepart),
      getItem(
        "Hamma mijozlarning hisoblari",
        admin_routes.storageReportCustomerDepart
      ),
    ]),
    // Grind
    getItem("Maydalash bo'limi", "sub3", <InteractionOutlined />, [
      getItem("Sotuv bo'limidan", admin_routes.grindOrderFromSalesDepart),
      getItem("Saqlash bo'limidan", admin_routes.grindOrderFromStorageDepart),
      getItem("Maydalashdan chiqarilganlar", admin_routes.grindOutFromGrindDepart),
      getItem("Qayta maydalash", admin_routes.grindRegrindDepart),
      getItem(
        "Qayta maydalanganlar tarixi",
        admin_routes.grindRegrindHistoryDepart
      ),
      // getItem("Zahira", AdminRoutes.grindSpareDepart),
      getItem("Zahira mahsulotlar", admin_routes.grindSpareProductsDepart),
    ]),
    // Sales
    getItem("Sotuv bo'limi", "sub4", <ShopOutlined />, [
      getItem("Maydalashga buyurtma jo'natish", admin_routes.salesGrindDepart),
      getItem(
        "Yuklovchiga buyurtma jo'natish",
        admin_routes.salesOrderToUploaderDepart
      ),
      getItem("Mijozlar", admin_routes.salesCustomerDepart),
      getItem("Buyurtmalar tarixi", admin_routes.salesOrderHistoryDepart),
      getItem("Qaytarilgan buyurtmalar", admin_routes.salesOrderReturnedDepart),
      getItem("Hisobotlar", admin_routes.salesReportDepart),
      getItem("Mijozlarning hisobotlari", admin_routes.salesReportCustomerDepart),
      getItem("Interval hisobot", admin_routes.salesReportAllDepart),
      getItem("Kunlik kirimlar", admin_routes.salesDailyReceiptsDepart),
      getItem("Yechilgan qarzlar tarixi", admin_routes.salesResolvedDebtHistory),
    ]),
    // Uploader
    getItem("Yuklovchi bo'limi", "sub5", <CloudUploadOutlined />, [
      getItem("Bosh sahifasi", admin_routes.uploaderDepart),
      getItem(
        "Maydalashdan tushgan buyurtmalar",
        admin_routes.uploaderOrderFromGrindProcessDepart
      ),
      getItem(
        "Qayta maydalashdan tushgan buyurtmalar",
        admin_routes.uploaderRegrindProcessDepart
      ),
      getItem(
        "Sotuvdan tushgan buyurtmalar",
        admin_routes.uploaderOrderFromSalesProcessDepart
      ),
      getItem("Almashtirish", admin_routes.uploaderReplaceDepart),
      getItem("Qayta maydalashdan", admin_routes.uploaderRegrindDepart),
      getItem("Zahira partiya", admin_routes.uploaderSparePartiyaDepart),
      getItem(
        "Qaytarilgan mahsulotlar",
        admin_routes.uploaderReturnedProductsDepart
      ),
      // getItem("Mahsulotlar", admin_routes.uploaderProductsDepart),
      getItem(
        "Maydalashga buyurtma berish",
        admin_routes.uploaderOrderToGrindDepart
      ),
      getItem("Buyurtmalar tarixi", admin_routes.uploaderOrderHistoryDepart),
      // getItem("Hisobotlar", admin_routes.uploaderReportDepart),
      getItem("Pateriya hisoboti", admin_routes.uploaderReportPateriyaDepart),
      getItem("Krim yuk hisoboti", admin_routes.uploaderReportReceptionDepart),
      getItem("Chiqim hisobotlari", admin_routes.uploaderReportOutputDepart),
    ]),
    // Agent
    getItem("Agent bo'limi", "sub6", <ContactsOutlined />, [
      getItem("Bosh sahifa", admin_routes.agentDepart),
    ]),
    // Supplier
    getItem("Yetkazib berish bo'limi", "sub7", <CarOutlined />, [
      getItem("Bosh sahifasi", admin_routes.supplierDepart),
      getItem("Qarz", admin_routes.supplierDebtDepart),
      getItem("Balans", admin_routes.supplierBalansDepart),
      getItem("Almashtirish", admin_routes.supplierChangeOrderDepart),
      getItem("Mahsulotni qaytarish", admin_routes.supplierReturnProductDepart),
      getItem("Hisobotlar", admin_routes.supplierReportDepart),
      getItem(
        "Hamma mijozlarning hisobotlari",
        admin_routes.supplierReportCustomerDepart
      ),
      getItem(
        "Topshirilgan buyurtmalar",
        admin_routes.supplierSubmittedOrdersDepart
      ),
    ]),
    // Cashier
    getItem("Kassir bo'limi", "sub8", <DollarOutlined />, [
      getItem("Bosh sahifa", admin_routes.cashierDepart),
      getItem(
        "Taminotchiga berilgan pullar",
        admin_routes.cashierProviderMoneyGiven
      ),
      getItem("Taminotchi hisoboti", admin_routes.cashierProviderReport),
      getItem("Dostavkachi balansi", admin_routes.cashierSupplierBalans),
      getItem(
        "Dostavkachidan olingan pullar",
        admin_routes.cashierSupplierGetMoney
      ),
      getItem("Mijozlardan olingan pullar", admin_routes.cashierCustomerGetMoney),
      getItem("Xarajatlar", admin_routes.cashierExpenses),
      getItem("Oylik", admin_routes.cashierSalary),
      // getItem(
      //   "Tayyor mahsulotlar bo'limi",
      //   admin_routes.cashierCompletedProductSection
      // ),
      getItem("Ayirboshlanganlar tarixi", admin_routes.cashierExchangeHistory),
    ]),
  ]),
];

const AdminSider = ({ collapsed, setCollapsed }) => {
  /* Menu open items */
  let checkOpenItemValue = checkOpen(items);

  /* State */
  const [active, setActive] = useState({
    sub: checkOpenItemValue,
    item: window.location.pathname,
  });

  /* Navigate */
  const navigate = useNavigate();

  /* Location */
  const { pathname } = useLocation();

  /* Config */
  useEffect(() => {
    const res = localStorage.getItem(siderLocalName);
    setCollapsed(res === "active");
  }, [setCollapsed]);

  /* Collapse sider */
  const onCollapse = (val) => {
    setCollapsed(val);
    const newCollapse = collapsed;
    let status = "active";
    if (newCollapse) status = "notActive";

    localStorage.setItem(siderLocalName, status);
  };

  useEffect(() => {
    setActive({
      sub: checkOpen(items),
      item: window.location.pathname,
    });
  }, [pathname]);

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      defaultCollapsed={true}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 99,
      }}
      width={280}
    >
      <Link to={admin_routes.home}>
        {collapsed ? (
          <LazyImage imgUrl={"/images/logo-light-min.png"} width={70} />
        ) : (
          <LazyImage imgUrl={"/images/logo-light.png"} width={120} />
        )}
      </Link>
      <Menu
        style={{ height: "calc(100vh - 100px)", overflow: "auto" }}
        theme="dark"
        selectedKeys={[active.item]}
        defaultOpenKeys={[active.sub]}
        defaultSelectedKeys={[active.item]}
        mode="inline"
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AdminSider;
