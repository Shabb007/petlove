export const setQueryParams = (filters) => {
  const queryParams = [];

  if (filters.keyword) {
    queryParams.push(`keyword=${filters.keyword}`);
  }
  if (filters.category) {
    queryParams.push(`category=${filters.category}`);
  }
  if (filters.species) {
    queryParams.push(`species=${filters.species}`);
  }
  if (filters.locationId) {
    queryParams.push(`locationId=${filters.locationId}`);
  }
  if (filters.byPrice) {
    queryParams.push(`byPrice=${filters.byPrice}`);
  }
  if (filters.byPopularity) {
    queryParams.push(`byPopularity=${filters.byPopularity}`);
  }
  if (filters.sex) {
    queryParams.push(`sex=${filters.sex}`);
  }

  return queryParams.join("&");
};
