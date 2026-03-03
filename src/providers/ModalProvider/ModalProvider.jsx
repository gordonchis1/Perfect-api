import { createContext, useState } from "react";
import Modal from "../../components/Global/Modal/Modal";
import GlobalSettingsModal from "../../components/Global/Modals/GlobalSettingsModal/GlobalSettingsModal";
import DirSettingsModal from "../../components/Global/Modals/DirSettingsModal/DirSettingsModal";
export const ModalContext = createContext(null);

const modalRegistry = {
  settings: GlobalSettingsModal,
  dirSettings: DirSettingsModal,
};

export default function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const close = () => {
    setModal(null);
  };
  const open = (type, props = {}) => {
    setModal({ type, props });
  };

  const renderModal = () => {
    if (!modal) return;

    const Component = modalRegistry[modal.type];

    return (
      <Modal>
        <Component {...modal.props} />
      </Modal>
    );
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
}
