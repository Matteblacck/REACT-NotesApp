// Modal.js
import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: black;
  padding: 1.5rem;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-left:2rem;
  margin-right:2rem;
`;


const Modal = ({ onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <div>You sure you want to delete this note?</div>
        <ModalButtonContainer>
          <Button onClick={onConfirm}>Ye</Button>
          <Button onClick={onCancel}>Nuuh</Button>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;