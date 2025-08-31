import { useSelector } from "react-redux";
import NewsItem from "./NewsItem.jsx";
import {
  selectError,
  selectIsLoading,
  selectNews,
} from "../redux/news/selectors.js";
import Loader from "./Loader.jsx";

const NewsList = () => {
  const news = useSelector(selectNews);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <ul className="flex flex-col gap-6 mb-11 md:mb-15 md:flex-row md:flex-wrap md:gap-y-8 md:gap-x-6 xl:gap-x-[34px] xl:gap-y-10">
      {isLoading && <Loader />}
      {error && <h3>{error}</h3>}
      {news?.map((item) => (
        <li key={item._id}>
          <NewsItem item={item} />
        </li>
      ))}
    </ul>
  );
};
export default NewsList;
