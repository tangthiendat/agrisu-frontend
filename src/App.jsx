import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Vendors from "./pages/Vendors";
import Customers from "./pages/Customers";
import Retail from "./pages/Retail";
import Invoices from "./pages/Invoices";
import CashBook from "./pages/CashBook";

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
        path: "/vendors",
        errorElement: <Error />,
        element: <Vendors />,
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
        path: "/cash-book",
        errorElement: <Error />,
        element: <CashBook />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins, sans-serif",
        },
        components: {
          Table: {
            headerBg: "#e5e7eb",
            cellPaddingBlockMD: 10,
            cellPaddingBlockSM: 6,
            borderColor: "#e5e7eb",
          },
          Button: {
            onlyIconSize: 14,
            onlyIconSizeSM: 10,
            paddingInlineSM: 10,
            defaultBorderColor: "#d1d5db",
          },
          Typography: {
            fontSizeHeading1: "2rem",
            fontSizeHeading2: "1.5rem",
            fontSizeHeading3: "1.25rem",
          },
          Modal: {
            titleFontSize: "1.25rem",
            titleLineHeight: 2.5,
          },
          Collapse: {
            headerBg: "#f3f4f6",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="colored"
        />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
