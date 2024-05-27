import {PlusOutlined} from "@ant-design/icons";
import {Button, Drawer, FloatButton, Form, message} from "antd";
import React, {useState} from "react";
import {useAddGrindPlacingOrderToStorageMutation} from "../../../features/grindProduct/order/grindOrderSalesApiSlice";
import MainInputMass from "../../ui/inputMass/MainInputMass";
import removeComma from "../../../util/removeComma";

function GrindGetProductModal() {
    /* Form */
    const [form] = Form.useForm();

    /* State */
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState("");
    /* State */
    const [openDrawer, setOpenDrawer] = useState(false);

    /* Message */
    const [messageApi, contextHolder] = message.useMessage();
    const key = "updatable";

    /* API */
    const [addGetProductOrder] = useAddGrindPlacingOrderToStorageMutation();

    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        setStatus("validating");
        messageApi.open({
            key,
            type: "loading",
            content: "Loading...",
        });
        try {
            const data = {
                massa: removeComma(values?.mass)
            };
            const resData = await addGetProductOrder(data).unwrap();
            if (resData?.success === true) {
                form.resetFields();
                setStatus("success");
                if (resData?.message) {
                    messageApi.open({
                        key,
                        type: "success",
                        content: resData?.message,
                    });
                }
            } else if (resData?.success === false) {
                setStatus("error");
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
                setStatus("warning");
                messageApi.open({
                    key,
                    type: "warning",
                    content: "Ulanishda xatolik! Qaytadan urinib ko'ring!",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    /* Drawer actions */
    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };
    const showDrawer = () => {
        setOpenDrawer(true);
    };

    return (
        <>
            {contextHolder}

            {/* Fload button */}
            <FloatButton
                shape="circle"
                type="primary"
                style={{
                    right: 24,
                }}
                icon={<PlusOutlined/>}
                onClick={showDrawer}
            />

            <Drawer
                title="Maydalash uchun mahsulot buyurtma berish"
                placement="left"
                width={400}
                onClose={onCloseDrawer}
                closeIcon={false}
                open={openDrawer}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >

                {/* Form */}
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    autoComplete="off"
                    layout="vertical"
                    style={{height: "100%", display: "flex", flexDirection: "column"}}
                >
                    <MainInputMass />

                    <Form.Item>
                        <Button
                            style={{width: "100%"}}
                            htmlType="submit"
                            type="primary"
                            icon={<PlusOutlined/>}
                            loading={isSubmitting}
                        >
                            Buyurtma berish
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}

export default GrindGetProductModal;
