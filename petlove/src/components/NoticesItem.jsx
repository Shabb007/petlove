import { useState } from "react";
import sprite from "../assets/sprite.svg";
import ModalAttention from "./ModalAttention.jsx";
import ModalNotice from "./ModalNotice.jsx";
import { selectIsLoggedIn } from "../redux/users/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addNoticeFavorites,
  deleteNoticeFavorites,
} from "../redux/notices/operations.js";
import { addNoticeViewed } from "../redux/users/slice.js";
import { selectFavorites } from "../redux/notices/selectors.js";
import { getCurrentUser } from "../redux/users/operations.js";
import { useLocation } from "react-router-dom";

const NoticesItem = ({ notice }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalNoticeOpen, setIsModalNoticeOpen] = useState(false);
  const favorites = useSelector(selectFavorites);
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  const isFavorite = favorites.includes(notice._id);

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalNotice = () => {
    setIsModalNoticeOpen(true);
    dispatch(addNoticeViewed(notice));
  };
  const closeModalNotice = () => setIsModalNoticeOpen(false);

  const handleAddToFavorites = () => {
    dispatch(addNoticeFavorites(notice._id)).then(() => {
      dispatch(getCurrentUser());
    });
  };

  const handleRemoveFromFavorites = () => {
    dispatch(deleteNoticeFavorites(notice._id)).then(() => {
      dispatch(getCurrentUser());
    });
  };

  return (
    <>
      <div
        className={
          isProfilePage
            ? "flex flex-col items-center justify-start gap-6 rounded-2xl bg-white p-6 md:w-85.5 md:gap-3.5 md:px-3.5 md:pt-3.5 md:pb-6 xl:w-80"
            : "flex flex-col items-center justify-start gap-6 rounded-2xl bg-white p-6 md:w-85.5 xl:w-[363px]"
        }
      >
        <div
          className={
            isProfilePage
              ? "flex h-44.5 w-[287px] items-center justify-center overflow-hidden rounded-2xl bg-gray-200 md:h-40.5 md:w-78.5 xl:w-73"
              : "flex h-44.5 w-[287px] items-center justify-center overflow-hidden rounded-2xl bg-gray-200 md:w-73.5 xl:w-[315px]"
          }
        >
          <img src={imgURL} alt={title || "Notice Image"} />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-black-secondary truncate text-base leading-5 font-bold capitalize md:text-lg md:leading-6">
              {title}
            </p>
            <div className="flex items-center gap-1">
              <svg width={16} height={16} className="fill-orange">
                <use href={sprite + "#icon-star"}></use>
              </svg>
              <p className="text-black-secondary md:leading-5">{popularity}</p>
            </div>
          </div>
          <ul
            className={
              isProfilePage
                ? "mb-3.5 flex w-[287px] items-start gap-3.5 md:h-11 md:w-78.5 md:gap-4 xl:w-73"
                : "mb-4 flex w-[287px] items-start gap-3.5 md:h-11 md:w-73.5 md:gap-4"
            }
          >
            <li className="flex flex-col gap-0.5">
              <p className="text-[10px] leading-3.5 tracking-[-0.02em] text-black/50">
                Name
              </p>
              <p className="text-xs leading-3.5 tracking-[-0.02em]">{name}</p>
            </li>
            <li className="flex flex-col gap-0.5">
              <p className="text-[10px] leading-3.5 tracking-[-0.02em] text-black/50">
                Birthday
              </p>
              <p className="text-xs leading-3.5 tracking-[-0.02em]">
                {formattedBirthdayDate}
              </p>
            </li>
            <li className="flex flex-col gap-0.5">
              <p className="text-[10px] leading-3.5 tracking-[-0.02em] text-black/50">
                Sex
              </p>
              <p className="text-xs leading-3.5 tracking-[-0.02em] capitalize">
                {sex}
              </p>
            </li>
            <li className="flex flex-col gap-0.5">
              <p className="text-[10px] leading-3.5 tracking-[-0.02em] text-black/50">
                Species
              </p>
              <p className="text-xs leading-3.5 tracking-[-0.02em] capitalize">
                {species}
              </p>
            </li>
            <li className="flex flex-col gap-0.5">
              <p className="text-[10px] leading-3.5 tracking-[-0.02em] text-black/50">
                Category
              </p>
              <p className="text-xs leading-3.5 tracking-[-0.02em] capitalize">
                {category}
              </p>
            </li>
          </ul>
          <p
            className={
              isProfilePage
                ? "text-black-secondary mb-4 tracking-[-0.02em] md:mb-4 md:h-9"
                : "text-black-secondary mb-4 tracking-[-0.02em] md:mb-6 md:h-9"
            }
          >
            {comment}
          </p>
          <p className="mb-3 text-base leading-5 font-bold text-[#2b2b2a] md:text-lg md:leading-6">
            {price ? `$${price}` : "Free"}
          </p>
          <div className="flex items-center justify-center gap-2.5">
            <button
              className={
                isProfilePage
                  ? "bg-orange focus:bg-orange-secondary hover:bg-orange-secondary h-11.5 w-[231px] cursor-pointer rounded-[30px] border-0 text-sm leading-4.5 font-medium tracking-[-0.42px] text-white outline-0 transition md:h-11 md:w-65 md:text-base md:leading-5 md:tracking-[-0.03em] xl:w-59.5"
                  : "bg-orange focus:bg-orange-secondary hover:bg-orange-secondary h-11.5 w-[231px] cursor-pointer rounded-[30px] border-0 text-sm leading-4.5 font-medium tracking-[-0.42px] text-white outline-0 transition md:h-12 md:w-59 md:text-base md:leading-5 md:tracking-[-0.03em] xl:w-[257px]"
              }
              type="button"
              onClick={isLoggedIn ? openModalNotice : openModal}
            >
              Learn more
            </button>
            {isFavorite && isLoggedIn ? (
              <button
                className={
                  isProfilePage
                    ? "bg-brown-light hover:bg-brown-light-secondary focus:bg-brown-light-secondary flex h-11.5 w-11.5 cursor-pointer items-center justify-center rounded-full border-0 outline-0 transition md:h-11 md:w-11"
                    : "bg-brown-light hover:bg-brown-light-secondary focus:bg-brown-light-secondary flex h-11.5 w-11.5 cursor-pointer items-center justify-center rounded-full border-0 outline-0 transition md:h-12 md:w-12"
                }
                type="button"
                onClick={isLoggedIn ? handleRemoveFromFavorites : openModal}
              >
                <svg width={18} height={18} className="fill-orange">
                  <use href={sprite + "#icon-trash"}></use>
                </svg>
              </button>
            ) : (
              <button
                className={
                  isProfilePage
                    ? "bg-brown-light hover:bg-brown-light-secondary focus:bg-brown-light-secondary flex h-11.5 w-11.5 cursor-pointer items-center justify-center rounded-full border-0 outline-0 transition md:h-11 md:w-11"
                    : "bg-brown-light hover:bg-brown-light-secondary focus:bg-brown-light-secondary flex h-11.5 w-11.5 cursor-pointer items-center justify-center rounded-full border-0 outline-0 transition md:h-12 md:w-12"
                }
                type="button"
                onClick={isLoggedIn ? handleAddToFavorites : openModal}
              >
                <svg width={18} height={18} className="fill-orange">
                  <use href={sprite + "#icon-heart"}></use>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalAttention isOpen={isModalOpen} onClose={closeModal} />
      )}
      {isModalNoticeOpen && (
        <ModalNotice
          notice={notice}
          isOpen={isModalNoticeOpen}
          onClose={closeModalNotice}
          isFavorite={isFavorite}
          handleAddToFavorites={handleAddToFavorites}
          handleRemoveFromFavorites={handleRemoveFromFavorites}
        />
      )}
    </>
  );
};
export default NoticesItem;
