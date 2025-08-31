import { useEffect, useRef } from "react";
import sprite from "../assets/sprite.svg";

const ModalNotice = ({
  notice,
  isOpen,
  onClose,
  isFavorite,
  handleAddToFavorites,
  handleRemoveFromFavorites,
}) => {
  const backdropRef = useRef(null);

  const handleCloseModal = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const {
    title,
    imgURL,
    name,
    sex,
    species,
    birthday,
    category,
    comment,
    price,
    popularity,
  } = notice;

  const birthdayDate = new Date(birthday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedBirthdayDate = birthdayDate.replace(/\//g, ".");

  const formattedPopularity = popularity > 5 ? 5 : popularity;

  const generateStars = (count) => {
    const stars = [];

    for (let i = 0; i < count; i += 1) {
      stars.push(
        <svg key={i} width={16} height={16} className="fill-orange">
          <use href={sprite + "#icon-star"}></use>
        </svg>
      );
    }

    for (let i = count; i < 5; i += 1) {
      stars.push(
        <svg key={i} width={16} height={16} className="fill-gray-light">
          <use href={sprite + "#icon-star"}></use>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/30"
      ref={backdropRef}
      onClick={handleCloseModal}
    >
      <div className="relative flex w-[335px] flex-col items-center rounded-[30px] bg-white px-7 py-10 md:w-[473px] md:pr-18 md:pl-[71px]">
        <button
          className="absolute top-5 right-5 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <svg className="fill-black" width={24} height={24}>
            <use href={sprite + "#icon-close"}></use>
          </svg>
        </button>
        <div className="relative mb-5 md:mb-4">
          <div className="bg-orange flex h-30 w-30 items-center justify-center overflow-hidden rounded-full md:h-37.5 md:w-37.5">
            <img src={imgURL} alt={name || "Notice Image"} />
          </div>
          <span className="bg-brown-light text-orange absolute top-0 left-0 z-20 rounded-[30px] px-3.5 py-2 text-xs leading-4 tracking-[-0.24px] capitalize md:text-sm md:leading-4.5 md:tracking-[-0.02em]">
            {category}
          </span>
        </div>
        <h3 className="text-black-secondary mb-3 text-base leading-5 font-bold md:mb-2.5 md:text-lg md:leading-6">
          {title}
        </h3>
        <div className="mb-6.5 flex items-center justify-center gap-1 md:mb-5">
          <div className="flex items-center justify-center gap-1">
            {generateStars(formattedPopularity)}
          </div>
          <p className="text-black-secondary leading-5">{popularity}</p>
        </div>
        <ul className="mb-4 flex items-center justify-between gap-[27px]">
          <li className="flex flex-col items-center justify-center gap-1">
            <p className="text-[10px] leading-3.5 tracking-[-0.2px] text-black/50">
              Name
            </p>
            <p className="text-xs leading-3.5 tracking-[-0.24px] capitalize">
              {name}
            </p>
          </li>
          <li className="flex flex-col items-center justify-center gap-1">
            <p className="text-[10px] leading-3.5 tracking-[-0.2px] text-black/50">
              Birthday
            </p>
            <p className="text-xs leading-3.5 tracking-[-0.24px]">
              {formattedBirthdayDate}
            </p>
          </li>
          <li className="flex flex-col items-center justify-center gap-1">
            <p className="text-[10px] leading-3.5 tracking-[-0.2px] text-black/50">
              Sex
            </p>
            <p className="text-xs leading-3.5 tracking-[-0.24px] capitalize">
              {sex}
            </p>
          </li>
          <li className="flex flex-col items-center justify-center gap-1">
            <p className="text-[10px] leading-3.5 tracking-[-0.2px] text-black/50">
              Species
            </p>
            <p className="text-xs leading-3.5 tracking-[-0.24px] capitalize">
              {species}
            </p>
          </li>
        </ul>
        <p className="text-black-secondary mb-8">{comment}</p>
        <p className="text-black-secondary mb-5 text-base leading-5 font-bold md:text-lg md:leading-6">
          {price ? `$${price}` : "Free"}
        </p>
        <div className="flex items-center justify-center gap-2 md:gap-2.5">
          {isFavorite ? (
            <button
              className="bg-orange focus:bg-orange-secondary hover:bg-orange-secondary flex h-11 w-[135px] cursor-pointer items-center justify-center gap-2 rounded-[30px] border-0 text-base leading-5 font-medium tracking-[-0.48px] text-white outline-0 transition md:h-12 md:w-40"
              type="button"
              onClick={handleRemoveFromFavorites}
            >
              Remove from{" "}
              <svg width={18} height={18} className="fill-white">
                <use href={sprite + "#icon-heart"}></use>
              </svg>
            </button>
          ) : (
            <button
              className="bg-orange focus:bg-orange-secondary hover:bg-orange-secondary flex h-11 w-[135px] cursor-pointer items-center justify-center gap-2 rounded-[30px] border-0 text-base leading-5 font-medium tracking-[-0.48px] text-white outline-0 transition md:h-12 md:w-40"
              type="button"
              onClick={handleAddToFavorites}
            >
              Add to{" "}
              <svg width={18} height={18} className="fill-white">
                <use href={sprite + "#icon-heart"}></use>
              </svg>
            </button>
          )}
          <button
            className="bg-brown-light hover:bg-brown-light-secondary focus:bg-brown-light-secondary text-orange h-11 w-33.5 cursor-pointer rounded-[30px] border-0 text-base leading-5 font-medium tracking-[-0.48px] outline-0 transition md:h-12 md:w-40"
            type="button"
            onClick={() => {
              onClose();
              window.location.href = "mailto:test@gmail.com";
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalNotice;
