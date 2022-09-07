import { MdDone } from 'react-icons/md';
import { RiCloseFill, RiSearchLine, RiSendPlane2Line } from 'react-icons/ri';
import styled from 'styled-components';

export const ForwardModalContainer = styled.div` 
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
    align-items: center;
    overflow-x: hidden;
`;

export const ForwardModalBox = styled.div`   
    z-index: 201;
    filter: none;
    width: 30%;
    height: 25em;
    border-radius: .25rem;
    background: white;
`;

export const SearchContainer = styled.div`
    position: relative;
    height: 1.5rem;
    width: 100%;
    margin: .75em 0;
    padding: 0 1.82em 0 1.82em;
`;

export const SearchBar = styled.input`
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .25rem;
    padding: 0 2.5em;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: .65rem;
`;

export const SearchIcon = styled(RiSearchLine)`
    font-size: .8em;
    position: absolute;
    top: .65em;
    left: 3.2em;  
`;

export const UpperRow = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,.2);
`;

export const Title = styled.span`
    font-size: .8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    padding: .5em 1.82em;
`;

export const CloseIcon = styled(RiCloseFill)`
    font-size: 1rem;
    cursor: pointer;
    margin-right: 1.3em;
`;

export const MutualsList = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 18em;
    border-top: 1px solid rgba(0,0,0,.2);
    border-bottom:  1px solid rgba(0,0,0,.2);
`;

export const MutualRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: .5em 1em .5em 1.82em;
    &:hover{
        background: rgba(0,0,0,.2);
    }
`;

export const MutualInfo = styled.div`
    display: flex;
    align-items: center;
    font-size: .65rem;
`;

export const SendButton = styled.button`    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .5rem;
    font-weight: 700;
    background: white;
    color: black;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

export const SendIcon = styled(RiSendPlane2Line)`
    margin-right: .5em;
`;

export const SentButton = styled.button`    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .5rem;
    font-weight: 700;
    background: white;
    color: black;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
`;


export const SentIcon = styled(MdDone)`
    margin-right: .5em;
`;

export const Ship = styled.span`
    margin-left: .5em;
`;

export const NoResults = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: .8rem;
    word-break: break-all; 
    word-wrap: break-word; 
    padding: 0 1em;
`;