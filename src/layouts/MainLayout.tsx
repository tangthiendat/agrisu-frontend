/* eslint-disable no-unused-vars */
import { NavLink, Outlet, useLocation } from "react-router-dom";
// import Header from "../ui/Header";
import { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { MdDashboard } from "react-icons/md";
import { FaChartLine, FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { AiOutlineTransaction } from "react-icons/ai";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "../ui/Logo";
import { FaBoxOpen, FaCartPlus } from "react-icons/fa6";

const items = [
  {
    label: <NavLink to="/">Trang chủ</NavLink>,
    key: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: <NavLink to="/products">Sản phẩm</NavLink>,
    key: "products",
    icon: <FaBoxOpen />,
  },
  {
    label: "Đối tác",
    key: "partners",
    icon: <FaUsers />,
    children: [
      {
        label: <NavLink to="/partners/suppliers">Nhà cung cấp</NavLink>,
        key: "suppliers",
      },
      {
        label: <NavLink to="/partners/customers">Khách hàng</NavLink>,
        key: "customers",
      },
    ],
  },
  {
    label: "Giao dịch",
    key: "transactions",
    icon: <GrTransaction />,
    children: [
      {
        label: <NavLink to="/transactions/orders">Hóa đơn</NavLink>,
        key: "orders",
      },
      {
        label: (
          <NavLink to="/transactions/warehouse-receipts">
            Phiếu nhập kho
          </NavLink>
        ),
        key: "warehouse-receipts",
      },
      {
        label: (
          <NavLink to="/transactions/warehouse-exports">Phiếu xuất kho</NavLink>
        ),
        key: "warehouse-exports",
      },
    ],
  },
  {
    label: <NavLink to="/cash-flow">Sổ quỹ</NavLink>,
    key: "cash-flow",
    icon: <AiOutlineTransaction />,
  },
  {
    label: "Kinh doanh",
    key: "sales",
    icon: <FaCartPlus />,
    children: [
      {
        label: <NavLink to="/sales/new-order">Bán hàng</NavLink>,
        key: "new-order",
      },
      {
        label: <NavLink to="/sales/new-warehouse-receipt">Nhập kho</NavLink>,
        key: "new-warehouse-receipt",
      },
      {
        label: <NavLink to="/sales/new-warehouse-export">Xuất kho</NavLink>,
        key: "new-warehouse-export",
      },
    ],
  },
  {
    label: <NavLink to="/reports">Báo cáo</NavLink>,
    key: "reports",
    icon: <FaChartLine />,
  },
];

function MainLayout() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    location.pathname === "/"
      ? ["dashboard"]
      : location.pathname.slice(1).split("/"),
  );
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <div>{!collapsed && <Logo />}</div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          onClick={({ key }) => {
            setSelectedKeys([key]);
          }}
        />
      </Layout.Sider>
      <Layout className="max-w-screen min-h-screen bg-neutral-100">
        <Layout.Header className="bg-white p-0">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: 56,
              height: 56,
            }}
          />
        </Layout.Header>
        <Layout.Content>
          <div className="mx-4 my-6">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
