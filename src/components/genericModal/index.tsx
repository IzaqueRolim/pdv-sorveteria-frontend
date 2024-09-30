import React, { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    {title && <Title>{title}</Title>}
                    <CloseIcon onClick={onClose}>&times;</CloseIcon>
                </ModalHeader>
                <ModalContent>{children}</ModalContent>
                {/* <ModalFooter>
                    <CloseButton onClick={onClose}>Fechar</CloseButton>
                </ModalFooter> */}
            </ModalContainer>
        </Overlay>
    );
};

// Estilos do Modal
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background: #fff;
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
    padding: 16px;
    background: #007bff;
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    font-size: 1.25rem;
`;

const CloseIcon = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        color: #ff0000;
    }
`;

const ModalContent = styled.div`
    padding: 16px;
`;

const ModalFooter = styled.div`
    padding: 16px;
    text-align: right;
`;

const CloseButton = styled.button`
    padding: 8px 16px;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

export default Modal;
