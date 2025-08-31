import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectNoticesFavorites,
  selectNoticesViewed,
} from "../redux/users/selectors.js";
import FavoritesList from "./FavoritesList.jsx";
import ViewedList from "./ViewedList.jsx";

const MyNotices = () => {
  const [activeTab, setActiveTab] = useState("my-favorite-pets");
  const noticesFavorites = useSelector(selectNoticesFavorites);
  const noticesViewed = useSelector(selectNoticesViewed);

  const [favorites, setFavorites] = useState([]);
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    setFavorites(noticesFavorites);
    setViewed(noticesViewed);
  }, [noticesFavorites, noticesViewed]);

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="xl:flex xl:flex-col xl:pt-10">
      <div className="mb-5 flex items-center justify-start gap-2.5 md:gap-2">
        <button
          className={
            activeTab === "my-favorite-pets"
              ? "bg-orange h-10.5 w-[123px] cursor-pointer rounded-[30px] border-0 text-sm leading-4.5 font-medium tracking-[-0.42px] text-white outline-0 md:h-12 md:w-35.5 md:text-base md:leading-5 md:tracking-[-0.03em]"
              : "h-10.5 w-[123px] cursor-pointer rounded-[30px] border-0 bg-white text-sm leading-4.5 font-medium tracking-[-0.42px] text-black outline-0 md:h-12 md:w-35.5 md:text-base md:leading-5 md:tracking-[-0.03em]"
          }
          type="button"
          onClick={() => handleChangeTab("my-favorite-pets")}
        >
          My favorite pets
        </button>
        <button
          className={
            activeTab === "viewed"
              ? "bg-orange h-10.5 w-[123px] cursor-pointer rounded-[30px] border-0 text-sm leading-4.5 font-medium tracking-[-0.42px] text-white outline-0 md:h-12 md:w-35.5 md:text-base md:leading-5 md:tracking-[-0.03em]"
              : "h-10.5 w-[123px] cursor-pointer rounded-[30px] border-0 bg-white text-sm leading-4.5 font-medium tracking-[-0.42px] text-black outline-0 md:h-12 md:w-35.5 md:text-base md:leading-5 md:tracking-[-0.03em]"
          }
          type="button"
          onClick={() => handleChangeTab("viewed")}
        >
          Viewed
        </button>
      </div>
      {activeTab === "my-favorite-pets" ? (
        <FavoritesList favorites={favorites} />
      ) : (
        <ViewedList viewed={viewed} />
      )}
    </div>
  );
};
export default MyNotices;
