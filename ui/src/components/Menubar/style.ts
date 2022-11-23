import { BiChat } from 'react-icons/bi';
import { IoAddCircleOutline, IoNotificationsOutline, IoPeopleOutline, IoPersonOutline } from 'react-icons/io5';
import { RiStarLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const MenubarContainer = styled.div`
    position: fixed;
    height: 100%;
    width: 16%;
    border-right: 1px solid rgba(0,0,0,.2);
    padding: 1.5em 0;
    background: rgba(253,253,253,1);

    @media (max-width: 1150px) {
        width: 100%;
        height: auto;
        border-bottom: 1px solid rgba(0,0,0,.2);
        border-right: none;
        display: flex;
        flex-direction: column;
        z-index: 100;
        justify-content: start;
        padding: .5em 1em 0 1em;
        top: 0;
    }
`;

export const Title = styled.span`
    display: flex;
    justify-content: center;
    font-weight: 900;
    font-size: 1rem;
`;

export const TheiAdsIcon = styled(IoPeopleOutline)`
    margin-right: .5em;

    @media (max-width: 600px) {
        margin-right: 0;
    }

`;

export const MyAdsIcon = styled(IoPersonOutline)`
    margin-right: .5em;

    @media (max-width: 600px) {
        margin-right: 0;
    }
`;

export const FavoritesIcon = styled(RiStarLine)`
    margin-right: .5em;

    @media (max-width: 600px) {
        margin-right: 0;
    }
`;

export const PublishAdIcon = styled(IoAddCircleOutline)`
    margin-right: .5em;
    
    @media (max-width: 600px) {
        margin-right: 0;
    }
`;

export const ChatIcon = styled(BiChat)`
    margin-right: .5em;

    @media (max-width: 600px) {
        margin-right: 0;
    }
`;

export const Tabs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    align-content: start;
    font-size: 1rem;
    position: relative;

    @media (max-width: 1150px) {
        flex-direction: row;
        background: rgba(253,253,253,1);
        justify-content: center;
        justify-items: center;
        margin-top: .5em;
    }

`;

export const Tab = styled(NavLink)`
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

    @media (max-width: 1150px) {
        border-bottom: 4px solid white;
        margin-bottom: 0;
        justify-content: center;
        padding-left: 0;
        border-left: none !important;

        &.active {
            font-weight: 900;
            border-bottom: 4px solid black;
        }
    
        &:hover:not(.active){
            border-bottom: 4px solid rgba(0,0,0,.1);
        }
    }

    
`;

export const TabText = styled.span`
    font-size: .8rem;
    @media (max-width: 600px) {
        display: none;
    }
`;
