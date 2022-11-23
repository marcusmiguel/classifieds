import { RiSearchLine, RiArrowDropDownLine } from "react-icons/ri";
import styled from "styled-components";


export const SearchContainer = styled.div`
    position: relative;
    height: 1.5rem;
    width: 100%;
    max-width: 18em;
    margin-right: 1rem;
    margin-bottom: 1em;
 
`;

export const SearchInput = styled.input`
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
