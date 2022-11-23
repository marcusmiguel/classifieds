import { RiArrowDropDownLine, RiSearchLine } from 'react-icons/ri';
import styled from 'styled-components';

export const ListContainer = styled.div`
    padding: 1.5em 1.5em;
    height: 100%;
    width: 84%;
    margin-left: 16%;
    background: rgba(253,253,253,1);

    @media (max-width: 1150px) {
        margin: 3em 0 0 0;
        padding: 1.5em 1em;
        width: 100%;
    }
`;

export const ListGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
    margin-bottom: 1.5em;
    @media (max-width: 900px) {
        grid-template-columns: repeat(1 , 1fr);
    }
`;

export const Title = styled.div`
    display: flex;
    font-weight: 600;
    align-items: start;
    margin-right: .9em;
    font-size: 1rem;
    margin-bottom: .9rem;
    height: 1.5rem;
`;

export const EmptyListMessage = styled.div`
  font-size: .8rem;
`;

export const FilterRowContainer = styled.div`
    display: flex;
    width: 45%;
    @media (min-width: 601px) and (max-width: 1150px) {
        width: 70%;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;


export const Tags = styled.div`
    padding-top: .5em;
    display: flex;
    width: 100%;
    align-content: space-between;
    flex-wrap: wrap;
    margin-top: .3rem;
    margin-bottom: 1em;
`;

export const Tag = styled.span`
    background:  white;
    border-radius: .25rem;
    font-size: .65rem;
    padding: .2em .5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0,0,0,.2);
    margin-right: 1em;
    cursor: pointer;
    height: 1.5rem;
    background: white;

    &.active{
        background: rgba(0,0,0,.2);
        border: 1px solid rgba(0,0,0,.2);
    }
`;
