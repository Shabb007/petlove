import { Link, useLocation } from "react-router-dom";
import sprite from "../assets/sprite.svg";

const Logo = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <Link
      className={
        isHomePage
          ? "text-xl/5 font-bold tracking-[-0.8px] text-white inline-flex items-end md:text-[28px] md:leading-7 md:tracking-[-0.64px]"
          : "text-xl/5 font-bold tracking-[-0.8px] inline-flex items-end md:text-[28px] md:leading-7 md:tracking-[-0.64px]"
      }
      to="/home"
    >
      petl
      <span className="w-[17px] h-[17px] md:w-[23px] md:h-[23px]">
        <svg
          width={17}
          height={17}
          className={
            isHomePage
              ? "fill-white md:w-[23px] md:h-[23px]"
              : "fill-orange md:w-[23px] md:h-[23px]"
          }
        >
          <use href={sprite + "#icon-heart-circle"}></use>
        </svg>
      </span>
      ve
    </Link>
  );
};
export default Logo;
