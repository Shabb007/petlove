import sprite from "../assets/sprite.svg";
import dogImg from "../assets/img/dog1.jpeg";
import dogImg2x from "../assets/img/dog2.jpeg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const ModalAttention = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const backdropRef = useRef(null);

  if (!isOpen) return null;

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

  return (
    <div
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/30"
      ref={backdropRef}
      onClick={handleCloseModal}
    >
      <div className="relative flex w-[335px] flex-col items-center rounded-[30px] bg-white px-7 py-10 md:w-116.5 md:p-15">
        <button
          className="absolute top-5 right-5 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <svg className="fill-black" width={24} height={24}>
            <use href={sprite + "#icon-close"}></use>
          </svg>
        </button>
        <div className="bg-brown-light mb-5 flex h-20 w-20 items-center justify-center rounded-full p-4.5">
          <img
            src={dogImg}
            alt="Dog Image"
            srcSet={`${dogImg} 1x, ${dogImg2x} 2x`}
          />
        </div>
        <h2 className="text-orange mb-5 text-xl leading-5 font-bold tracking-[-0.6px] md:text-2xl md:leading-7 md:tracking-[-0.03em]">
          Attention
        </h2>
        <p className="text-black-secondary mb-6 text-center tracking-[-0.02em] md:mb-7">
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>
        <div className="flex items-center justify-center gap-2">
          <button
            className="bg-orange focus:bg-orange-secondary hover:bg-orange-secondary h-10.5 w-[135px] cursor-pointer rounded-[30px] border-0 text-sm leading-4.5 font-bold tracking-[-0.42px] text-white outline-0 transition md:h-12 md:w-35 md:text-base md:leading-5 md:tracking-[-0.03em]"
            type="button"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
          <button
            className="bg-brown-light hover:bg-brown-light-secondary focus:bg-brown-light-secondary text-orange h-10.5 w-[129px] cursor-pointer rounded-[30px] border-0 text-sm leading-4.5 font-bold tracking-[-0.42px] outline-0 transition md:h-12 md:w-35 md:text-base md:leading-5 md:tracking-[-0.03em]"
            type="button"
            onClick={() => navigate("/register")}
          >
            Registration
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalAttention;
