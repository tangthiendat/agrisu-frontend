import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";
function AppLayout() {
  return (
    <div className="flex h-screen w-screen flex-row ">
      <Sidebar />
      <Main>
        <Header />
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
