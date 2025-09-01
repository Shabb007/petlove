import sprite from "../assets/sprite.svg";
import catImg from "../assets/img/cat@1x.webp.url";
import catImg2x from "../assets/img/cat@2x.webp";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/users/operations.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { selectError } from "../redux/users/selectors.js";

const ModalApproveAction = ({ isOpen, onClose }) => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backdropRef = useRef(null);

  const handleCloseModal = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleLogout = () => {
    dispatch(logOut());
    if (error) {
      return;
    }
    navigate("/home");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/30"
      ref={backdropRef}
      onClick={handleCloseModal}
    >
      <div className="relative flex w-[335px] flex-col items-center rounded-[30px] bg-white px-7 py-10 md:w-112 md:p-20">
        <button
          className="absolute top-5 right-5 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <svg className="fill-black" width={24} height={24}>
            <use href={sprite + "#icon-close"}></use>
          </svg>
        </button>
        <div className="bg-brown-light mb-5 flex h-20 w-20 items-center justify-center rounded-full">
          <img
            src={catImg}
            alt="Cat Image"
            srcSet={`${catImg} 1x, ${catImg2x} 2x`}
            width={44}
            height={44}
          />
        </div>
        <h2 className="mb-7 text-xl leading-5 font-bold tracking-[-0.6px] md:text-2xl md:leading-7 md:tracking-[-0.03em]">
          Already leaving?
        </h2>
        <div className="flex items-center justify-center gap-2">
          <button
            className="bg-orange focus:bg-orange-secondary hover:bg-orange-secondary h-10.5 w-[137px] cursor-pointer rounded-[30px] border-0 text-sm leading-4.5 font-bold tracking-[-0.42px] text-white outline-0 transition md:h-12 md:w-35 md:text-base md:leading-5"
            type="button"
            onClick={handleLogout}
          >
            Yes
          </button>
          <button
            className="h-10.5 w-[134px] cursor-pointer rounded-[30px] border-0 bg-black/5 text-sm leading-4.5 font-bold tracking-[-0.42px] text-black outline-0 transition hover:bg-black/10 focus:bg-black/10 md:h-12 md:w-35 md:text-base md:leading-5"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalApproveAction;
