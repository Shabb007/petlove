import { Link } from "react-router-dom";
import notFoundMobImg from "../assets/img/404errormob1x.jpeg";
import notFoundMobImg2x from "../assets/img/404errormob2x.jpeg";
import notFoundTabImg from "../assets/img/404errortab1x.jpeg";
import notFoundTabImg2x from "../assets/img/404errortab2x.jpeg";
import notFoundDeskImg from "../assets/img/404errordesk1x.jpeg";
import notFoundDeskImg2x from "../assets/img/404errordesk2x.jpeg";

const NotFoundPage = () => {
  return (
    <section className="pb-5 md:pb-8">
      <div className="bg-orange flex flex-col items-center justify-between gap-5 rounded-[30px] pt-[245px] pr-[33px] pb-[245px] pl-[33px] md:gap-10 md:px-8 md:py-[221px] xl:px-[283px] xl:py-[109px]">
        <div className="flex items-center gap-2 md:gap-0">
          <p className="text-[120px] leading-30 font-extrabold text-white md:text-[300px] md:leading-75">
            4
          </p>
          <picture>
            <source
              media={"(max-width: 767px)"}
              srcSet={`${notFoundMobImg} 1x, ${notFoundMobImg2x} 2x`}
            />
            <source
              media={"(min-width: 768px) and (max-width: 1279px)"}
              srcSet={`${notFoundTabImg} 1x, ${notFoundTabImg2x} 2x`}
            />
            <source
              media={"(min-width: 1280px)"}
              srcSet={`${notFoundDeskImg} 1x, ${notFoundDeskImg2x} 2x`}
            />
            <img
              className="h-[117px] w-29 rounded-[1000px] bg-white/10 md:h-70 md:w-70"
              src={notFoundDeskImg}
              alt="Not Found image"
            />
          </picture>
          <p className="text-[120px] leading-30 font-extrabold text-white md:text-[300px] md:leading-75">
            4
          </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <p className="text-base leading-5 font-bold tracking-[-0.48px] text-white md:text-2xl md:leading-7 md:tracking-[-0.03em]">
            Ooops! This page not found :(
          </p>
          <Link
            className="bg-brown-light text-orange hover:bg-brown-light-secondary focus:bg-brown-light-secondary h-10.5 w-37.5 cursor-pointer rounded-[30px] border-0 px-[30px] py-3 text-sm leading-4.5 font-bold tracking-[-0.42px] outline-0 transition md:h-12 md:w-40.5 md:py-3.5 md:text-base md:leading-5 md:tracking-[-0.03em]"
            to="/home"
          >
            To home page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
