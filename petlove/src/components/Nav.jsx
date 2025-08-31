import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const buildLinkClass = ({ isActive }) => {
    if (isHomePage) {
      return clsx(
        "w-[119px] h-12 block p-[15px] border border-solid border-black/15 rounded-[30px] text-black text-center outline-0 tracking-[-0.42px] md:w-30 md:h-12.5 md:text-base md:leading-5 md:tracking-[-0.03em] xl:w-auto xl:px-5 xl:py-[15px] xl:border-white/40 xl:text-white",
        isActive && "border-orange"
      );
    } else {
      return clsx(
        "w-[119px] h-12 block p-[15px] border border-solid border-white/15 rounded-[30px] text-white text-center outline-0 tracking-[-0.42px] md:w-30 md:h-12.5 md:text-base md:leading-5 md:tracking-[-0.03em] xl:w-auto xl:px-5 xl:py-[15px] xl:border-black/15 xl:text-black",
        isActive && "border-white/50 xl:border-orange"
      );
    }
  };

  return (
    <nav className="flex flex-col gap-2.5 xl:flex-row">
      <NavLink to="/news" className={buildLinkClass}>
        News
      </NavLink>
      <NavLink to="/notices" className={buildLinkClass}>
        Find pet
      </NavLink>
      <NavLink to="/friends" className={buildLinkClass}>
        Our friends
      </NavLink>
    </nav>
  );
};
export default Nav;
