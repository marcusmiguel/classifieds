import { RiCloseFill } from 'react-icons/ri';
import styled from 'styled-components';

export const EditModalContainer = styled.div`
    z-index: 200;
    position: fixed;
    border: 1px solid rgba(0,0,0,.2);
    min-height: 100%;
    height: 100%;
    overflow-y: auto;
    width: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(10px) brightness(0.8);
    display: flex;
    justify-content: center;

    ::-webkit-scrollbar {
        width: 15px;
        height: 15px;
    }
    ::-webkit-scrollbar-track {
        border: 1px solid rgba(0,0,0,.2);
        background: rgba(253,253,253,1);
        border-top-right-radius: .25rem; 
        border-bottom-right-radius: .25rem; 
    }
    ::-webkit-scrollbar-thumb {
        border-radius: .25rem;
        background: white;
        box-shadow: inset 0 0 1px 1px rgba(0,0,0,.6);
    }
`;

export const FormWrapper = styled.div`
    background: rgba(253,253,253,1);
    width: 30%;
    min-height: 100%;
    position: relative;
    position: fixed;

    @media (max-width: 1150px) {
        width: 50%;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;

export const CloseIcon = styled(RiCloseFill)`
    font-size: 1.5em;
    position: absolute;
    right: .3em;
    top: .3em;
    cursor: pointer;
    
    &:hover{
        color: rgba(0,0,0,.5);
    }
`;