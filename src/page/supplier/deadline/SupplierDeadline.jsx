import { ClockCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React, { useMemo, useState } from "react";
import ExportTable from "../../../components/common/exportTable/ExportTable";
import MainModal from "../../../components/common/modal/MainModal";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import Section from "../../../components/common/section/Section";
import MainDataTable from "../../../components/ui/dataTable/MainDataTable";
import { useGetSupplierDeadlineQuery } from "../../../features/supplier/deadline/supplierDeadlineApiSlice";
import ChangeDeadlineConfirmSmsModal from "./components/ChangeDeadlineConfirmSmsModal";
import ChangeDeadlineModal from "./components/ChangeDeadlineModal";
import SupplierDeadlineCloseModal from "./components/SupplierDeadlineCloseModal";

function SupplierDeadline() {
  // State
  const [openCloseDeadlineModal, setOpenCloseDeadlineModal] = useState({
    open: false,
    deadlineId: null,
    customerId: null,
  });
  const [openDeadlineModal, setOpenDeadlineModal] = useState({
    open: false,
    data: {
      id: null,
    },
  });
  const [activeConfirmSms, setActiveConfirmSms] = useState(false);

  /* API */
  const { data, isLoading, isError, refetch } = useGetSupplierDeadlineQuery();

  const supplierDeadlineData = useMemo(() => {
    if (data?.success === true && data?.data && Array.isArray(data?.data)) {
      return data.data;
    }
    return [];
  }, [data]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      sortType: "number",
    },
    {
      title: "Mijoz",
      dataIndex: "client",
      width: 150,
      sortType: "string",
    },
    {
      title: "Mijoz telefon",
      dataIndex: "client_telefon",
      width: 150,
      sortType: "string",
    },
    {
      title: "Beriladigan summa",
      dataIndex: "berishi_kerak_summa",
      width: 150,
      sortType: "number",
      render: (val) => <MainNumberFormat value={val} />,
    },
    {
      title: "Qarz",
      dataIndex: "qarz",
      width: 150,
      sortType: "number",
      render: (val) => <MainNumberFormat value={val} />,
    },
    {
      title: "Amal",
      dataIndex: "operation",
      width: 100,
      align: "right",
      render: (_, { id, client_id }) => (
        <Space>
          <Button
            type={"text"}
            icon={<ClockCircleOutlined />}
            danger
            size={"small"}
            shape={"round"}
            onClick={() => handleOpenDeadlineModal(id)}
          />
          <Button
            type="primary"
            size="small"
            shape="round"
            onClick={() => handleOpen(id, client_id)}
          >
            Yopish
          </Button>
        </Space>
      ),
    },
  ];

  // Modal
  const handleOpen = (id, customerId) =>
    setOpenCloseDeadlineModal({ open: true, deadlineId: id, customerId });
  const handleClose = () =>
    setOpenCloseDeadlineModal({
      open: false,
      deadlineId: null,
      customerId: null,
    });

  // Change deadline modal
  const handleOpenDeadlineModal = (id) =>
    setOpenDeadlineModal({
      open: true,
      data: {
        id,
      },
    });
  const handleCloseDeadlineModal = () =>
    setOpenDeadlineModal({
      open: false,
      data: {
        id: null,
      },
    });

  // Confirm closed

  return (
    <>
      {/*Close modal*/}
      <MainModal
        open={openCloseDeadlineModal.open}
        onClose={handleClose}
        title={"Muddatni yopish"}
      >
        <SupplierDeadlineCloseModal
          orderId={openCloseDeadlineModal.deadlineId}
          customerId={openCloseDeadlineModal.customerId}
        />
      </MainModal>

      {/*Change deadline modal*/}
      <MainModal
        open={openDeadlineModal.open}
        onClose={handleCloseDeadlineModal}
        width={300}
      >
        {!activeConfirmSms ? (
          <ChangeDeadlineModal
            onShowConfirmSms={setActiveConfirmSms}
            id={openDeadlineModal.data.id}
          />
        ) : (
          <ChangeDeadlineConfirmSmsModal
            id={openDeadlineModal.data.id}
            onClose={handleCloseDeadlineModal}
          />
        )}
      </MainModal>

      <Section style={{ marginTop: "1rem" }}>
        <MainDataTable
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          data={supplierDeadlineData}
          customHeader={
            <ExportTable
              columns={columns}
              fileName="Muddatlar"
              data={[...supplierDeadlineData]}
            />
          }
          refetch={refetch}
        />
      </Section>
    </>
  );
}

export default SupplierDeadline;
