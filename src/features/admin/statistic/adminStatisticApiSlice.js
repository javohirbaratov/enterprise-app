import { ADMIN_API } from "../../../app/api/api";
import { apiSlice } from "../../../app/api/apiSlice";

const ADMIN_STATISTIC_TAG = "ADMIN_STATISTIC";

export const adminStatisticApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: [ADMIN_STATISTIC_TAG] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAdminBalance: builder.query({
        query: () => ADMIN_API.BALANCE_GET,
        providesTags: [ADMIN_STATISTIC_TAG],
      }),
    }),
  });

export const { useGetAdminBalanceQuery } = adminStatisticApiSlice;
