import { RiDeleteBinLine, RiShareForwardLine, RiStarLine, RiCloseFill, RiSendPlane2Fill, RiSendPlane2Line, RiStarFill } from 'react-icons/ri';
import { BiChat } from 'react-icons/bi';
import styled, { keyframes } from 'styled-components';
import { MdNavigateNext } from 'react-icons/md';

export const DetailsContainer = styled.div` 
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: fixed;
    overflow: hidden;
    font-size: .8rem;
    padding: 2em 8em;
    z-index: 100;
    background: rgba(253,253,253,1);
`;

export const UpperRow = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
`;

export const Title = styled.span`
    font-size: .8rem;
    font-weight: 900;
    line-height: 1;
    max-height: 25%;
    word-break: break-all;
`;

export const Tags = styled.div`
    display: flex;
    width: 100%;
    align-content: space-between;
    flex-wrap: wrap;
    padding-bottom: .5em;
`;

export const Tag = styled.span`
    background:  white;
    border-radius: .25rem;
    font-size: .65rem;
    display: flex;
    justify-content: center;
    margin-right: 1em;
    cursor: pointer;

    &.active{
        background: rgba(0,0,0,.2);
    }

`;

export const CloseIcon = styled(RiCloseFill)`
    font-size: 1.5em;
    position: absolute;
    right: 0;
    cursor: pointer;
    &:hover{
        color: rgba(0,0,0,.5);
    }
`;

export const FirstSection = styled.div`
    display: flex;
    border-radius: .25rem;
    padding-top: 1.5em;
    position: relative;
`;

export const Desc = styled.span`
    line-height: 1;
    height: 100%;
    overflow: hidden;
    word-break: break-all; 
    word-wrap: break-word; 
    white-space: normal;
    padding: 1em 0;
`;

export const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20%;
`;

export const SourceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

export const PublisherInfo = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const Publisher = styled.span`
    display: flex;
    align-items: center;
    font-size: .65rem;
    line-height: 1em;
    font-style: italic;
    margin-left: .3em;
`;

export const PriceLabel = styled.span`
    font-size: .7rem;
    height: 1em;
`;

export const Price = styled.span`
    font-weight: 800;
    font-size: .8rem;
    display: flex;
    align-content: center;
`;

export const ImageColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const Image = styled.img`
    height: 18em;
    width: 100%;
    border-radius: .25rem;
    object-fit: contain;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    background: white;
    border: 1px solid rgba(0,0,0,.2);
`;

export const SecondaryImageColumn = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-top: 1.5em;
    width: 100%;
    height: 12em;
    z-index: 110;
`;

export const SecondaryImage = styled.img`
    width: 7em;
    height: 7em;
    border-radius: .25rem;
    cursor: pointer;
    object-fit: contain;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    &:hover{
        outline-style: double;
        outline-color: black;
        outline-width: thick;
     }
     background: white;
     border: 1px solid rgba(0,0,0,.2);

`;

export const InfoColumn = styled.div`
    display: flex;  
    flex-direction: column;
    width: 50%;
    padding-left: 2em;
    
`;

export const InfoBox = styled.div`
    display: flex;  
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    padding: 1em 1.5em;
    border-radius: .25rem;
    max-height: 12rem;
    min-height: 12rem;
    background: white;
    border: 1px solid rgba(0,0,0,.2);

`;

export const Date = styled.div`
    font-style: italic;
    font-size: .7rem;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: start;
    align-items: end;
    height: 2.4rem;
`;

export const ForwardButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .64rem;
    font-weight: 700;
    background: white;
    color: black;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    margin-right: 1em;
    z-index: 110;

`;

interface FavProps {
    isFavorited: boolean,
}

export const FavButton = styled.button<FavProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .64rem;
    font-weight: 700;
    background: white;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    margin-right: 1em;
    z-index: 110;
    color: ${p => p.isFavorited ? 'orange' : 'black'};
`;

export const DeleteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .64rem;
    font-weight: 700;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    z-index: 110;
    background: #DF5150;
    color: white;
`;

export const ChatButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .64rem;
    font-weight: 700;
    background: white;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    z-index: 110;
`;

export const ForwardIcon = styled(RiShareForwardLine)`
    font-size: .9rem;
    margin-right: .3em;

`;

export const DeleteIcon = styled(RiDeleteBinLine)`
    margin-right: .3em;
    font-size: .9rem;
`;

export const FavIcon = styled(RiStarLine)`
     font-size: .9rem;
    margin-right: .3em;
`;


export const FavIconClicked = styled(RiStarFill)`
    font-size: .9rem;
    margin-right: .3em;
    color: orange;
`;

export const ChatIcon = styled(BiChat)`
    font-size: .9rem;
    margin-right: .3em;
`;

export const Conversation = styled.div`
    border-radius: .25rem;
    width: 100%; 
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    margin-top: 1.5em;
    height: 18rem;
    background: white;  
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
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    border-top: 1px solid rgba(0, 0, 0, .2);
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
    display: flex;
    padding: 0 2.6em;
    font-weight: 900;
    height: 1rem;
`;



export const NavigatedIcon = styled(MdNavigateNext)`

`;