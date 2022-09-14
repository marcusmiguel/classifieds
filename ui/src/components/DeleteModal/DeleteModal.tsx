import React from "react";
import { CancelButton, CancelIcon, ConfirmButton, ConfirmIcon, ConfirmMessage, DeleteModalBox, DeleteModalContainer, ModalActions, TrashIcon } from "./style";

interface DeleteModalProps {
    onConfirmFunction: Function,
    onCancelFunction: Function,
}

export const DeleteModal = ({ onConfirmFunction, onCancelFunction }: DeleteModalProps) => {

    const handleDeleteModalContainerClick = (e) => {
        if (e.target == document.getElementById('deleteModalContainer')) {
            onCancelFunction()
        }
    }

    return (
        <DeleteModalContainer id="deleteModalContainer" onClick={handleDeleteModalContainerClick}>
            <DeleteModalBox>
                <ConfirmMessage><TrashIcon />Are you sure?</ConfirmMessage>
                <ModalActions>
                    <CancelButton onClick={() => onCancelFunction()}><CancelIcon />Cancel</CancelButton>
                    <ConfirmButton onClick={() => onConfirmFunction()}><ConfirmIcon />Delete</ConfirmButton>
                </ModalActions>
            </DeleteModalBox>
        </DeleteModalContainer>
    )
}