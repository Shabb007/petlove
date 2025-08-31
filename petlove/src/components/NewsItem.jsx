import { Link } from "react-router-dom";

const NewsItem = ({ item }) => {
  const { imgUrl, title, text, date, url } = item;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedDateString = formattedDate.replace(/\//g, "/");

  return (
    <div className="flex flex-col md:w-[340px] xl:w-[361px]">
      <div className="mb-5 flex h-[190px] w-full items-center overflow-hidden rounded-[15px] bg-white md:mb-7 md:h-[226px] md:w-[340px] xl:w-[361px]">
        <img
          className="object-cover"
          src={imgUrl}
          alt={title || "News Image"}
        />
      </div>
      <h3 className="mb-3 text-base leading-5 font-bold tracking-[-0.48px] md:mb-3.5 md:line-clamp-2 md:h-13 md:text-xl md:leading-6.5 md:tracking-[-0.03em]">
        {title}
      </h3>
      <p className="mb-[19px] line-clamp-4 max-h-19.5 tracking-[-0.02em] md:mb-7 md:h-19.5 md:text-base md:leading-5 md:tracking-[-0.02em]">
        {text}
      </p>
      <div className="flex items-center justify-between md:mb-7">
        <p className="tracking-[-0.28px] text-black/50 md:text-base md:leading-5 md:tracking-[-0.02em]">
          {formattedDateString}
        </p>
        <Link
          className="text-orange hover:text-orange-secondary focus:text-orange-secondary cursor-pointer border-0 text-sm leading-3.5 font-medium tracking-[-0.28px] underline decoration-solid decoration-auto underline-offset-auto outline-0 transition md:text-base md:leading-5 md:tracking-[-0.02em]"
          type="button"
          target="_blank"
          rel="noopener noreferrer nofollow"
          to={url}
        >
          Read more
        </Link>
      </div>
    </div>
  );
};
export default NewsItem;
