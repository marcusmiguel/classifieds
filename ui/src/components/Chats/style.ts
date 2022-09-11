import { RiSendPlane2Line } from 'react-icons/ri';
import styled from 'styled-components';

export const ChatContainer = styled.div`
    padding: 1.5em 1.5em;
    margin-left: 16%;
    // width: 100%;
    // height: 100%;
    background: rgba(253,253,253,1);
`;

export const ChatTitle = styled.div`
    font-weight: 900;
    margin-bottom: 1em;
    font-size: .9rem;
`;

export const ChatSection = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background: rgba(253,253,253,1);
`;

export const ChatList = styled.div`
    width: 17rem;
    height: 100%;
`;

export const ChatCard = styled.div`
    border-radius: .25rem;
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    margin-bottom: 1em;
    cursor: pointer;
    padding: 1em 1em;
    background: white;

    &:hover{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 4px 10px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
`;


export const Conversation = styled.div`
    border-radius: .5em;
    width: 43%; 
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    height: 21rem;
    position: fixed;
    margin-left: 36%;
    background: white;
`;

export const CardUpperRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Date = styled.div`
    font-size: .65rem;
    color: rgba(0, 0, 0, .5);
    text-align: end;
    line-height: 1;
`;

export const MessagePreview = styled.div`
    line-height: 1;
    font-size: .65rem;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 2.4em;
    white-space: nowrap;
    color: rgba(0, 0, 0, .6);
`;

export const CardReceiver = styled.div`
    display: flex;
    align-items: center;
`;

export const CardReceiverShip = styled.div`
    margin-left: .5em;
    font-size: .7rem;
    color:  rgba(0, 0, 0, .7);
    line-height: 1;
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
    right: 2em;
    cursor: pointer;
    font-size:.8rem;
`;

export const CardAdTitle = styled.div`
    font-size: .7rem;
    padding: 0 2.2em;
    margin-bottom: .5em;
    font-weight: 900;
`;

export const ConversationAdTitle = styled.div`
    font-size: .7rem;
    display: flex;
    align-content: start;
    font-weight: 900;
`;

