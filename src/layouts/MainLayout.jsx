import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Main from "../ui/Main";
function MainLayout() {
  return (
    <div className="max-w-screen min-h-screen bg-neutral-100">
      <Header />
      <Main>
        <div className="mx-4 my-6">
          <Outlet />
        </div>
      </Main>
    </div>
  );
}

export default MainLayout;
