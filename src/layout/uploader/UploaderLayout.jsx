import {
  AppstoreAddOutlined,
  AuditOutlined,
  DatabaseOutlined, DropboxOutlined,
  HistoryOutlined,
  RetweetOutlined,
  RollbackOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomDrawer from "../../components/common/bottomDrawer/BottomDrawer";
import MainMobileHeader from "../../components/common/mobile/header/MainMobileHeader";
import MobileHeaderDrawer from "../../components/common/mobileHeaderDrawer/MobileHeaderDrawer";
import MainOutlet from "../../components/common/outlet/MainOutlet";
import SalesOrderGrindDrawer from "../../components/sales/orderGrind/SalesOrderGrindDrawer";
import UploaderBottomBar from "../../components/uploader/bottomBar/UploaderBottomBar";
import UploaderHome from "../../page/uploader/home/UploaderHome";
import {
  UPLOADER_HOME_ROUTE,
  UPLOADER_NOTIF_FROM_MAYDALASH_ROUTE,
  UPLOADER_NOTIF_FROM_SALES_ROUTE,
  UPLOADER_ORDER_GRIND_ROUTE,
  UPLOADER_ORDER_HISTORY_ROUTE,
  UPLOADER_POLKA_ROUTE,
  UPLOADER_PRODUCTS_ROUTE,
  UPLOADER_REGRIND_ROUTE,
  UPLOADER_REPORT_OUTPUTS_ROUTE,
  UPLOADER_REPORT_PATERIYA_ROUTE,
  UPLOADER_REPORT_RECEPTION_ROUTE,
  UPLOADER_REPORT_ROUTE, UPLOADER_RESIDUE_ROUTE,
  UPLOADER_RETURN_PRODUCT_ROUTE,
  UPLOADER_SPARE_ROUTE
} from "../../util/path";

function UploaderLayout() {
  return <NavigatePage/>;
}

function NavigatePage() {
  /* Location */
  const {pathname} = useLocation();

  /* Navigate */
  const navigate = useNavigate();

  /* State */
  const [showPage, setShowPage] = React.useState(false);

  useEffect(() => {
    if (pathname === UPLOADER_HOME_ROUTE) {
      setShowPage(false);
    } else {
      setShowPage(true);
    }
  }, [pathname]);

  function handleCloseOtherPage() {
    navigate(UPLOADER_HOME_ROUTE);
  }

  switch (pathname) {
    case UPLOADER_HOME_ROUTE:
      return (
        <LayoutBox>
          {/* Supplier's Home page */}
          <UploaderHome/>
        </LayoutBox>
      );
    case UPLOADER_NOTIF_FROM_MAYDALASH_ROUTE:
    case UPLOADER_NOTIF_FROM_SALES_ROUTE:
    case UPLOADER_POLKA_ROUTE:
      return (
        <LayoutBox>
          {/* Supplier's Home page */}
          <UploaderHome/>

          {showPage && pathname !== UPLOADER_HOME_ROUTE ? (
            <BottomDrawer onClose={handleCloseOtherPage}>
              {/* Outlet */}
              <MainOutlet/>
            </BottomDrawer>
          ) : null}
        </LayoutBox>
      );
    default:
      return (
        <LayoutBox>
          {/* Outlet */}
          <MainOutlet/>
        </LayoutBox>
      );
  }
}

function LayoutBox({children}) {
  /* Ref */
  const headerDrawerRef = useRef(null);

  const handleOpenHeaderDrawerMenu = () => {
    headerDrawerRef.current?.onOpen();
  };

  return (
    <div
      style={{
        marginBottom: "100px",
        minHeight: "calc(100vh - 58px)",
      }}
    >
      {/* Header */}
      <MainMobileHeader
        styles={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClickMenu={handleOpenHeaderDrawerMenu}
        customItems={
          <div style={{display: "flex", gap: "0.5rem", alignItems: "center"}}>
            {/* <UploaderProdCombine/> */}
            <SalesOrderGrindDrawer/>
          </div>
        }
      />

      {/* Drawer menu */}
      <MobileHeaderDrawer
        ref={headerDrawerRef}
        listItems={[
          {
            title: "Qayta maydalash",
            icon: <RetweetOutlined/>,
            path: UPLOADER_REGRIND_ROUTE,
          },
          {
            title: "Zahira partiya",
            icon: <DatabaseOutlined/>,
            path: UPLOADER_SPARE_ROUTE,
          },
          // {
          //   title: "Jami Zahira",
          //   icon: <DatabaseOutlined />,
          //   path: UPLOADER_SPARE_ROUTE,
          // },
          {
            title: "Qaytarilgan mahsulotlar",
            icon: <RollbackOutlined/>,
            path: UPLOADER_RETURN_PRODUCT_ROUTE,
          },
          {
            title: "Mahsulotlar",
            icon: <UnorderedListOutlined/>,
            path: UPLOADER_PRODUCTS_ROUTE,
          },
          {
            title: "Maydalashga buyurtma berish",
            icon: <AppstoreAddOutlined/>,
            path: UPLOADER_ORDER_GRIND_ROUTE,
          },
          {
            title: "Hisobotlar",
            icon: <AuditOutlined/>,
            path: UPLOADER_REPORT_ROUTE,
          },
          // {
          //   title: "Hamma mijozlarning hisoblari",
          //   icon: <AuditOutlined/>,
          //   path: UPLOADER_REPORT_ALL_ROUTE,
          // },
          {
            title: "Buyurtmalar tarixi",
            icon: <HistoryOutlined/>,
            path: UPLOADER_ORDER_HISTORY_ROUTE,
          },
          {
            title: "Pateriya hisobi",
            icon: <AuditOutlined/>,
            path: UPLOADER_REPORT_PATERIYA_ROUTE,
          },
          {
            title: "Krim yuk hisoboti",
            icon: <AuditOutlined/>,
            path: UPLOADER_REPORT_RECEPTION_ROUTE,
          },
          {
            title: "Chiqim hisobotlari",
            icon: <AuditOutlined/>,
            path: UPLOADER_REPORT_OUTPUTS_ROUTE,
          },
          {
            title: "Ostatka",
            icon: <DropboxOutlined />,
            path: UPLOADER_RESIDUE_ROUTE,
          },
        ]}
      />
      <div style={{padding: "0 15px"}}>
        {/* Content */}
        {children}
      </div>

      {/* Bottom Navigation */}
      <UploaderBottomBar/>
    </div>
  );
}

export default UploaderLayout;
