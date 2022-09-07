import { BiChat } from 'react-icons/bi';
import { IoAddCircleOutline, IoNotificationsOutline, IoPeopleOutline, IoPersonOutline } from 'react-icons/io5';
import { RiStarLine } from 'react-icons/ri';
import styled from 'styled-components';

export const SidebarContainer = styled.div`
    position: fixed;
    height: 100%;
    width: 16%;
    border-right: 1px solid rgba(0,0,0,.2);
    padding: 1.5em 0;
    background: rgba(253,253,253,1);
`;

export const Title = styled.span`
    display: flex;
    justify-content: center;
    font-weight: 900;
    font-size: .9rem;
`;

export const TheiAdsIcon = styled(IoPeopleOutline)`
    margin-right: .5em;
`;

export const MyAdsIcon = styled(IoPersonOutline)`
    margin-right: .5em;
`;

export const FavoritesIcon = styled(RiStarLine)`
    margin-right: .5em;
`;

export const PublishAdIcon = styled(IoAddCircleOutline)`
    margin-right: .5em;
`;

export const ChatIcon = styled(BiChat)`
    margin-right: .5em;
`;

export const Tabs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    align-content: start;
    font-size: 1rem;
    position: relative;

`;

export const Tab = styled.a`
    width: 100%;
    height: 1.5rem;
    display: flex;
    margin-bottom: 1em;
    align-items: center;
    justify-items: start;
    padding-left: 1em;
    cursor: pointer;
    font-size: .75rem;
    border-left: 8px solid white;

    &.active {
        font-weight: 900;
        border-left: 8px solid black;
    }

    &:hover:not(.active){
        border-left: 8px solid rgba(0,0,0,.1);

    }

`;


