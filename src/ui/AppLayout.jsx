import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
function AppLayout() {
  return (
    <div className="max-w-screen min-h-screen bg-neutral-100">
      <Header />
      <Main>
        <div className="mx-4 my-6 shadow-md">
          <Outlet />
        </div>
      </Main>
    </div>
  );
}

export default AppLayout;
