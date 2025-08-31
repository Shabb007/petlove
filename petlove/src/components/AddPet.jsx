import { Link } from "react-router-dom";
import sprite from "../assets/sprite.svg";

const AddPet = () => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h3 className="text-base leading-5 font-bold md:text-lg md:leading-6">
        My pets
      </h3>
      <Link
        className="bg-orange focus:bg-orange-secondary hover:bg-orange-secondary flex h-9.5 w-[103px] cursor-pointer items-center justify-center gap-1 rounded-[30px] border-0 text-sm leading-4.5 font-medium tracking-[-0.42px] text-white outline-0 transition md:h-10 md:w-29.5 md:text-base md:leading-5 md:tracking-[-0.03em]"
        to="/add-pet"
      >
        Add pet
        <svg width={18} height={18} className="fill-white">
          <use href={sprite + "#icon-plus"}></use>
        </svg>
      </Link>
    </div>
  );
};
export default AddPet;
