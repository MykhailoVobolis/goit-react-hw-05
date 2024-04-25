import Modal from "react-modal";

import Player from "../Player/Player";

import css from "./MovieModal.module.css";

Modal.setAppElement("#root");

export default function MovieModal({ isOpen, onClose, trailerUrl }) {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={{
        base: css.modalContainer,
        afterOpen: css.afterModalContainerOpen,
        beforeClose: css.beforeModalContainerClose,
      }}
      className={{
        base: css.modalContent,
        afterOpen: css.afterModalContentOpen,
        beforeClose: css.beforeModalContentClose,
      }}
      closeTimeoutMS={500}
      onRequestClose={onClose}>
      <Player trailerUrl={trailerUrl} />
    </Modal>
  );
}
