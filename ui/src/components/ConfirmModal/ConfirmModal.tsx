import React from "react";
import { CancelButton, CancelIcon, ConfirmButton, ConfirmIcon, ConfirmMessage, ConfirmModalBox, ConfirmModalContainer, ModalActions, TrashIcon } from "./style";

interface ConfirmModalProps {
    onConfirmFunction: Function,
    onCancelFunction: Function,
    Message: string,
}

export const ConfirmModal = ({ onConfirmFunction, onCancelFunction, Message }: ConfirmModalProps) => {

    const handleConfirmContainerClick = (e) => {
        if (e.target == document.getElementById('confirmModalContainer')) {
            onCancelFunction()
        }
    }

    return (
        <ConfirmModalContainer id="confirmModalContainer" onClick={handleConfirmContainerClick}>
            <ConfirmModalBox>
                <ConfirmMessage><TrashIcon />{Message}</ConfirmMessage>
                <ModalActions>
                    <CancelButton onClick={() => onCancelFunction()}><CancelIcon />Cancel</CancelButton>
                    <ConfirmButton onClick={() => onConfirmFunction()}><ConfirmIcon />Delete</ConfirmButton>
                </ModalActions>
            </ConfirmModalBox>
        </ConfirmModalContainer>
    )
}