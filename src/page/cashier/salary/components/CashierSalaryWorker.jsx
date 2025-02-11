import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, List, Typography, message } from "antd";
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from "react";
import MainModal from "../../../../components/common/modal/MainModal";
import MainNumberFormat from "../../../../components/common/numberFormat/MainNumberFormat";
import Section from "../../../../components/common/section/Section";
import MainDataTable from "../../../../components/ui/dataTable/MainDataTable";
import {
  useGetCashierWorkerQuery,
  useGetCashierWorkerSalaryHistoryMutation,
} from "../../../../features/cashier/salary/cashierSalaryApiSlice";
import formatCurrency from "../../../../util/formatCurrency";
import CashierAddSalaryModalWorker from "./CashierAddSalaryModalWorker";

function CashierSalaryWorker() {
  /* State */
  const [isSubbmitting, setIsSubmitting] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [selectDate, setSelectDate] = useState({
    start: "",
    end: "",
  });
  const [mount, setMount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [allResData, setAllResData] = useState(null);
  const [openAddSalaryModal, setOpenAddSalaryModal] = useState(false);

  const { Title } = Typography;
  const { Search } = Input;
  /* worker */
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedWorkerActive, setSelectedWorkerActive] = useState(null);
  /* API */

  const { data, isLoading, isError, refetch } = useGetCashierWorkerQuery();
  const [getDataByDate] = useGetCashierWorkerSalaryHistoryMutation();

  
  /* Message */
  const [messageApi, contextHolder] = message.useMessage();
  const getDataKey = "getData";
  
  useEffect(() => {
    if (mount >= 1) {
      handleGetDataByDate({ ...selectDate, workerId: selectedWorker });
    }
    setMount(true);
  }, [selectedWorker, selectDate]);
  
  useEffect(() => {
    setTableData(
      filterData.sort((a, b) => parseInt(b.sana) - parseInt(a.sana))
    );
  }, [filterData]);
  
  /* Handle get data */
  const handleGetDataByDate = async (values) => {
    if (!values.start || !values.end) {
      setFilterData([]);
      return;
    }
    /* Set Event */
    setIsSubmitting(true);
    
    /* Message */
    messageApi.open({
      getDataKey,
      type: "loading",
      content: "Loading...",
    });
    try {
      const resData = await getDataByDate({
        start: values.start,
        end: values.end,
        workerId: values.workerId || 0,
      }).unwrap();
      if (resData?.success === true) {
        if (
          resData?.success === true &&
          resData?.data &&
          resData?.data?.list &&
          Array.isArray(resData?.data?.list)
        ) {
          const newData = resData?.data?.list.map((item, index) => ({
            ...item,
            id: index,
          }));
          setFilterData([...newData]);
          setAllResData(resData?.data);
        } else {
          setFilterData([]);
        }

        if (resData?.message) {
          messageApi.open({
            getDataKey,
            type: "success",
            content: resData?.message,
          });
        }
      } else if (resData?.success === false) {
        setFilterData([]);
        if (resData?.message) {
          messageApi.open({
            getDataKey,
            type: "error",
            content: resData?.message,
          });
        }
      }
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        messageApi.open({
          getDataKey,
          type: "warning",
          content: `Ulanishda xatolik! Qaytadan urinib ko'ring!`,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sortType: "number",
    },
    {
      title: "Ishchi",
      dataIndex: "worker",
      key: "worker",
      width: 150,
      sortType: "string",
    },
    {
      title: "Naqd so'm",
      dataIndex: "naqdsum",
      key: "naqdsum",
      width: 150,
      sortType: "number",
      render: (naqdsum) => <MainNumberFormat value={naqdsum} />,
    },
    {
      title: "Naqd usd",
      dataIndex: "naqdusd",
      key: "naqdusd",
      width: 150,
      sortType: "number",
      render: (naqdusd) => <MainNumberFormat value={naqdusd} />,
    },
    {
      title: "Karta",
      dataIndex: "karta",
      key: "karta",
      width: 150,
      sortType: "number",
      render: (karta) => <MainNumberFormat value={karta} />,
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
      width: 150,
      sortType: "number",
      render: (bank) => <MainNumberFormat value={bank} />,
    },
    {
      title: "Izoh",
      dataIndex: "izoh",
      key: "izoh",
      width: 300,
      sortType: "string",
    },
    {
      title: "Vaqt",
      dataIndex: "vaqt",
      key: "vaqt",
      width: 150,
      sortType: "date",
    },
  ];
  
  const [options, setOptions] = useState([]);

  const checkData = () => {
    if (data?.success === true && data?.data && Array.isArray(data?.data)) {
      setOptions(data.data);
    } else {
      setOptions([]);
    }
  }

  useEffect(() => {
    checkData();
  }, [data]);

  //search Workers
  const onSearch = (val) => {
    if(val != "") {
      setOptions(
        options.filter((item) =>
          item?.fio?.toLowerCase().includes(val.toLowerCase())
        )
      );
    } else {
      checkData();
    } 
  };

  /* MODAL */
  const handleOpenSalaryModal = () => setOpenAddSalaryModal(true);
  const handleCloseSalaryModal = () => setOpenAddSalaryModal(false);
  /* Worker select */
  const onSelectWorker = (val) => {
    if(val === selectedWorker){
      return setSelectedWorker(null)
    }
    setSelectedWorker(val);
  }

  return (
    <>
      {contextHolder}

      <MainModal open={openAddSalaryModal} onClose={handleCloseSalaryModal}>
        <CashierAddSalaryModalWorker onClose={handleCloseSalaryModal} />
      </MainModal>

      <Section style={{height:'70vh'}}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "1rem",
          }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenSalaryModal}
          >
            Ishchiga oylik chiqarish
          </Button>
        </div>
        <Divider />

        <Title level={4}>Ishchi tanlang</Title>
        <div style={{ display: 'flex', width: '100%' }}>

          <div style={{width:'20%', marginRight:'1rem', marginTop: '1rem'}}>
            <Input
              placeholder="Izlash..."
              onChange={(e) => onSearch(e.target.value)}
              style={{
                width: '200px'
              }}
              allowClear
            />
            <List style={{ height:'100%'}}>
              <VirtualList
                data={options}
                height={500}
                itemHeight={47}
                itemKey="id"
              >
                {(item) => (
                  <List.Item key={item.id}
                    style={{background: selectedWorker===item.id? "#69b1ff":'', borderRadius:'10px', padding:'5px', fontSize: '10px'}}
                  >
                    <List.Item.Meta
                      title={item.fio}
                      description={item.telefon}
                      className="example"
                      onClick={() => onSelectWorker(item.id)}
                    />
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </div>

          <div style={{width:'80%', height:'100%'}}>
            <MainDataTable
              mobile={true}
              columns={columns}
              isLoading={isSubbmitting}
              data={tableData}
              showDatePicker={true}
              setDateValue={setSelectDate}
              pagination={false}
            />
            {tableData?.length ? (
              <div style={{ display: "flex", gap: "100px", marginTop: "3rem" }}>
                <div>
                  <p>
                    Jami naqd: <b>{formatCurrency(allResData?.jaminaqd)}</b>
                  </p>
                  <p>
                    Jami usd: <b>{formatCurrency(allResData?.jamiusd)}</b>
                  </p>
                  <p>
                    Jami bank: <b>{formatCurrency(allResData?.jamibank)}</b>
                  </p>
                  <p>
                    Jami karta: <b>{formatCurrency(allResData?.jamikarta)}</b>
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}

export default CashierSalaryWorker;
