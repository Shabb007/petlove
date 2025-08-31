import NoticesItem from "./NoticesItem.jsx";
import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectNotices,
} from "../redux/notices/selectors.js";
import Loader from "./Loader.jsx";

const NoticesList = () => {
  const notices = useSelector(selectNotices);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <>
      {isLoading && <Loader />}
      {error && <h3>{error}</h3>}
      <ul className="flex flex-col gap-5 mb-11 md:flex-row md:flex-wrap md:mb-15 xl:w-[1153px] xl:gap-x-8 xl:gap-y-10">
        {notices?.map((notice) => (
          <li key={notice._id}>
            <NoticesItem notice={notice} />
          </li>
        ))}
      </ul>
    </>
  );
};
export default NoticesList;
