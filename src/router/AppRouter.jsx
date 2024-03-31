import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "../ui/AppLayout";
import Error from "../ui/Error";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Suppliers from "../pages/Suppliers";
import Customers from "../pages/Customers";
import Retail from "../pages/Retail";
import Invoices from "../pages/Invoices";
import CashBook from "../pages/CashBook";
import GoodReceipt from "../pages/GoodReceipt";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        index: true,
        errorElement: <Error />,
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        errorElement: <Error />,
        element: <Dashboard />,
      },
      {
        path: "/products",
        errorElement: <Error />,
        element: <Products />,
      },
      {
        path: "/suppliers",
        errorElement: <Error />,
        element: <Suppliers />,
      },
      {
        path: "/customers",
        errorElement: <Error />,
        element: <Customers />,
      },
      {
        path: "/retail",
        errorElement: <Error />,
        element: <Retail />,
      },
      {
        path: "/invoices",
        errorElement: <Error />,
        element: <Invoices />,
      },
      {
        path: "/good-receipt",
        errorElement: <Error />,
        element: <GoodReceipt />,
      },
      {
        path: "/cash-book",
        errorElement: <Error />,
        element: <CashBook />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}
export default Router;
