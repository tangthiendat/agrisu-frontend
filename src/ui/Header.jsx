import { Layout, Menu } from "antd";
import Logo from "./Logo";
import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard, MdHomeWork, MdTrolley } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaFileInvoiceDollar, FaUser, FaUsers } from "react-icons/fa";
import { FaBox, FaCartPlus } from "react-icons/fa6";
import { useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";

const items = [
  {
    label: <NavLink to="/">Trang chủ</NavLink>,
    key: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: <NavLink to="/products">Sản phẩm</NavLink>,
    key: "products",
    icon: <FaBox />,
  },
  {
    label: "Đối tác",
    key: "partners",
    icon: <FaUsers />,
    children: [
      {
        label: <NavLink to="/suppliers">Nhà cung cấp</NavLink>,
        key: "suppliers",
        icon: <MdHomeWork />,
      },
      {
        label: <NavLink to="/customers">Khách hàng</NavLink>,
        key: "customers",
        icon: <FaUser />,
      },
    ],
  },
  {
    label: "Giao dịch",
    key: "transactions",
    icon: <GrTransaction />,
    children: [
      {
        label: <NavLink to="/invoices">Hóa đơn</NavLink>,
        key: "invoices",
        icon: <FaFileInvoiceDollar />,
      },
      {
        label: <NavLink to="/good-receipt">Nhập hàng</NavLink>,
        key: "good-receipt",
        icon: <MdTrolley />,
      },
    ],
  },
  {
    label: <NavLink to="/cash-book">Sổ quỹ</NavLink>,
    key: "cash-book",
    icon: <AiOutlineTransaction />,
  },
  {
    label: <NavLink to="/retail">Bán hàng</NavLink>,
    key: "retail",
    icon: <FaCartPlus />,
  },
];

function Header() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(
    location.pathname.slice(1) || "dashboard",
  );

  return (
    <Layout.Header className="flex  items-center">
      <Logo />
      <Menu
        className="flex-1"
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={items}
        onClick={({ key }) => setSelectedKey(key)}
      />
    </Layout.Header>
  );
}

export default Header;
