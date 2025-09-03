import dogImg from "../assets/img/dog1.jpeg";
import dogImg2x from "../assets/img/dog2.jpeg";
import catImg from "../assets/img/cat1.jpeg";
import catImg2x from "../assets/img/cat2.jpeg";
import { useLocation } from "react-router-dom";
import useResponsive from "../hooks/useResponsive.js";

const PetBlock = ({ mob, tab, desk, src }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegistrationPage = location.pathname === "/register";
  const { windowWidth } = useResponsive();

  return (
    <div className="relative overflow-hidden rounded-[30px] md:rounded-[60px]">
      <picture>
        <source media={"(max-width: 767px)"} srcSet={mob} />
        <source
          media={"(min-width: 768px) and (max-width: 1279px)"}
          srcSet={tab}
        />
        <source media={"(min-width: 1280px)"} srcSet={desk} />
        <img className="mx-auto my-0" src={src} alt="Pet image" />
      </picture>
      {windowWidth >= 768 && isLoginPage && (
        <div className="absolute bottom-8 left-8 flex w-73.5 gap-2 rounded-[20px] bg-white px-4 pt-4 pb-4.5 xl:bottom-[97px] xl:left-[61px]">
          <div className="bg-brown-light h-15 w-15 shrink-0 rounded-full px-3.5 pt-3 pb-4">
            <img
              src={dogImg}
              alt="Dog Image"
              srcSet={`${dogImg} 1x, ${dogImg2x} 2x`}
            />
          </div>
          <div className="flex flex-col gap-2 pt-[3px]">
            <div className="flex items-center justify-between">
              <p className="text-orange text-base leading-5 font-bold tracking-[-0.03em]">
                Rich
              </p>
              <div className="flex items-center gap-1">
                <p className="text-xs leading-3.5 tracking-[-0.02em] text-black/50">
                  Birthday:
                </p>
                <p className="text-xs leading-3.5 tracking-[-0.02em] text-black">
                  21.09.2020
                </p>
              </div>
            </div>
            <p className="text-xs leading-3.5 tracking-[-0.02em] text-black/80">
              Rich would be the perfect addition to an active family that loves
              to play and go on walks. I bet he would love having a doggy
              playmate too!
            </p>
          </div>
        </div>
      )}
      {windowWidth >= 768 && isRegistrationPage && (
        <div className="absolute bottom-8 left-8 flex w-73.5 gap-2 rounded-[20px] bg-white px-4 pt-4 pb-4.5 xl:bottom-[97px] xl:left-[61px]">
          <div className="bg-brown-light h-15 w-15 shrink-0 rounded-full px-3.5 pt-3 pb-4">
            <img
              src={catImg}
              alt="Cat Image"
              srcSet={`${catImg} 1x, ${catImg2x} 2x`}
            />
          </div>
          <div className="flex flex-col gap-2 pt-[3px]">
            <div className="flex items-center justify-between">
              <p className="text-orange text-base leading-5 font-bold tracking-[-0.03em]">
                Jack
              </p>
              <div className="flex items-center gap-1">
                <p className="text-xs leading-3.5 tracking-[-0.02em] text-black/50">
                  Birthday:
                </p>
                <p className="text-xs leading-3.5 tracking-[-0.02em] text-black">
                  18.10.2021
                </p>
              </div>
            </div>
            <p className="text-xs leading-3.5 tracking-[-0.02em] text-black/80">
              Jack is a gray Persian cat with green eyes. He loves to be
              pampered and groomed, and enjoys playing with toys.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default PetBlock;
