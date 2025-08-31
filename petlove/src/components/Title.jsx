import { useLocation } from "react-router-dom";

const Title = ({ children }) => {
  const location = useLocation();
  const isNoticesPage = location.pathname === "/notices";
  const isLoginPage = location.pathname === "/login";
  const isRegistrationPage = location.pathname === "/register";

  const defaultTitleStyles = isNoticesPage
    ? "text-[28px] leading-7 font-bold md:text-[54px] md:leading-13.5 md:tracking-[-0.03em] lg:px-8"
    : "text-[28px] leading-7 font-bold md:text-[54px] md:leading-13.5 md:tracking-[-0.03em]";

  return (
    <h2
      className={
        isLoginPage || isRegistrationPage
          ? "text-[28px] leading-7 font-bold md:text-[54px] md:leading-13.5 md:tracking-[-0.04em]"
          : defaultTitleStyles
      }
    >
      {children}
    </h2>
  );
};
export default Title;
