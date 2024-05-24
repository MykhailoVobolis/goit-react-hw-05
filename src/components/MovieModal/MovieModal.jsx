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
        afterOpen: css.openedModalContainer,
        beforeClose: css.closedModalContainer,
      }}
      className={{
        base: css.modalContent,
        afterOpen: css.openedModalContent,
        beforeClose: css.closedModalContent,
      }}
      closeTimeoutMS={500}
      onRequestClose={onClose}>
      <Player isOpen={isOpen} trailerUrl={trailerUrl} />
    </Modal>
  );
}
