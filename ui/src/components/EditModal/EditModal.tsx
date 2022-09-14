import React from "react";
import { Advertisement } from "../../types";
import { Form } from "../Form/Form";
import { CloseIcon, EditModalContainer, FormWrapper } from "./style";

interface EditModalProps {
    onConfirmFunction: Function,
    onCloseFunction: Function,
    advertisement: Advertisement,
};

export const EditModal = ({ onConfirmFunction, onCloseFunction, advertisement }: EditModalProps) => {

    const handleEditModalContainerClick = (e) => {
        if (e.target == document.getElementById('editModalContainer')) {
            onCloseFunction()
        }
    }

    return (
        <EditModalContainer id="editModalContainer" onClick={handleEditModalContainerClick}>
            <FormWrapper>
                <CloseIcon onClick={() => onCloseFunction()} />
                <Form onCloseFunction={onCloseFunction} advertisement={advertisement} />
            </FormWrapper>
        </EditModalContainer>
    )

}