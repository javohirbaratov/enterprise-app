import { ADMIN_API } from "../../../app/api/api";
import { apiSlice } from "../../../app/api/apiSlice";

const ADMIN_BENEFIT_TAG = "ADMIN_BENEFIT";

export const adminBenefitApiSlice = apiSlice
    .enhanceEndpoints({ addTagTypes: [ADMIN_BENEFIT_TAG] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAdminBenefit: builder.query({
                query: ({ start, end }) => ADMIN_API.GET_BENEFIT({
                    start,
                    end,
                }),
                providesTags: [ADMIN_BENEFIT_TAG],
            })
        }),
    });

export const {
    useGetAdminBenefitQuery,
} = adminBenefitApiSlice;
