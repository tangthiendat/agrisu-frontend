import { MdOutlineDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FiBox } from "react-icons/fi";
import { MdOutlineHomeWork } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { AiOutlineTransaction } from "react-icons/ai";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <NavLink to="/dashboard" className="nav-link">
            <MdOutlineDashboard />
            <span>Trang chủ</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="nav-link">
            <FiBox />
            <span>Sản phẩm</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/vendors" className="nav-link">
            <MdOutlineHomeWork />
            <span>Nhà cung cấp</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers" className="nav-link">
            <FaRegUser />
            <span>Khách hàng</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/retail" className="nav-link">
            <IoCartOutline />
            <span>Bán hàng</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/invoices" className="nav-link">
            <LiaFileInvoiceDollarSolid />
            <span>Hóa đơn</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cash-book" className="nav-link">
            <AiOutlineTransaction />
            <span>Sổ quỹ</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
