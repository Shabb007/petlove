import { useSelector } from "react-redux";
import sprite from "../assets/sprite.svg";
import { Link, useLocation } from "react-router-dom";
import { selectUser } from "../redux/users/selectors.js";
import useResponsive from "../hooks/useResponsive.js";

const UserBar = () => {
  const user = useSelector(selectUser);
  const { windowWidth } = useResponsive();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const { avatar, name } = user;

  return (
    <div className="flex items-center gap-2">
      <Link
        className="hover:bg-brown-light-secondary focus:bg-brown-light-secondary bg-brown-light flex h-10 w-10 items-center justify-center rounded-full outline-0 transition md:h-12.5 md:w-12.5"
        to="/profile"
      >
        {avatar ? (
          <img src={avatar} alt={name || "User Avatar"} />
        ) : (
          <svg className="fill-orange" width={20} height={20}>
            <use href={sprite + "#icon-user"}></use>
          </svg>
        )}
      </Link>
      {windowWidth >= 768 && (
        <p
          className={
            isHomePage
              ? "text-xl leading-5 font-bold tracking-[-0.03em] text-white"
              : "text-xl leading-5 font-bold tracking-[-0.03em]"
          }
        >
          {name}
        </p>
      )}
    </div>
  );
};
export default UserBar;
