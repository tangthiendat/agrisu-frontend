import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
    staleTime: 1000 * 60,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
