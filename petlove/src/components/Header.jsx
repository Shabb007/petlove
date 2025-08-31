import { useSelector } from "react-redux";
import BurgerMenu from "./BurgerMenu.jsx";
import Logo from "./Logo.jsx";
import UserBar from "./UserBar.jsx";
import { selectIsLoggedIn } from "../redux/users/selectors.js";
import Nav from "./Nav.jsx";
import useResponsive from "../hooks/useResponsive.js";
import UserNav from "./UserNav.jsx";
import AuthNav from "./AuthNav.jsx";
import { useLocation } from "react-router-dom";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { windowWidth } = useResponsive();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <header
      className={
        isHomePage
          ? "flex justify-between items-center px-5 pt-3.5 pb-3.5 bg-orange rounded-t-[30px] rounded-tl-[30px] md:px-8 md:pt-6 md:pb-6 md:rounded-t-[60px] md:rounded-tl-[60px] xl:px-16 xl:pt-4 xl:pb-4"
          : "flex justify-between items-center pt-6 pb-4.5 md:pt-8 md:pb-8 xl:px-8"
      }
    >
      {windowWidth < 1280 ? (
        <>
          <Logo />
          {windowWidth < 768 ? (
            <div className="flex items-center gap-3">
              {isLoggedIn && <UserBar />}
              <BurgerMenu />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {isLoggedIn ? <UserNav /> : <AuthNav />}
              <BurgerMenu />
            </div>
          )}
        </>
      ) : (
        <>
          <Logo />
          <Nav />
          {isLoggedIn ? <UserNav /> : <AuthNav />}
        </>
      )}
    </header>
  );
};
export default Header;
