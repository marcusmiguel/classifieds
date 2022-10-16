import { RiArrowDropDownLine } from "react-icons/ri";
import styled from "styled-components";

export const DropdownContainer = styled.div`
    width: 7rem;
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
    width: 5rem;
    top: 1.7em;
    left: -.04em;
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
