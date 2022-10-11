import { IoNotificationsOutline } from 'react-icons/io5';
import styled from 'styled-components';

export const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    height: 1.5rem;
    position: absolute;
    right: 1.5em;
    top: 1.5em;

    @media (max-width: 1100px) {
        display: none;
    }
`;

export const ShipInfo = styled.div`
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .25rem;
    padding: 0 .5em;
    padding-left: .48em;
    background: white;
`;

export const ShipName = styled.span`
    font-size: .65em;
    margin-left: .5em;
    font-weight: 600;
`;

export const Unread = styled.span`
    position: absolute;
    border-radius: 50%;
    font-size: 0.6rem;
    background: red;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    top: .2em;
    right: .6em;
    width: .5em;
    height: .5em;
`;

export const NotificationButton = styled.div`
    position: relative;
    margin-right: .5em;
    padding: 0 .2em;
    height: 1.3rem;
    cursor: pointer;
`;

export const NotificationIcon = styled(IoNotificationsOutline)`
    font-size: 1.2rem;
`;