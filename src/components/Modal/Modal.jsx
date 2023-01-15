import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Container } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ toggleModal, img }) => {
  useEffect(() => {
    window.addEventListener('keydown', handlKeyDown);
    return () => {
      window.removeEventListener('keydown', handlKeyDown);
    };
  });

  const handlKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };
  const handlOverlay = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={handlOverlay}>
      <Container>
        <img src={img} alt="" />
      </Container>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
