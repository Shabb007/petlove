import homeMobImg from "../assets/img/homemob1.jpeg";
import homeMobImg2x from "../assets/img/homemob2.jpeg";
import homeTabImg from "../assets/img/hometab1.jpeg";
import homeTabImg2x from "../assets/img/hometab2.jpeg";
import homeDeskImg from "../assets/img/homedesk1.jpeg";
import homeDeskImg2x from "../assets/img/homedesk2.jpeg";

const HomePage = () => {
  return (
    <section>
      <div className="rounded-b-[30px] rounded-bl-[30px] bg-orange pt-10 px-5 pb-12.5 flex flex-col items-end gap-6 md:pt-16 md:px-8 md:rounded-b-[60px] md:rounded-bl-[60px] xl:flex-row xl:justify-between xl:px-16 xl:pt-24 xl:pb-8">
        <h1 className="text-[50px] font-bold text-white leading-12 tracking-[-1.5px] md:text-[80px] md:leading-[77px] md:tracking-[-0.03em] xl:w-[760px] xl:text-[90px] xl:leading-[87px]">
          Take good <span className="opacity-40">care</span> of your small pets
        </h1>
        <p className="text-white font-medium md:w-[255px] md:text-lg md:leading-5.5 md:tracking-[-0.02em] xl:text-lg xl:leading-5.5">
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>
      <picture>
        <source
          media={"(max-width: 767px)"}
          srcSet={`${homeMobImg} 1x, ${homeMobImg2x} 2x`}
        />
        <source
          media={"(min-width: 768px) and (max-width: 1279px)"}
          srcSet={`${homeTabImg} 1x, ${homeTabImg2x} 2x`}
        />
        <source
          media={"(min-width: 1280px)"}
          srcSet={`${homeDeskImg} 1x, ${homeDeskImg2x} 2x`}
        />
        <img
          className="rounded-[30px] md:rounded-[60px]"
          src={homeDeskImg}
          alt="Home Dog Image"
        />
      </picture>
    </section>
  );
};

export default HomePage;
