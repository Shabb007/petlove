import mainMobImg from "../assets/img/mainmob1.jpeg";
import mainMobImg2x from "../assets/img/mainmob2.jpeg";
import mainTabImg from "../assets/img/maintab1.jpeg";
import mainTabImg2x from "../assets/img/maintab2.jpeg";
import mainDeskImg from "../assets/img/maindesk1.jpeg";
import mainDeskImg2x from "../assets/img/maindesk2.jpeg";
import loaderMob from "../assets/img/loadermob.jpeg";
import loaderTab from "../assets/img/loadertab.jpeg";
import { useEffect, useState } from "react";
import useResponsive from "../hooks/useResponsive.js";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const windowWidth = useResponsive();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center">
      <picture>
        <source
          media={"(max-width: 767px)"}
          srcSet={`${mainMobImg} 1x, ${mainMobImg2x} 2x`}
        />
        <source
          media={"(min-width: 768px) and (max-width: 1279px)"}
          srcSet={`${mainTabImg} 1x, ${mainTabImg2x} 2x`}
        />
        <source
          media={"(min-width: 1280px)"}
          srcSet={`${mainDeskImg} 1x, ${mainDeskImg2x} 2x`}
        />
        <img src={mainDeskImg} alt="Main Image" />
      </picture>

      <div className="absolute z-50 h-67.5 w-67.5 overflow-hidden rounded-full md:h-99 md:w-99">
        <img
          className="animate-loader"
          src={windowWidth < 768 ? loaderMob : loaderTab}
          alt="Loader"
        />
      </div>
      <p className="absolute text-[50px] leading-12.5 font-bold tracking-[-2px] text-white">
        {progress}%
      </p>
    </div>
  );
};
export default Loader;
