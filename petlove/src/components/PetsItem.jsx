import { useDispatch } from "react-redux";
import sprite from "../assets/sprite.svg";
import { deleteUserPet, getCurrentUser } from "../redux/users/operations.js";

const PetsItem = ({ pet }) => {
  const dispatch = useDispatch();

  const { _id, name, title, imgURL, species, birthday, sex } = pet;
  const birthdayDate = new Date(birthday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedBirthdayDate = birthdayDate.replace(/\//g, ".");

  const handleDeleteUserPet = () => {
    dispatch(deleteUserPet(_id)).then(() => {
      dispatch(getCurrentUser());
    });
  };

  return (
    <div className="relative flex gap-3.5 rounded-[20px] border border-black/10 p-4 md:w-[305px] md:px-4 md:pt-5.5 md:pb-[23px] xl:w-110 xl:gap-[25px] xl:p-5">
      <div className="bg-brown-light flex h-16.5 w-16.5 items-center justify-center overflow-hidden rounded-full md:h-[75px] md:w-[75px] xl:h-22.5 xl:w-22.5">
        <img src={imgURL} alt={name || "User Pet Image"} />
      </div>
      <div className="flex flex-col justify-between gap-2 md:gap-3 xl:w-[245px] xl:justify-center">
        <p className="text-black-secondary w-[145px] truncate font-bold capitalize xl:w-full">
          {title}
        </p>
        <ul className="flex w-[173px] flex-wrap gap-2.5 xl:w-full xl:flex-nowrap xl:gap-[25px]">
          <li className="flex flex-col justify-start gap-1">
            <p className="text-[10px] leading-3.5 tracking-[-0.2px] text-black/50">
              Name
            </p>
            <p className="text-xs leading-3.5 tracking-[-0.24px] capitalize">
              {name}
            </p>
          </li>
          <li className="flex flex-col justify-start gap-1">
            <p className="text-[10px] leading-3.5 tracking-[-0.2px] text-black/50">
              Birthday
            </p>
            <p className="text-xs leading-3.5 tracking-[-0.24px]">
              {formattedBirthdayDate}
            </p>
          </li>
          <li className="flex flex-col justify-start gap-1">
            <p className="text-[10px] leading-3.5 tracking-[-0.2px] text-black/50">
              Sex
            </p>
            <p className="text-xs leading-3.5 tracking-[-0.24px] capitalize">
              {sex}
            </p>
          </li>
          <li className="flex flex-col justify-start gap-1">
            <p className="text-[10px] leading-3.5 tracking-[-0.2px] text-black/50">
              Species
            </p>
            <p className="text-xs leading-3.5 tracking-[-0.24px] capitalize">
              {species}
            </p>
          </li>
        </ul>
      </div>
      <button
        className="bg-brown-light hover:bg-brown-light-secondary focus:bg-brown-light-secondary absolute top-3 right-3 flex h-7.5 w-7.5 items-center justify-center rounded-full transition md:h-8 md:w-8 xl:top-5 xl:right-5 xl:h-9.5 xl:w-9.5"
        type="button"
        onClick={handleDeleteUserPet}
      >
        <svg width={16} height={16} className="fill-orange md:h-4.5 md:w-4.5">
          <use href={sprite + "#icon-trash"}></use>
        </svg>
      </button>
    </div>
  );
};
export default PetsItem;
