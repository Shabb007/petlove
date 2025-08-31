import { Suspense } from "react";
import Header from "./Header.jsx";
import Loader from "./Loader.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className={isHomePage ? "py-5 md:py-8 xl:py-4" : ""}>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
export default Layout;
