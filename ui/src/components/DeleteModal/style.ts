import { RiCheckFill, RiCloseFill, RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';

export const DeleteModalContainer = styled.div`
    z-index: 200;
    position: fixed;
    border: 1px solid rgba(0,0,0,.2);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(10px) brightness(0.8);
    display: flex;
    justify-content: center;
    padding-top: 15%;
    overflow-x: hidden;

`;

export const DeleteModalBox = styled.div`   
    z-index: 201;
    background: white;
    filter: none;
    height: 40%;
    padding: 1.5em 1.5em;
    border-radius: .25em;
`;

export const ModalActions = styled.div`
    display: flex;
    align-items: end;
    height: 50%;
`;

export const ConfirmMessage = styled.div`
    height: 50%;
    font-weight: 700;
`;

export const ConfirmButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .6rem;
    font-weight: 700;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    background: #DF5150;
    color: white;
`;

export const CancelButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .6rem;
    font-weight: 700;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    margin-right: 1em;
`;

export const CancelIcon = styled(RiCloseFill)`
    font-size: .9rem;
    margin-right: .3em;
`;

export const ConfirmIcon = styled(RiDeleteBinLine)`
    font-size: .9rem;
    margin-right: .3em;
    color: white;
`;

export const TrashIcon = styled(RiDeleteBinLine)`
    font-size: 1.5rem;
    margin-bottom: .25em;
`;
