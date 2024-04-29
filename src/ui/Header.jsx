import { Layout, Menu } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard, MdHomeWork, MdTrolley } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FaChartLine, FaUser, FaUsers } from "react-icons/fa";
import { FaBox, FaCartPlus, FaFileInvoiceDollar } from "react-icons/fa6";
import { AiOutlineTransaction } from "react-icons/ai";
import { FiActivity } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import Logo from "./Logo";
import { BiSolidFileExport, BiSolidFileImport } from "react-icons/bi";

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
        label: <NavLink to="partners/suppliers">Nhà cung cấp</NavLink>,
        key: "suppliers",
        icon: <MdHomeWork />,
      },
      {
        label: <NavLink to="partners/customers">Khách hàng</NavLink>,
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
        label: <NavLink to="/transactions/orders">Hóa đơn</NavLink>,
        key: "orders",
        icon: <FaFileInvoiceDollar />,
      },
      {
        label: (
          <NavLink to="/transactions/warehouse-receipts">
            Phiếu nhập kho
          </NavLink>
        ),
        key: "warehouse-receipts",
        icon: <BiSolidFileImport />,
      },
      {
        label: (
          <NavLink to="/transactions/warehouse-exports">Phiếu xuất kho</NavLink>
        ),
        key: "warehouse-exports",
        icon: <BiSolidFileExport />,
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
    icon: <FiActivity />,
    children: [
      {
        label: <NavLink to="/sales/orders/new">Bán lẻ</NavLink>,
        key: "new-order",
        icon: <FaCartPlus />,
      },
      {
        label: <NavLink to="/sales/warehouse-receipts/new">Nhập kho</NavLink>,
        key: "new-warehouse-receipt",
        icon: <MdTrolley />,
      },
      {
        label: <NavLink to="/sales/warehouse-exports/new">Xuất kho</NavLink>,
        key: "new-warehouse-export",
        icon: <TbTruckDelivery />,
      },
    ],
  },
  {
    label: <NavLink to="/reports">Báo cáo</NavLink>,
    key: "reports",
    icon: <FaChartLine />,
  },
];

function Header() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(
    location.pathname === "/"
      ? ["dashboard"]
      : location.pathname.slice(1).split("/"),
  );

  return (
    <Layout.Header className="flex items-center">
      <Logo />
      <Menu
        className="flex-1"
        theme="dark"
        mode="horizontal"
        selectedKeys={selectedKeys}
        items={items}
        onClick={({ key }) => {
          setSelectedKeys([key]);
        }}
      />
    </Layout.Header>
  );
}

export default Header;
