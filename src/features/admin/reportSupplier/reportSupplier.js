import { ADMIN_API } from "../../../app/api/api";
import { apiSlice } from "../../../app/api/apiSlice";

const ADMIN_REPORT_SUPPLIER = "ADMIN_REPORT_SUPPLIER";

export const adminReportSupplierApiSlice = apiSlice
    .enhanceEndpoints({ addTagTypes: [ADMIN_REPORT_SUPPLIER] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAdminReportSupplier: builder.query({
                query: ({ start, end }) => ADMIN_API.REPORT_SUPPLIER_GET({
                    start,
                    end,
                }),
                providesTags: [ADMIN_REPORT_SUPPLIER],
            }),
        }),
    });

export const {
    useGetAdminReportSupplierQuery,
} = adminReportSupplierApiSlice;
