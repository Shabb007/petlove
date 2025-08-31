import { Link, useLocation } from "react-router-dom";

const AuthNav = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <Link
        className={
          isHomePage
            ? "bg-orange focus:bg-brown-light hover:bg-brown-light focus:text-orange hover:text-orange block h-10.5 w-44.5 cursor-pointer rounded-[30px] border border-white/50 p-3 text-center leading-4.5 font-bold tracking-[-0.42px] text-white uppercase transition md:h-12.5 md:w-auto md:px-[35px] md:py-[15px] md:text-base md:leading-5 md:tracking-[-0.48px]"
            : "bg-orange focus:bg-orange-secondary hover:bg-orange-secondary block h-10.5 w-44.5 cursor-pointer rounded-[30px] border border-white/50 p-3 text-center leading-4.5 font-bold tracking-[-0.42px] text-white uppercase transition md:h-12.5 md:w-auto md:px-[35px] md:py-[15px] md:text-base md:leading-5 md:tracking-[-0.48px]"
        }
        to="/login"
      >
        Log In
      </Link>
      <Link
        className="bg-brown-light focus:bg-brown-light-secondary hover:bg-brown-light-secondary text-orange block h-10.5 w-44.5 cursor-pointer rounded-[30px] p-3 text-center leading-4.5 font-bold tracking-[-0.42px] uppercase transition md:h-12.5 md:w-auto md:px-5 md:py-[15px] md:text-base md:leading-5 md:tracking-[-0.48px]"
        to="/register"
      >
        Registration
      </Link>
    </div>
  );
};
export default AuthNav;
