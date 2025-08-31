import LogOutBtn from "./LogOutBtn.jsx";
import ModalApproveAction from "./ModalApproveAction.jsx";
import UserBar from "./UserBar.jsx";
import { useModal } from "./ModalContext.jsx";
import useResponsive from "../hooks/useResponsive.js";
import { useLocation } from "react-router-dom";

const UserNav = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { windowWidth } = useResponsive();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className="flex items-center gap-2">
      {!isHomePage && (
        <LogOutBtn onClick={() => openModal(<ModalApproveAction />)} />
      )}
      {windowWidth >= 768 && <UserBar />}

      {isOpen && <ModalApproveAction isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
};
export default UserNav;
