import {
  DeleteOutlined,
  PrinterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Empty,
  Input,
  List,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ExportTable from "../../../components/common/exportTable/ExportTable";
import MainNumberFormat from "../../../components/common/numberFormat/MainNumberFormat";
import PrintChekOfSklad from "../../../components/common/printChek/PrintChekOfSklad";
import QrCodePrint from "../../../components/common/qrCodePrind/QrCodePrint";
import Section from "../../../components/common/section/Section";
import MainRangeDatePicker from "../../../components/ui/rangeDatePicker/MainRangeDatePicker";
import {
  useDeleteProductReceptionItemMutation,
  useGetProdRecByDateMutation,
  useGetProdRecQuery,
} from "../../../features/sklad/productReception/ProductReceptionApiSlice";
import formatCurrency from "../../../util/formatCurrency";
import { formatFloatNumber } from "../../../util/formatFloatNumber";
import getCalcData from "../../../util/getCalcArrItem";

function SkladReceptionProduct() {
  /* Ref */
  const printRef = useRef(null);
  const expandTableRef = useRef(null);

  /* State */
  const [isSubbmitting, setIsSubmitting] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totalData, setTotalData] = useState({
    jamisumma: 0,
    jamidona: 0,
    jamimassa: 0,
  });
  const [search, setSearch] = useState("");

  /* API */
  const [deleteReception] = useDeleteProductReceptionItemMutation();
  const { data, isLoading, isError, refetch } = useGetProdRecQuery();
  const [getDataByDate] = useGetProdRecByDateMutation();

  /* Message */
  const [messageApi, contextHolder] = message.useMessage();
  const key = "delete";

  const getWeightData = (data) => {
    if (!data) return [];

    const decodeData = JSON.parse(data);

    if (!decodeData?.dataInputs || !decodeData?.dataInputs?.weightInputs)
      return [];

    const allInputItems = [];
    const { largeBox, smallBox } = decodeData?.dataInputs?.weightInputs;

    largeBox.forEach((item) => {
      if (item?.inputs) {
        allInputItems.push({
          id: uuidv4(),
          boxCount: item?.inputs[0]?.value,
          chickenCount: item?.inputs[1]?.value,
          mass: item?.inputs[2]?.value,
        });
      } else {
        allInputItems.push({
          id: uuidv4(),
          boxCount: item?.boxCount,
          chickenCount: item?.chickenCount,
          mass: item?.kg,
        });
      }
    });
    smallBox.forEach((item) => {
      if (item?.inputs) {
        allInputItems.push({
          id: uuidv4(),
          boxCount: item?.inputs[0]?.value,
          chickenCount: item?.inputs[1]?.value,
          mass: item?.inputs[2]?.value,
        });
      } else {
        allInputItems.push({
          id: uuidv4(),
          boxCount: item?.boxCount,
          chickenCount: item?.chickenCount,
          mass: item?.kg,
        });
      }
    });

    return [...allInputItems];
  };
  /* API data */
  const newData = useMemo(() => {
    if (data?.success === true && data?.data) {
      setTotalData({
        jamisumma: data?.data?.jamisumma,
        jamidona: data?.data?.jamidona,
        jamimassa: data?.data?.jamimassa,
      });
    } else {
      setTotalData({
        jamisumma: 0,
        jamidona: 0,
        jamimassa: 0,
      });
    }

    if (
      data?.success === true &&
      data?.data &&
      data?.data?.krim_list &&
      Array.isArray(data?.data?.krim_list)
    ) {
      const filterData = [];
      data.data?.krim_list.forEach((item) => {
        filterData.push({
          key: item.id,
          sourceData: getWeightData(item?.malumot),
          ...item,
        });
      });
      return filterData;
    }

    return [];
  }, [data]);

  useEffect(() => {
    setTableData(newData);
    setFilterData(newData);
  }, [newData]);

  const filterTableData = useMemo(() => {
    return filterData.filter((item) => {
      return search?.toLowerCase() === ""
        ? item
        : Object?.keys(item)?.find((key) => {
            if (
              typeof item[key] === "string" ||
              typeof item[key] === "number"
            ) {
              const value = item[key].toString();
              /* Success */
              return value?.toLowerCase()?.includes(search?.toLowerCase());
            }
            /* Error */
            return null;
          });
    });
  }, [search, filterData]);

  /*  HANDLE PRINT  */
  const handlePrintPart = (data) => {
    printRef.current.onPrint(data);
  };

  /* DELETE */
  const handleDeleteItem = async (id) => {
    setDeleteLoading(true);
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    try {
      const resData = await deleteReception(id).unwrap();

      if (resData?.success === true) {
        if (resData?.message) {
          messageApi.open({
            key,
            type: "success",
            content: resData?.message,
          });
        }
      } else if (resData?.success === false) {
        if (resData?.message) {
          messageApi.open({
            key,
            type: "error",
            content: resData?.message,
          });
        }
      }
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        message.warning("Ulanishda xatolik! Qaytadan urinib ko'ring!");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      title: "Taminotchi",
      dataIndex: "taminotchi",
      key: "taminotchi",
      width: 150,
    },
    {
      title: "Qassob",
      dataIndex: "qassob",
      key: "qassob",
      width: 150,
    },
    {
      title: "Partiyanomer",
      dataIndex: "partiyanomer",
      key: "partiyanomer",
      width: 150,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Kirim jadvali",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      render: () => <Tag color="cyan-inverse">Jadval</Tag>,
    },
    {
      title: "Dona",
      dataIndex: "dona",
      key: "dona",
      width: 150,
    },
    {
      title: "Massa",
      dataIndex: "massa",
      key: "massa",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Summa",
      dataIndex: "summa",
      key: "summa",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      filters: [
        {
          text: "Joylandi",
          value: "joylandi",
        },
        {
          text: "Joylanmoqda",
          value: "joylanmoqda",
        },
      ],
      onFilter: (value, record) => record?.status?.indexOf(value) === 0,
      render: (_, { status }) => {
        let color = status === "new" ? "success" : "blue";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Sana",
      dataIndex: "sana",
      key: "sana",
      width: 150,
    },
    {
      title: "Amal",
      dataIndex: "operation",
      key: "operation",
      fixed: "right",
      align: "center",
      width: 60,
      render: (
        _,
        {
          id,
          status,
          partiyanomer,
          sana,
          taminotchi,
          massa,
          malumot,
          qassob,
          dona,
        }
      ) => (
        <>
          <Popconfirm
            title="O'chirish"
            description="Rostdan ham o'chirmoqchimisiz?"
            onConfirm={() => handleDeleteItem(id)}
            okText="Ha, albatta"
            cancelText="Yo'q"
            disabled
          >
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              size="small"
              disabled={status !== "new"}
            />
          </Popconfirm>
          <Button
            icon={<PrinterOutlined />}
            type="primary"
            size="small"
            onClick={() => {
              handlePrintPart({
                partiyanomer,
                taminotchi,
                qassob,
                massa,
                allBoxCount: JSON.parse(malumot)?.allBoxCount,
                dona,
                sana,
                // qrData: {
                //   polka_id: 0,
                //   partiyanomer: partiyanomer,
                //   product_id: id,
                // },
              });
            }}
          />
        </>
      ),
    },
  ];

  /* Handle get data */
  const handleGetDataByDate = async (values) => {
    if ((!values.start || !values.end) && tableData?.length) {
      message.info(data?.message);
      setFilterData(tableData);
      return;
    }
    /* Set Event */
    setIsSubmitting(true);

    /* Message */
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    try {
      const resData = await getDataByDate({
        start: values.start,
        end: values.end,
      }).unwrap();

      if (resData?.success === true) {
        if (
          data?.success === true &&
          data?.data &&
          data?.data?.krim_list &&
          Array.isArray(data?.data?.krim_list)
        ) {
          const filterData = [];
          resData.data?.krim_list.forEach((item) => {
            filterData.push({
              key: item.id,
              sourceData: getWeightData(item?.malumot),
              ...item,
            });
          });
          // console.log(resData);
          setTotalData({
            jamisumma: resData?.data?.jamisumma,
            jamidona: resData?.data?.jamidona,
            jamimassa: resData?.data?.jamimassa,
          });
          setFilterData(filterData);
        }

        if (resData?.message) {
          messageApi.open({
            key,
            type: "success",
            content: resData?.message,
          });
        }
      } else if (resData?.success === false) {
        if (resData?.message) {
          messageApi.open({
            key,
            type: "error",
            content: resData?.message,
          });
        }
      }
    } catch (err) {
      if (err.status === "FETCH_ERROR") {
        messageApi.open({
          key,
          type: "warning",
          content: `Ulanishda xatolik! Qaytadan urinib ko'ring!`,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Handle print expand table */
  const handlePrintExpandTable = (data) =>
    expandTableRef.current.onPrint({
      data,
      header: data?.sourceData,
      footer: data,
      provider: data.taminotchi,
    });

  return (
    <>
      {contextHolder}

      {/* Print */}
      <QrCodePrint ref={printRef} />

      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
            gap: "1rem",
          }}
        >
          <Space direction="vertical" size={0}>
            <span>
              Jami summa:{" "}
              <b style={{ opacity: "0.5" }}>
                {formatCurrency(totalData.jamisumma)}
              </b>
            </span>
            <span>
              Jami dona:{" "}
              <b style={{ opacity: "0.5" }}>
                <MainNumberFormat
                  value={formatFloatNumber(totalData.jamidona)}
                />
              </b>
              ta
            </span>
            <span>
              Jami massa:{" "}
              <b style={{ opacity: "0.5" }}>
                <MainNumberFormat
                  value={formatFloatNumber(totalData.jamimassa)}
                />
              </b>
              kg
            </span>
          </Space>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <ExportTable
              fileName="Qabul qilingan mahsulotlar"
              columns={columns}
              data={filterTableData}
            />
            {/* Date ranger */}
            <MainRangeDatePicker setValue={handleGetDataByDate} />
          </div>

          {/* Search all */}
          <div className={{}}>
            <Input
              placeholder="Izlash..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <Table
          size="small"
          columns={columns}
          dataSource={filterTableData}
          loading={isLoading || isSubbmitting}
          scroll={{
            x: 2000,
            y: 700,
          }}
          locale={{
            emptyText: () => {
              if (isError && !isLoading) {
                return (
                  <Button onClick={refetch} icon={<ReloadOutlined />}>
                    Reload
                  </Button>
                );
              } else {
                return <Empty />;
              }
            },
          }}
          expandable={{
            expandedRowRender: (record) => (
              <div
                style={{
                  width: 302,
                  margin: "auto",
                  border: "1px solid #f1f1f1",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <PrintChekOfSklad ref={expandTableRef} />
                <div>
                  <List bordered={false}>
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Taminotchi: <span>{record?.taminotchi}</span>
                    </List.Item>
                  </List>
                  <Table
                    scroll={{ x: 300 }}
                    columns={[
                      {
                        title: "Yashik soni",
                        dataIndex: "boxCount",
                        key: "boxCount",
                        width: 100,
                      },
                      {
                        title: "Tovuq soni",
                        dataIndex: "chickenCount",
                        key: "chickenCount",
                        width: 100,
                      },
                      {
                        title: "Massa(kg)",
                        dataIndex: "mass",
                        key: "mass",
                        width: 100,
                      },
                    ]}
                    dataSource={record?.sourceData}
                    rowKey={"id"}
                    pagination={false}
                    size="small"
                  />
                  {record?.sourceData && (
                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "105px",
                              padding: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <MainNumberFormat
                              value={getCalcData(
                                record?.sourceData,
                                "boxCount"
                              )}
                            />{" "}
                            ta
                          </td>
                          <td
                            style={{
                              width: "105px",
                              padding: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <MainNumberFormat
                              value={getCalcData(
                                record?.sourceData,
                                "chickenCount"
                              )}
                            />{" "}
                            ta
                          </td>
                          <td
                            style={{
                              width: "105px",
                              padding: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <MainNumberFormat
                              value={getCalcData(record?.sourceData, "mass")}
                            />{" "}
                            kg
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}

                  <List bordered={false}>
                    {/* <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Telefoni: <span>{console.log(record)}</span>
                    </List.Item> */}
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Toza massa:{" "}
                      <span>
                        <MainNumberFormat value={record?.massa} /> kg
                      </span>
                    </List.Item>
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Narxi: <span>{formatCurrency(record?.price)} so'm</span>
                    </List.Item>
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Dona:{" "}
                      <span>
                        <MainNumberFormat value={record?.dona} /> dona
                      </span>
                    </List.Item>
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Summa: <span>{formatCurrency(record?.summa)} so'm</span>
                    </List.Item>
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Sana: <span>{record?.sana}</span>
                    </List.Item>
                  </List>
                  <p
                    className="printItem"
                    style={{
                      marginTop: "1rem",
                      borderTop: "1px solid",
                      paddingBottom: ".5rem",
                      textAlign: "center",
                    }}
                  >
                    <Typography.Text strong>
                      "Sofchiken bilan halollik sari"
                    </Typography.Text>
                  </p>
                </div>
                <div>
                  <Button
                    icon={<PrinterOutlined />}
                    type="primary"
                    onClick={() => handlePrintExpandTable(record)}
                  />
                </div>
              </div>
            ),
          }}
        />
      </Section>
    </>
  );
}

export default SkladReceptionProduct;
