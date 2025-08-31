import Title from "../components/Title.jsx";
import NoticesFilters from "../components/NoticesFilters.jsx";
import NoticesList from "../components/NoticesList.jsx";
import Pagination from "../components/Pagination.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../redux/cities/operations.js";
import { useEffect, useState } from "react";
import {
  fetchNotices,
  getNoticeCategories,
  getNoticeGender,
  getNoticeSpecies,
} from "../redux/notices/operations.js";
import { selectFilters } from "../redux/filters/selectors.js";
import { setQueryParams } from "../utils/setQueryParams.js";
import { selectTotalPages } from "../redux/notices/selectors.js";

const NoticesPage = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const totalPages = useSelector(selectTotalPages);
  const queryParams = setQueryParams(filters);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(getNoticeCategories());
    dispatch(getNoticeGender());
    dispatch(getNoticeSpecies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchNotices({ page: pageNumber, queryParams }));
  }, [dispatch, pageNumber, queryParams]);

  return (
    <section className="flex flex-col gap-10 pt-8 pb-22 md:pt-[53px] md:gap-11 xl:gap-10">
      <Title>Find your favorite pet</Title>
      <div className="flex flex-col items-center">
        <NoticesFilters />
        <NoticesList />
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
        />
      </div>
    </section>
  );
};

export default NoticesPage;
