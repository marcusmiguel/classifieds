import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { deleteAd } from "../../../redux/slices/classifiedsSlice";
import { getAdById } from "../../../util";
import { CancelButton, CancelIcon, ConfirmButton, ConfirmIcon, ConfirmMessage, DeleteModalBox, DeleteModalContainer, ModalActions, TrashIcon } from "./style";

export const DeleteModal = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const advertisement = getAdById(id);
    const dispatch = useAppDispatch();

    const handleDeleteModalContainerClick = (e) => {
        if (e.target == document.getElementById('deleteModalContainer')) {
            navigate(-1);
        }
    }

    const handleDeleteModalConfirm = () => {
        if (!advertisement) return;

        dispatch(deleteAd({ id: advertisement.id }));
        navigate(-2);
    };

    return (
        <DeleteModalContainer id="deleteModalContainer" onClick={handleDeleteModalContainerClick}>
            <DeleteModalBox>
                <ConfirmMessage><TrashIcon />Are you sure?</ConfirmMessage>
                <ModalActions>
                    <CancelButton onClick={() => navigate(-1)}><CancelIcon />Cancel</CancelButton>
                    <ConfirmButton onClick={handleDeleteModalConfirm}><ConfirmIcon />Delete</ConfirmButton>
                </ModalActions>
            </DeleteModalBox>
        </DeleteModalContainer>
    )
}