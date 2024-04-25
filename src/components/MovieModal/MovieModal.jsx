import css from "./MovieModal.module.css";
import Modal from "react-modal";
import Player from "../Player/Player";

Modal.setAppElement("#root");

export default function MovieModal({ isOpen, onClose, lageImage }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        overlayClassName={{
          base: css.modalContainer,
          afterOpen: css.afterModalContainerOpen,
        }}
        className={{
          base: css.modalContent,
          afterOpen: css.afterModalContentOpen,
          beforeClose: css.beforeModalContentClose,
        }}
        closeTimeoutMS={500}
        onRequestClose={onClose}>
        <Player />
      </Modal>
    </div>
  );
}
