import { createContext, use, useState } from "react";

export const ModalContext = createContext();

export const useModal = () => use(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, modalContent, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
