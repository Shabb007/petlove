import sprite from "../assets/sprite.svg";

const EditUserBtn = ({ openModalEdit }) => {
  return (
    <button
      className="bg-brown-light hover:bg-brown-light-secondary focus:bg-brown-light-secondary absolute top-4.5 right-5 flex h-9.5 w-9.5 cursor-pointer items-center justify-center rounded-full border-0 outline-0 transition md:top-10 md:right-10"
      type="button"
      onClick={openModalEdit}
    >
      <svg width={18} height={18} className="fill-orange">
        <use href={sprite + "#icon-edit"}></use>
      </svg>
    </button>
  );
};
export default EditUserBtn;
