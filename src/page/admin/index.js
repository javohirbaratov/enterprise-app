/* Lazy */
import { lazy } from "react";
/* LAYOUT */
export const AdminLayout = lazy(() => import("../../layout/admin/AdminLayout"));

/* PAGES */
export const AdminDepartment = lazy(() =>
  import("./department/AdminDepartment")
);
export const AdminHome = lazy(() => import("./home/AdminHome"));
export const AdminPolka = lazy(() => import("./polka/AdminPolka"));
export const AdminProduct = lazy(() => import("./product/AdminProduct"));
export const AdminWorker = lazy(() => import("./worker/AdminWorker"));
export const AdminUser = lazy(() => import("./user/AdminUser"));
export const AdminCustomerCategory = lazy(() =>
  import("./customerCategory/AdminCustomerCategory")
);
export const AdminExpenses = lazy(() => import("./expenses/AdminExpenses"));
export const AdminExpensesCategory = lazy(() =>
  import("./expensesCategory/AdminExpensesCategory")
);
export const AdminDividend = lazy(() => import("./dividend/AdminDividend"));
export const AdminDividendAnclose = lazy(() => import("./dividendAnclose/AdminDividendAnclose"));
export const AdminDividendCategory = lazy(() => import("./dividendCategory/AdminDividendCategory"));

export const AdminResidue = lazy(() => import("./residue/AdminResidue"));
export const AdminReportGrind = lazy(() => import("./reportGrind/AdminReportGrind"));
export const ReportSupplier = lazy(() => import("./reportSupplier/ReportSupplier"));


// All department
export const AdminAgentDepart = lazy(() =>
  import("./allDepartment/agent/AdminAgentDepart")
);
export const AdminGrindDepart = lazy(() =>
  import("./allDepartment/grind/AdminGrindDepart")
);
export const AdminSalesDepart = lazy(() =>
  import("./allDepartment/sales/AdminSalesDepart")
);
export const AdminStorageDepart = lazy(() =>
  import("./allDepartment/storage/AdminStorageDepart")
);
export const AdminSupplierDepart = lazy(() =>
  import("./allDepartment/supplier/AdminSupplierDepart")
);
export const AdminUploaderDepart = lazy(() =>
  import("./allDepartment/uploader/AdminUploaderDepart")
);
export const AdminCashierDepart = lazy(() =>
  import("./allDepartment/cashier/AdminCashierDepart")
);
