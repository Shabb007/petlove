import sprite from "../assets/sprite.svg";
import mainMobImg from "../assets/img/mainmob1.jpeg";
import mainMobImg2x from "../assets/img/mainmob2.jpeg";
import mainTabImg from "../assets/img/maintab1.jpeg";
import mainTabImg2x from "../assets/img/maintab2.jpeg";
import mainDeskImg from "../assets/img/maindesk1.jpeg";
import mainDeskImg2x from "../assets/img/maindesk2.jpeg";
import { useEffect, useState } from "react";
import Loader from "./Loader.jsx";

const MainScreen = ({ onFinish }) => {
  const [showLogo, setShowLogo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
      setIsLoading(true);
    }, 2000);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
        onFinish();
      }, 3000);

      return () => clearTimeout(loadingTimer);
    }
  }, [isLoading, onFinish]);

  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center">
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
      {showLogo ? (
        <p className="absolute inline-flex items-center text-[50px] leading-12.5 font-bold tracking-[-0.04em] text-white">
          petl
          <span className="h-11 w-11">
            <svg width={44} height={44} className="fill-orange">
              <use href={sprite + "#icon-heart-circle"}></use>
            </svg>
          </span>
          ve
        </p>
      ) : isLoading ? (
        <Loader />
      ) : null}
    </div>
  );
};
export default MainScreen;
