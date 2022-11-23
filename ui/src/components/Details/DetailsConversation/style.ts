import { RiSendPlane2Line } from 'react-icons/ri';
import styled from 'styled-components';

export const ConversationWrapper = styled.div`
    height: 20rem;
    width: 24em; 
    position: absolute;
    right: 0;
    top: 27em;
    z-index: 2000;

    @media (max-width: 600px) {
        top: 0;
        position: fixed;
    }
`;

export const Conversation = styled.div`
    border-radius: .25rem;
    width: 24em; 
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    height: 18rem;
    background: white;  
    @media (max-width: 600px) {
        z-index: 200;
        width: 100%; 
        height: 100%;
        right: 0;
        border-radius: 0;
        box-shadow: none;
        position: fixed;
    }
`;

export const ConversationUpperRow = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    height: 15%;
    width: 100%;
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

export const MessageList = styled.div`
    height: 15rem;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    border-top: 1px solid rgba(0, 0, 0, .2);
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

export const SigilContainer = styled.div`
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

export const MessageDate = styled.div`
    font-size: .6rem;
    display: flex;
    justify-content: end;
    color: rgba(0, 0, 0, .5);
    white-space: nowrap;
`;

export const InputRow = styled.div`
    height: 3rem;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 1em; 
`;

export const Input = styled.input`
    width: 100%;
    border: 1px solid rgba(0, 0, 0, .2);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: .25rem;
    padding: .3em 2em .3em 1em;
    font-size: .65rem;
`;

export const SendIcon = styled(RiSendPlane2Line)`
    position: absolute;
    right: 1.5em;
    cursor: pointer;
`;

export const ConversationAdTitle = styled.div`
    font-size: .7rem;
    padding: 0 1em;
    font-weight: 900;
    height: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-align: center;

    @media (max-width: 600px) {
        padding: 0 3.5em;
    }
`;
