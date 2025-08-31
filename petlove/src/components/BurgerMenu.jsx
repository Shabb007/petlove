import { useEffect, useRef, useState } from "react";
import sprite from "../assets/sprite.svg";
import Nav from "../components/Nav.jsx";
import AuthNav from "./AuthNav.jsx";
import UserNav from "./UserNav.jsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/users/selectors.js";
import useResponsive from "../hooks/useResponsive.js";
import { useLocation } from "react-router-dom";
import { noScroll } from "../utils/noScroll.js";

const BurgerMenu = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { windowWidth } = useResponsive();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  useEffect(() => {
    noScroll(isMenuOpen);
  }, [isMenuOpen]);

  const handleCloseMenu = (e) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  return (
    <>
      <button
        type="button"
        className="flex items-center"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className={isHomePage ? "fill-white md:h-9 md:w-9" : "md:h-9 md:w-9"}
          width={32}
          height={32}
        >
          <use href={sprite + "#icon-menu"}></use>
        </svg>
      </button>

      {isMenuOpen && (
        <div
          className={
            isHomePage
              ? "absolute top-0 right-0 z-10 flex h-[100vh] w-54.5 flex-col items-center justify-between bg-white pt-59 pb-10"
              : "bg-orange absolute top-0 right-0 z-10 flex h-[100vh] w-54.5 flex-col items-center justify-between pt-59 pb-10"
          }
          ref={menuRef}
          onClick={handleCloseMenu}
        >
          <button
            type="button"
            className="absolute top-7 right-5"
            onClick={handleCloseMenu}
          >
            <svg
              className={isHomePage ? "fill-black" : "fill-white"}
              width={32}
              height={32}
            >
              <use href={sprite + "#icon-close"}></use>
            </svg>
          </button>
          <Nav />
          {windowWidth < 768 && (
            <div>{isLoggedIn ? <UserNav /> : <AuthNav />}</div>
          )}
        </div>
      )}
    </>
  );
};
export default BurgerMenu;
