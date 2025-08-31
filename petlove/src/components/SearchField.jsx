import { useLocation } from "react-router-dom";
import sprite from "../assets/sprite.svg";

const SearchField = ({
  inputValue,
  handleInputChange,
  handleClearQuery,
  onBlur,
}) => {
  const location = useLocation();

  return (
    <label className="relative inline-block">
      <input
        className={
          location.pathname === "/news"
            ? "peer focus:border-orange h-10.5 w-full rounded-[30px] border border-black/15 p-3 text-black outline-0 placeholder:text-black/50 md:h-12 md:w-[230px] md:p-3.5 md:text-base md:leading-5 md:tracking-[-0.03em] md:placeholder:text-base"
            : "peer h-10.5 w-full rounded-[30px] border border-transparent bg-white p-3 text-black outline-0 placeholder:text-black focus:border-transparent md:h-12 md:w-[265px] md:p-3.5 md:text-base md:leading-5 md:tracking-[-0.03em] md:placeholder:text-base"
        }
        type="text"
        name="search"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={onBlur}
      />
      <button
        className="absolute top-3 right-3 cursor-pointer border-0 outline-0 md:top-[15px] md:right-3.5"
        type="submit"
      >
        <svg className="fill-black" width={18} height={18}>
          <use href={sprite + "#icon-search"}></use>
        </svg>
      </button>
      {inputValue && (
        <button
          className="absolute top-3 right-8.5 cursor-pointer border-0 outline-0 peer-focus:block md:top-[15px] md:right-9"
          type="button"
          onClick={handleClearQuery}
        >
          <svg className="fill-black" width={18} height={18}>
            <use href={sprite + "#icon-close"}></use>
          </svg>
        </button>
      )}
    </label>
  );
};
export default SearchField;
