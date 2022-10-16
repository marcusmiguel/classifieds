import { RiStarFill, RiStarLine } from 'react-icons/ri';
import styled from 'styled-components';

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

export const FavIconClicked = styled(RiStarFill)`
    font-size: .9rem;
    margin-right: .3em;
    color: orange;
`;

export const FavIcon = styled(RiStarLine)`
     font-size: .9rem;
    margin-right: .3em;
`;