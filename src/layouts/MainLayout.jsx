import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Main from "../ui/Main";
import { Layout } from "antd";
function MainLayout() {
  return (
    <Layout>
      <div className="max-w-screen min-h-screen bg-neutral-100">
        <Header />
        <Main>
          <div className="mx-4 my-6">
            <Outlet />
          </div>
        </Main>
      </div>
    </Layout>
  );
}

export default MainLayout;
