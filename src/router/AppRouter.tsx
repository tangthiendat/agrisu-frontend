import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Products from "../pages/Products.tsx";
import Suppliers from "../pages/Suppliers.tsx";
import Customers from "../pages/Customers.tsx";
import NewOrder from "../pages/NewOrder";
import Orders from "../pages/Orders.tsx";
import WarehouseReceipts from "../pages/WarehouseReceipts.tsx";
import WarehouseExports from "../pages/WarehouseExports.tsx";
import CashFlow from "../pages/CashFlow.tsx";
import NewWarehouseReceipt from "../pages/NewWarehouseReceipt";
import NewWarehouseExport from "../pages/NewWarehouseExport";
import Reports from "../pages/Reports.tsx";
import Login from "../pages/Login.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        errorElement: <ErrorPage />,
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        errorElement: <ErrorPage />,
        element: <Dashboard />,
      },
      {
        path: "/products",
        errorElement: <ErrorPage />,
        element: <Products />,
      },
      {
        path: "/partners/suppliers",
        errorElement: <ErrorPage />,
        element: <Suppliers />,
      },
      {
        path: "/partners/customers",
        errorElement: <ErrorPage />,
        element: <Customers />,
      },
      {
        path: "/transactions/orders",
        errorElement: <ErrorPage />,
        element: <Orders />,
      },
      {
        path: "/transactions/warehouse-receipts",
        errorElement: <ErrorPage />,
        element: <WarehouseReceipts />,
      },
      {
        path: "/transactions/warehouse-exports",
        errorElement: <ErrorPage />,
        element: <WarehouseExports />,
      },
      {
        path: "/sales/new-order",
        errorElement: <ErrorPage />,
        element: <NewOrder />,
      },
      {
        path: "/sales/new-warehouse-receipt",
        errorElement: <ErrorPage />,
        element: <NewWarehouseReceipt />,
      },
      {
        path: "/sales/new-warehouse-export",
        errorElement: <ErrorPage />,
        element: <NewWarehouseExport />,
      },
      {
        path: "/cash-flow",
        errorElement: <ErrorPage />,
        element: <CashFlow />,
      },
      {
        path: "/reports",
        errorElement: <ErrorPage />,
        element: <Reports />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        errorElement: <ErrorPage />,
        element: <Login />,
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
