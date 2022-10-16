import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { RiSendPlane2Line } from 'react-icons/ri';
import styled from 'styled-components';

export const Conversation = styled.div`
    border-radius: .5em;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    position: fixed;
    right: 1.5em;
    background: white;
    width: 40%; 
    max-width: 35em;
    height: 23em;

    @media (max-width: 1150px) {
        width: 50%; 
        right: 1em;
    }

    @media (max-width: 750px) {
        z-index: 200;
        width: 100%; 
        height: 100%;
        right: 0;
        top: 0;
        border-radius: 0;
        box-shadow: none;
        position: fixed;
    }
`;

export const GoBackIcon = styled(MdOutlineArrowBackIosNew)`
    visibility: hidden;
    @media (max-width: 750px) {
        visibility: visible;
    };
    z-index: 200;
    left: .5em;
    top: 7.5%;
    transform: translateY(-50%);
    position: absolute;
`;

export const ConversationUpperRow = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    height: 15%;
`;

export const ConversationBottomRow = styled.div`
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ConversationReceiver = styled.div`
    display: flex;
    align-items: center;
    height: 1rem;
    font-size: .7rem;
`;

export const ConversationReceiverShip = styled.div`
    margin-left: .5em;
`;

export const ConversationAdTitle = styled.div`
    font-size: .75rem;
    font-weight: 900;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    padding: 0 1em;
    text-align: center;

    @media (max-width: 750px) {
        padding: 0 3.5em;
    }
`;

export const MessageList = styled.div`
    height: 15rem;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    border-top: 1px solid rgba(0, 0, 0, .1);
    padding: 1em .75em;
    height: 70%;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
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

export const SentMessage = styled.div`
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: .25rem;
    max-width: 60%;
    align-self: end;
    padding: .5em 1em;
    margin-bottom: .5rem;
    background: rgba(0, 0, 0, .015);
    line-height: 1;

    &:last-child{
        margin-bottom: 0em;
    }
`;

export const MessageDate = styled.div`
    font-size: .6rem;
    display: flex;
    justify-content: end;
    color: rgba(0, 0, 0, .5);
    white-space: nowrap;
`;

export const SigilContainer = styled.div`
    margin-right: .3em;
    padding-top: .3em;
`;

export const ReceivedMessage = styled.div`
    align-self: start;
    margin-bottom: .5rem;
    display: flex;
    max-width: 60%;
    line-height: 1;

    &:last-child{
        margin-bottom: 0;
    }
`;

export const ReceivedMessageBox = styled.div`
    display: flex;
    flex-direction: column;
    font-size: .7rem;
    margin-bottom: .3em;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: .25rem;
    background: rgba(0, 0, 0, .015);
    padding: .5em 1em;
`;

export const MessageShip = styled.div`  
    margin-left: .3rem;
`;

export const MessageText = styled.div`
    display: flex;
    font-size: .65rem;
    line-height: 1;
    margin-bottom: .3em;
    word-break: break-all;
`;

export const InputRow = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 1em; 
`;

export const Input = styled.input`
    width: 100%;
    height: 50%;
    max-height: 2.5rem;
    border: 1px solid rgba(0, 0, 0, .2);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: .25rem;
    padding: .3em 2em .3em 1em;
    font-size: .65rem;
`;

export const SendIcon = styled(RiSendPlane2Line)`
    position: absolute;
    right: 2em;
    cursor: pointer;
    font-size:.8rem;
`;

