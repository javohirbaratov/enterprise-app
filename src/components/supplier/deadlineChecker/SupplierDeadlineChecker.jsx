import React, { useEffect, useMemo, useState } from "react";
import MainOutlet from "../../common/outlet/MainOutlet";
import MainModal from "../../common/modal/MainModal";
import styles from "./supplierDeadlineChecker.module.css";
import { Button, message, Skeleton, Space } from "antd";
import { useGetSupplierDeadlineQuery } from "../../../features/supplier/deadline/supplierDeadlineApiSlice";
import { SUPPLIER_DEADLINE_ROUTE } from "../../../util/path";
import { useLocation, useNavigate } from "react-router-dom";

function SupplierDeadlineChecker() {
  const initialDuration = 5; // s

  // State
  const [open, setOpen] = useState(true);
  const [durationSec, setDurationSec] = useState(initialDuration);

  // Navigate
  const navigate = useNavigate();

  // Location
  const { pathname } = useLocation();

  // Modal
  const handleCloseModal = () => {
    if (durationSec !== 0) return;
    onClose();
  };

  const onClose = () => setOpen(false);

  // duration
  useEffect(() => {
    if (open && pathname !== SUPPLIER_DEADLINE_ROUTE) {
      const interval = setInterval(() => {
        setDurationSec((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [open, pathname]);

  /* API */
  const { data, isLoading, isError, refetch, isFetching } =
    useGetSupplierDeadlineQuery();

  const totalCount = useMemo(() => {
    if (isError) {
      refetch();
      return 0;
    }

    if (data?.success === true && data?.data && Array.isArray(data?.data)) {
      return data.data.length;
    }
    return 0;
  }, [data, isError]);

  // Handle navigate
  const handleNavigate = () => {
    navigate(SUPPLIER_DEADLINE_ROUTE);
  };

  if (pathname === SUPPLIER_DEADLINE_ROUTE) {
    return <MainOutlet />;
  }

  return (
    <>
      {totalCount !== 0 ? (
        <MainModal
          open={open}
          onClose={handleCloseModal}
          closeIcon={durationSec === 0}
        >
          <div className={[styles.deadlineModal, "notSelect"].join(" ")}>
            {isFetching || isLoading ? (
              <>
                <Skeleton.Input
                  active={true}
                  size={"small"}
                  style={{ marginBottom: 10, width: 180 }}
                />
                <Skeleton.Input
                  active={true}
                  size={"small"}
                  style={{ marginBottom: 10, width: 280 }}
                />
                <Skeleton.Input
                  active={true}
                  size={"small"}
                  style={{ marginBottom: 16, width: 120 }}
                />
                <Skeleton.Button
                  active={true}
                  size={"large"}
                  style={{
                    marginTop: 50,
                    marginBottom: 50,
                    width: "50px!important",
                  }}
                />

                <Skeleton.Button
                  active={true}
                  size={"default"}
                  style={{ marginBottom: 16, width: 280 }}
                />
              </>
            ) : (
              <>
                <h2 className={styles.title}>
                  Sizda olinishi kerak bo’lgan{" "}
                  <span>
                    {totalCount}
                    <small>ta</small>
                  </span>{" "}
                  kelishuv mavjud!
                </h2>

                {durationSec > 0 ? (
                  <h1 className={styles.leftTime}>{durationSec}</h1>
                ) : (
                  ""
                )}

                <Button
                  className={styles.btn}
                  type={"primary"}
                  onClick={handleNavigate}
                >
                  Bajarish
                </Button>
              </>
            )}
          </div>
        </MainModal>
      ) : (
        ""
      )}
      {/*Outlet*/}
      <MainOutlet />
    </>
  );
}

export default SupplierDeadlineChecker;
