import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useGetAdminReportSupplierQuery } from '../../../features/admin/reportSupplier/reportSupplier';
import formatCurrency from '../../../util/formatCurrency';
import validateApiResObjectArray from '../../../util/validateApiResObjectArray';
import MainDataTable from '../../../components/ui/dataTable/MainDataTable';
import MainNumberFormat from '../../../components/common/numberFormat/MainNumberFormat';
import Section from '../../../components/common/section/Section';

const ReportSupplier = () => {
    // State 
    const [selectDate, setSelectDate] = useState({
        start: "",
        end: "",
    });

    // Api
    const {data, isFetching, isLoading, isError} = useGetAdminReportSupplierQuery({
        ...selectDate
    });
    
    // Use Memo 
    const reportSupplierData = useMemo(() => {
      if (data?.success === true && data?.data && Array.isArray(data?.data)) {
        return data.data;
      }
      return [];
    }, [data]);

    const columns = [
        {
            title: "Xodim",
            dataIndex: "xodim",
            width: 200,
            sortType: "number",
        },
        {
            title: "Jami berilgan yuk",
            dataIndex: "jami_berilgan_yuk",
            width: 150,
            sortType: "string",
            render: (jami_berilgan_yuk) => <MainNumberFormat value={jami_berilgan_yuk} />,
        },
        {
            title: "Jami terilgan pullar",
            dataIndex: "jami_terilgan_pullar",
            width: 150,
            sortType: "number",
            render: (jami_terilgan_pullar) => <MainNumberFormat value={jami_terilgan_pullar} />,
        },
        {
            title: "Bajarilish foizi",
            dataIndex: "bajarilish_foizi",
            width: 150,
            sortType: "number",
            render: (bajarilish_foizi) => <MainNumberFormat value={bajarilish_foizi} />,
        },
        {
            title: "Ortda qolish foizi",
            dataIndex: "ortda_qolish_foizi",
            width: 150,
            sortType: "number",
            render: (ortda_qolish_foizi) => <MainNumberFormat value={ortda_qolish_foizi} />,
        },
        {
            title: "Jarimalar",
            dataIndex: "jarimalar",
            width: 150,
            sortType: "number",
            render: (jarimalar) => <MainNumberFormat value={jarimalar} />,
        },
        {
            title: "Jami muddat",
            dataIndex: "jami_muddat",
            width: 100,
        },
        {
            title: "Exp summa",
            dataIndex: "exp_summa",
            width: 100,
        },
        
    ];

    return (
        <Section>
            <MainDataTable
                columns={columns}
                isLoading={isLoading || isFetching}
                isError={isError}
                data={reportSupplierData}
                showDatePicker={true}
                setDateValue={setSelectDate}
            />
        </Section>
    );
};

ReportSupplier.propTypes = {};

export default ReportSupplier;