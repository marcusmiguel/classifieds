import React, { useEffect } from "react";
import { Advertisement } from "../../types";
import { Form } from "../Form/Form";
import { CloseIcon, EditModalContainer, FormWrapper } from "./style";

interface EditModalProps {
    onCloseFunction: Function,
    onConfirmFunction: Function,
    advertisement: Advertisement,
};

export const EditModal = ({ onCloseFunction, onConfirmFunction, advertisement }: EditModalProps) => {

    const handleEditModalContainerClick = (e) => {
        if (e.target == document.getElementById('editModalContainer')) {
            onCloseFunction()
        }
    }

    return (
        <EditModalContainer id="editModalContainer" onClick={handleEditModalContainerClick}>
            <FormWrapper>
                <CloseIcon onClick={() => onCloseFunction()} />
                <Form onConfirmFunction={onConfirmFunction} advertisement={advertisement} />
            </FormWrapper>
        </EditModalContainer>
    )
}