import styled from 'styled-components';

export const NotificationsBackground = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100vw;
    height: 100%;
    background: transparent;
`;

export const NotificationsContainer = styled.div`
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .25rem;
    width: 12em;
    min-height: 8.3em;
    max-height: 20em;
    top: 3.5em;
    right: 1.5em;
    background: white;
    z-index: 100;
    position: absolute;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    cursor: default;
`;

export const Title = styled.div`
    padding: .5em 1em;
    border-bottom: 1px solid rgba(0,0,0,.2);
    font-weight: 700;
    font-size: .8rem;
`;

export const NotificationsList = styled.div`
    overflow-y: auto;
    max-height: 18em;
`;

export const NotificationCard = styled.div`
    display: flex;
    padding: .5em 1em;
    font-size: .8rem;
    &:hover{
        background:  rgba(0,0,0,.1);
    }
    cursor: pointer;
`;

export const EmptyListMessage = styled.div`
    font-size: .7rem;
    width: 100%;
    padding: 1.5em;
`;

export const NotificationSigil = styled.div`
    margin-right: .5em;
`;

export const NotificationColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const NotificationAuthor = styled.span`
    font-size: .65rem;
    font-weight: 700;
    margin-right: .5em;
    display: inline;
`;

export const NotificationDate = styled.span`
    font-size: .65rem;
    color: rgba(0,0,0,.5);
`;

export const NotificationText = styled.span`
    font-size: .65rem;
    display: inline;
    line-height: 1;
`;

