import Title from "../components/Title.jsx";
import SearchField from "../components/SearchField.jsx";
import NewsList from "../components/NewsList.jsx";
import Pagination from "../components/Pagination.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchNews } from "../redux/news/operations.js";
import { selectTotalPages } from "../redux/news/selectors.js";

const NewsPage = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const totalPages = useSelector(selectTotalPages);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(fetchNews({ page: pageNumber, keyword }));
  }, [dispatch, pageNumber, keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.search.value;
    setKeyword(query);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearQuery = () => {
    setInputValue("");
  };

  return (
    <section className="pt-8 pb-20 md:pt-[59px] xl:px-8 xl:pt-17.5">
      <div className="mb-6 flex flex-col gap-5 md:mb-11 md:flex-row md:items-center md:justify-between xl:mb-15">
        <Title>News</Title>
        <form onSubmit={handleSubmit}>
          <SearchField
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleClearQuery={handleClearQuery}
          />
        </form>
      </div>
      <NewsList />
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </section>
  );
};

export default NewsPage;
