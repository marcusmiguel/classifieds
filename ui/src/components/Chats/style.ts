import styled from 'styled-components';

export const ChatContainer = styled.div`
    padding: 1.5em 1.5em;
    margin-left: 16%;
    width: 84%;
    background: rgba(253,253,253,1);

    @media (max-width: 1150px) {
        margin: 3em 0 0 0;
        padding: 1.5em 3%;
        width: 100%;
    };
`;

export const ChatTitle = styled.div`
    font-weight: 600;
    margin-bottom: 1em;
    font-size: 1rem;
`;

export const ChatSection = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background: rgba(253,253,253,1);
`;

export const ChatList = styled.div`
    width: 40%;
    height: 100%;

    @media (max-width: 1050px) {
        width: 43%;
    }
    @media (max-width: 750px) {
        width: 100%;
    }
`;

interface ChatCardProps {
    isActive: boolean,
}

export const ChatCard = styled.div<ChatCardProps>`
    border-radius: .25rem;
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    margin-bottom: 1em;
    cursor: pointer;
    padding: 1em;
    background: white;
    position: relative;
    border: ${p => p.isActive ? '1px solid rgba(0, 0, 0, 1)' : 'none'};

    &:hover{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 4px 10px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }

`;

export const CardUpperRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CardDate = styled.div`
    font-size: .65rem;
    color: rgba(0, 0, 0, .5);
    text-align: end;
    line-height: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const MessagePreview = styled.div`
    line-height: 1;
    font-size: .65rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: rgba(0, 0, 0, .6);
`;

export const CardReceiver = styled.div`
    display: flex;
    align-items: center;
`;

export const CardSigil = styled.span`
    margin-top: -.02em;
`;

export const CardReceiverShip = styled.div`
    font-size: .7rem;
    color:  rgba(0, 0, 0, .7);
    line-height: 1;
    padding: 0 1rem 0 .2em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const CardAdTitle = styled.div`
    font-size: .75rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom:.3em;
`;

export const EmptyListMessage = styled.div`
    font-size: .8rem;
`;

