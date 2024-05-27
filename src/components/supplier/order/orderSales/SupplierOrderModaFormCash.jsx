import { DatePicker, Form, Input, Typography } from 'antd';
import React from 'react';
import MainNumberFormat from '../../../common/numberFormat/MainNumberFormat';
import MainInputPrice from '../../../ui/inputPrice/MainInputPrice';
import styles from "./supplierOrderSales.module.css";

const SupplierOrderModaFormCash = ({ handleChange, totalPrice, status, returnCurrency, setRepaymentDate }) => {
    return (
        <>
            <table style={{ width: "100%" }}>
                <tbody>
                    <tr className={styles.tableRow}>
                        <td className={styles.tableItem}>
                            <b>Summa:</b>
                        </td>
                        <td className={styles.tableItem}>
                            <b>
                                <MainNumberFormat value={totalPrice} />
                                &nbsp;so'm
                            </b>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.tableItem}>Naqd(uzs):</td>
                        <td className={styles.tableItem}>
                            <MainInputPrice
                                name="naqd"
                                label={"Naqd pul"}
                                status={status}
                                onChange={(val) => handleChange("naqd", val)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.tableItem}>Plastik:</td>
                        <td className={styles.tableItem}>
                            <MainInputPrice
                                name="plastik"
                                label={"Plastik"}
                                status={status}
                                onChange={(val) => handleChange("plastik", val)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.tableItem}>Karta:</td>
                        <td className={styles.tableItem}>
                            <MainInputPrice
                                name="karta"
                                label={"Karta"}
                                status={status}
                                onChange={(val) => handleChange("karta", val)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.tableItem}>Naqd(usd):</td>
                        <td className={styles.tableItem}>
                            <MainInputPrice
                                name="usd"
                                label={"Naqd USD"}
                                status={status}
                                onChange={(val) => handleChange("usd", val)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.tableItem}>Valyuta kursi:</td>
                        <td className={styles.tableItem}>
                            <MainInputPrice
                                name="exchangeUsd"
                                label={"Valyuta kursi"}
                                status={status}
                                onChange={(val) => handleChange("exchangeUsd", val)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <Typography.Text strong>
                Qarzni qaytarish muddati:
            </Typography.Text>
            <Form.Item
                name="repayment"
                rules={[
                    {
                        required: returnCurrency < 0,
                        message: "Muddat talab qilinadi!",
                    },
                ]}
                hasFeedback
                validateStatus={status}
            >
                <DatePicker
                    style={{ width: "100%" }}
                    placeholder="0000-00-00"
                    onChange={(_, val) => setRepaymentDate(val)}
                />
            </Form.Item>
            <Typography.Text strong>
                Izoh <span style={{ opacity: 0.5 }}>(agar joiz bo'lsa)</span>
            </Typography.Text>
            <Form.Item name={"description"} hasFeedback validateStatus={status}>
                <Input.TextArea
                    allowClear
                    showCount
                    placeholder="Izoh kiritish"
                    rows={6}
                />
            </Form.Item>
        </>
    );
};

SupplierOrderModaFormCash.propTypes = {};

export default SupplierOrderModaFormCash;