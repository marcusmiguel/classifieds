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
    font-weight: 900;
    align-items: start;
    margin-right: .9em;
    font-size: .9rem;
    margin-bottom: .9rem;
    height: 1.5rem;
`;


export const FilterUpperRow = styled.div`
    display: flex;
    width: 45%;
    @media (min-width: 601px) and (max-width: 1150px) {
        width: 70%;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;

export const SearchContainer = styled.div`
    position: relative;
    height: 1.5rem;
    width: 100%;
    max-width: 18em;
    margin-right: 1rem;
    margin-bottom: 1em;
 
`;

export const SearchBar = styled.input`
    border: 1px solid rgba(0,0,0,.2);
    padding: 0 2.5em;
    border-radius: .25rem;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;    
    font-size: .65rem;
    background: white;

`;


export const SearchIcon = styled(RiSearchLine)`
    position: absolute;
    left: .75em;
    top: .55em;
    font-size: .7em;
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

export const Dropdown = styled.div`
    width: 6em;
    height: 1.5em;
    border: 1px solid rgba(0,0,0,.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: .25rem;
    position: relative;
    background: white;

    @media (max-width: 600px) {
        width: 5em;
    }
`;

export const DropdownText = styled.div`
    padding: 0 1em;
    width: 4.7em;
    font-size: .65rem;
`;

export const DropdownIcon = styled(RiArrowDropDownLine)`
    font-size: 1.3rem;
    cursor: pointer;
`;

export const DropdownModal = styled.div`
    position: absolute;
    width: 6em;
    top: 1.7em;
    left: -.03em;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .25rem;
    display: flex;
    flex-direction: column;
    background: white;

    @media (max-width: 600px) {
        width: 5em;
        left: -.6em;
        }
`;

export const DropdownOption = styled.div`
  font-size: .65rem;
  padding: .5em 1em;
  &:hover{
    background:  rgba(0,0,0,.2);
  }
  &:first-child{
    border-top-left-radius: .25em;
    border-top-right-radius: .25em;
  }
  &:last-child{
    border-bottom-left-radius: .25em;
    border-bottom-right-radius: .25em;
  }
`;

export const EmptyListMessage = styled.div`
  font-size: .8rem;
`;