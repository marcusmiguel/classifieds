import { RiCloseFill } from 'react-icons/ri';
import styled from 'styled-components';

export const EditModalContainer = styled.div`
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
    padding-top: 0%;
    overflow-x: hidden;
`;

export const FormWrapper = styled.div`
    background: rgba(253,253,253,1);
    width: 30%;
    position: relative;
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