import NoticesItem from "./NoticesItem.jsx";

const FavoritesList = ({ favorites }) => {
  return (
    <>
      {favorites.length > 0 ? (
        <ul className={"flex flex-col gap-5 md:flex-row md:flex-wrap xl:gap-6"}>
          {favorites.map((favorite) => (
            <li key={favorite._id}>
              <NoticesItem notice={favorite} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center pt-12 pb-35 md:pt-40 md:pb-45.5 xl:px-25.5">
          <p className="w-83.5 text-center tracking-[-0.02em] md:w-114.5 md:text-base md:leading-5">
            Oops,{" "}
            <span className="text-orange font-bold">
              looks like there aren't any furries
            </span>{" "}
            on our adorable page yet. Do not worry! View your pets on the "find
            your favorite pet" page and add them to your favorites.
          </p>
        </div>
      )}
    </>
  );
};
export default FavoritesList;
