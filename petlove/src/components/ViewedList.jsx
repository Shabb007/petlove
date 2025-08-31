import NoticesItem from "./NoticesItem.jsx";

const ViewedList = ({ viewed }) => {
  return (
    <>
      {viewed.length > 0 ? (
        <ul className="flex flex-col gap-5 md:flex-row md:flex-wrap xl:gap-6">
          {viewed.map((item) => (
            <li key={item._id}>
              <NoticesItem notice={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center pt-12 pb-35 md:pt-40 md:pb-45.5">
          <p className="w-83.5 text-center tracking-[-0.02em] md:w-41.5 md:text-base md:leading-5">
            Oops, not viewed pets!
          </p>
        </div>
      )}
    </>
  );
};
export default ViewedList;
