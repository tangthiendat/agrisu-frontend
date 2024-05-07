import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./router/AppRouter";

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
          Layout: {
            headerHeight: 55,
            headerPadding: "0 3%",
          },
          Menu: {
            darkItemHoverBg: "#1677ff",
            horizontalItemHoverBg: "#1677ff",
            iconSize: 16,
          },

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
          Collapse: {
            headerBg: "#f3f4f6",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AppRouter />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="colored"
          pauseOnHover={false}
        />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
