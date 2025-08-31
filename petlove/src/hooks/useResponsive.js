import { useEffect, useState } from "react";

const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return { windowWidth };
};

export default useResponsive;
