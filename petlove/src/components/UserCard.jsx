import sprite from "../assets/sprite.svg";
import EditUserBtn from "./EditUserBtn.jsx";
import UserBlock from "./UserBlock.jsx";
import PetsBlock from "./PetsBlock.jsx";
import LogOutBtn from "./LogOutBtn.jsx";
import ModalEditUser from "./ModalEditUser.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/users/selectors.js";
import { useModal } from "./ModalContext.jsx";
import ModalApproveAction from "./ModalApproveAction.jsx";

const UserCard = () => {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const { avatar } = user;

  const logOutBtnStyles =
    "bg-brown-light text-orange w-28.5 hover:bg-brown-light-secondary cursor-pointer rounded-[30px] border-0 py-3 px-7 font-bold tracking-[-0.42px] uppercase outline-0 transition md:h-12.5 md:w-34 md:px-[35px] md:py-[15px] md:text-base md:leading-5 md:tracking-[-0.03em]";

  const openModalEdit = () => setIsModalOpen(true);
  const closeModalEdit = () => setIsModalOpen(false);

  return (
    <div
      className={
        avatar
          ? "relative mb-10 flex flex-col rounded-[30px] bg-white px-5 pt-19 pb-10 md:mb-8 md:p-10 xl:mb-0 xl:w-130 xl:rounded-[60px]"
          : "relative mb-10 flex flex-col rounded-[30px] bg-white px-5 pt-13.5 pb-10 md:mb-8 md:p-10 xl:mb-0 xl:w-130 xl:rounded-[60px]"
      }
    >
      <div className="bg-orange absolute top-4.5 left-5 flex h-9.5 w-20 items-center justify-center gap-1 rounded-[30px] md:top-10 md:left-10">
        <p className="tracking-[-0.28px] text-white">User</p>
        <svg width={18} height={18} className="fill-white">
          <use href={sprite + "#icon-user"}></use>
        </svg>
      </div>
      <EditUserBtn openModalEdit={openModalEdit} />
      <UserBlock openModalEdit={openModalEdit} />
      <PetsBlock />
      <LogOutBtn
        styles={logOutBtnStyles}
        onClick={() => openModal(<ModalApproveAction />)}
      />
      {isModalOpen && (
        <ModalEditUser isOpen={isModalOpen} onClose={closeModalEdit} />
      )}
      {isOpen && <ModalApproveAction isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
};
export default UserCard;
