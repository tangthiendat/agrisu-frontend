import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <div className="flex w-60 flex-col bg-[color:var(--color-grey-800)] px-3 py-1.5 text-[color:var(--color-grey-200)]">
      <Logo />
      <MainNav />
    </div>
  );
}

export default Sidebar;
