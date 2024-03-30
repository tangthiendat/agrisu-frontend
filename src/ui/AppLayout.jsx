import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";
function AppLayout() {
  return (
    <div className="max-w-screen flex min-h-screen flex-row ">
      <Sidebar />
      <Main>
        <Header />
        <div className="mx-4 my-6 ">
          <Outlet />
        </div>
      </Main>
    </div>
  );
}

export default AppLayout;
