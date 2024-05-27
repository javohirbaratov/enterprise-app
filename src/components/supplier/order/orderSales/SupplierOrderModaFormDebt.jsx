import { DatePicker, Form, Input, Typography } from 'antd';
import React from 'react';
const SupplierOrderModaFormDebt = ({ returnCurrency, setRepaymentDate, status }) => {
    return (
        <>
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

SupplierOrderModaFormDebt.propTypes = {};

export default SupplierOrderModaFormDebt;