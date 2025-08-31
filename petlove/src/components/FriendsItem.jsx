import { Link } from "react-router-dom";
import { getWorkHours } from "../utils/getWorkHours.js";

const FriendsItem = ({ friend }) => {
  const { title, email, address, phone, imageUrl, addressUrl, workDays } =
    friend;
  const workingHours = getWorkHours(workDays);

  return (
    <div className="relative flex gap-3.5 rounded-[15px] bg-white px-5 py-10 md:gap-4 xl:gap-5">
      <div className="h-20 w-20 rounded-full md:h-22.5 md:w-22.5">
        <img src={imageUrl} alt="Friend Image" />
      </div>
      <div className="flex w-49 flex-col gap-3.5 md:gap-5 xl:w-[220px]">
        <h2 className="text-base leading-5 font-bold tracking-[-0.64px] md:text-xl md:leading-6.5 md:tracking-[-0.04em]">
          {title}
        </h2>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-0.5">
            <p className="text-black/50">Email:</p>
            <Link
              className="truncate text-sm leading-4.5 font-medium tracking-[-0.28px] text-black transition-[text-decoration] hover:underline"
              to={`mailto:${email}`}
            >
              {email}
            </Link>
          </li>
          <li className="flex items-center gap-0.5">
            <p className="text-black/50">Address:</p>
            <Link
              className="truncate text-sm leading-4.5 font-medium tracking-[-0.28px] text-black transition-[text-decoration] hover:underline"
              to={addressUrl}
            >
              {address}
            </Link>
          </li>
          <li className="flex items-center gap-0.5">
            <p className="text-black/50">Phone:</p>
            <Link
              className="truncate text-sm leading-4.5 font-medium tracking-[-0.28px] text-black transition-[text-decoration] hover:underline"
              to={`tel:${phone}`}
            >
              {phone}
            </Link>
          </li>
        </ul>
      </div>
      <span className="bg-brown-light text-orange absolute top-3 right-3 rounded-[30px] p-2 text-xs leading-4 tracking-[-0.24px] md:text-sm md:leading-4.5 md:tracking-[-0.02em]">
        {workingHours || "Day and night"}
      </span>
    </div>
  );
};
export default FriendsItem;
