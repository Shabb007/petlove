import { useSelector } from "react-redux";
import sprite from "../assets/sprite.svg";
import { selectUser } from "../redux/users/selectors.js";

const UserBlock = ({ openModalEdit }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return;
  }
  const { name, email, phone, avatar } = user;

  return (
    <div className="mb-10">
      <div
        className={
          avatar
            ? "mb-7.5 flex flex-col items-center gap-2 md:mb-7"
            : "mb-7 flex flex-col items-center gap-2 md:mb-5"
        }
      >
        <div className="bg-brown-light flex h-23.5 w-23.5 items-center justify-center overflow-hidden rounded-full md:h-27.5 md:w-27.5">
          {avatar ? (
            <img src={avatar} alt="Avatar" />
          ) : (
            <svg
              width={40}
              height={40}
              className="fill-orange md:h-12.5 md:w-12.5"
            >
              <use href={sprite + "#icon-user"}></use>
            </svg>
          )}
        </div>
        {!avatar && (
          <button
            className="cursor-pointer border-0 text-xs leading-4 font-medium tracking-[-0.24px] underline decoration-solid decoration-auto underline-offset-auto outline-0"
            type="button"
            onClick={openModalEdit}
          >
            Upload photo
          </button>
        )}
      </div>
      <h3 className="mb-5 text-base leading-5 font-bold">My information</h3>
      <ul className="flex flex-col gap-2.5 md:flex-row md:flex-wrap md:gap-3.5">
        <li className="border-orange h-10.5 w-full rounded-[30px] border bg-transparent p-3 tracking-[-0.42px] md:h-13 md:w-[305px] md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em] xl:w-full">
          {name}
        </li>
        <li className="border-orange h-10.5 w-full rounded-[30px] border bg-transparent p-3 tracking-[-0.42px] md:h-13 md:w-[305px] md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em] xl:w-full">
          {email}
        </li>
        {phone ? (
          <li className="border-orange h-10.5 w-full rounded-[30px] border bg-transparent p-3 tracking-[-0.42px] md:h-13 md:w-[305px] md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em] xl:w-full">
            {phone}
          </li>
        ) : (
          <li className="h-10.5 w-full rounded-[30px] border border-black/15 bg-transparent p-3 tracking-[-0.42px] md:h-13 md:w-[305px] md:p-4 md:text-base md:leading-5 md:tracking-[-0.03em] xl:w-full">
            +380
          </li>
        )}
      </ul>
    </div>
  );
};
export default UserBlock;
