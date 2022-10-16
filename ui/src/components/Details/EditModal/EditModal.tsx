import React from "react";
import { useNavigate, } from "react-router-dom";
import { Form } from "../../Form/Form";
import { CloseIcon, EditModalContainer, FormWrapper } from "./style";

export const EditModal = () => {

    const navigate = useNavigate();

    const handleEditModalContainerClick = (e) => {
        if (e.target == document.getElementById('editModalContainer')) {
            navigate(-1);
        }
    };

    return (
        <EditModalContainer id="editModalContainer" onClick={handleEditModalContainerClick}>
            <FormWrapper>
                <CloseIcon onClick={() => navigate(-1)} />
                <Form />
            </FormWrapper>
        </EditModalContainer>
    )
}