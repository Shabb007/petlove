import { set } from "react-hook-form";
import sprite from "../assets/sprite.svg";
import useResponsive from "../hooks/useResponsive";

const Pagination = ({ currentPage, totalPages, setPageNumber }) => {
  const { windowWidth } = useResponsive();

  const handleChangePageNext = () => {
    if (currentPage >= totalPages) {
      return;
    }
    setPageNumber((prev) => prev + 1);
  };

  const handleChangePageBack = () => {
    if (currentPage === 1) {
      return;
    }
    setPageNumber((prev) => prev - 1);
  };

  const handleChangePageFirst = () => {
    setPageNumber(1);
  };

  const handleChangePageLast = () => {
    setPageNumber(totalPages);
  };

  const handleChangePage = () => {
    setPageNumber((prev) => prev + 2);
  };

  return (
    <div className="flex items-center justify-center gap-[11px] md:gap-6">
      <div className="flex gap-1.5 md:gap-2">
        <button
          className={
            currentPage === 1
              ? "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-transparent outline-0 md:h-11 md:w-11"
              : "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-transparent outline-0 md:h-11 md:w-11"
          }
          type="button"
          onClick={handleChangePageFirst}
        >
          <svg
            className={
              currentPage === 1
                ? "absolute left-[13px] rotate-90 fill-black/50 md:left-[15px] md:h-6 md:w-6"
                : "absolute left-[13px] rotate-90 fill-black md:left-[15px] md:h-6 md:w-6"
            }
            width={20}
            height={20}
          >
            <use href={sprite + "#icon-chevron-down"}></use>
          </svg>
          <svg
            className={
              currentPage === 1
                ? "absolute right-[13px] rotate-90 fill-black/50 md:right-[15px] md:h-6 md:w-6"
                : "absolute right-[13px] rotate-90 fill-black md:right-[15px] md:h-6 md:w-6"
            }
            width={20}
            height={20}
          >
            <use href={sprite + "#icon-chevron-down"}></use>
          </svg>
        </button>
        <button
          className={
            currentPage === 1
              ? "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-transparent outline-0 md:h-11 md:w-11"
              : "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-transparent outline-0 md:h-11 md:w-11"
          }
          type="button"
          onClick={handleChangePageBack}
        >
          <svg
            className={
              currentPage === 1
                ? "rotate-90 fill-black/50 md:h-6 md:w-6"
                : "rotate-90 fill-black md:h-6 md:w-6"
            }
            width={20}
            height={20}
          >
            <use href={sprite + "#icon-chevron-down"}></use>
          </svg>
        </button>
      </div>
      <div className="flex gap-2.5">
        <button
          className="border-orange bg-orange flex h-10 w-10 items-center justify-center rounded-full border text-sm leading-4.5 font-bold text-white outline-0 md:h-11 md:w-11 md:text-lg md:leading-5.5"
          type="button"
        >
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-transparent text-sm leading-4.5 font-bold text-black outline-0 md:h-11 md:w-11 md:text-lg md:leading-5.5"
            type="button"
            onClick={handleChangePageNext}
          >
            {Number(currentPage) + 1}
          </button>
        )}
        {windowWidth >= 768 && currentPage + 1 < totalPages && (
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-transparent text-sm leading-4.5 font-bold text-black outline-0 md:h-11 md:w-11 md:text-lg md:leading-5.5"
            type="button"
            onClick={handleChangePage}
          >
            {Number(currentPage) + 2}
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-transparent text-base leading-5 outline-0 md:h-11 md:w-11 md:text-xl md:leading-5.5"
            type="button"
          >
            ...
          </button>
        )}
      </div>
      <div className="flex gap-1.5 md:gap-2">
        <button
          className={
            currentPage < totalPages
              ? "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-transparent outline-0 md:h-11 md:w-11"
              : "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-transparent outline-0 md:h-11 md:w-11"
          }
          type="button"
          onClick={handleChangePageNext}
        >
          <svg
            className={
              currentPage < totalPages
                ? "rotate-270 fill-black md:h-6 md:w-6"
                : "rotate-270 fill-black/50 md:h-6 md:w-6"
            }
            width={20}
            height={20}
          >
            <use href={sprite + "#icon-chevron-down"}></use>
          </svg>
        </button>
        <button
          className={
            currentPage < totalPages
              ? "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/20 bg-transparent outline-0 md:h-11 md:w-11"
              : "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-transparent outline-0 md:h-11 md:w-11"
          }
          type="button"
          onClick={handleChangePageLast}
        >
          <svg
            className={
              currentPage < totalPages
                ? "absolute left-[13px] rotate-270 fill-black md:left-[14px] md:h-6 md:w-6"
                : "absolute left-[13px] rotate-270 fill-black/50 md:left-[14px] md:h-6 md:w-6"
            }
            width={20}
            height={20}
          >
            <use href={sprite + "#icon-chevron-down"}></use>
          </svg>
          <svg
            className={
              currentPage < totalPages
                ? "absolute right-[14px] rotate-270 fill-black md:right-[13px] md:h-6 md:w-6"
                : "absolute right-[14px] rotate-270 fill-black/50 md:right-[13px] md:h-6 md:w-6"
            }
            width={20}
            height={20}
          >
            <use href={sprite + "#icon-chevron-down"}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Pagination;
