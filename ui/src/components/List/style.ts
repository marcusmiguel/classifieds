import { IoNotificationsOutline, IoPeopleOutline, IoPersonOutline } from 'react-icons/io5';
import { MdNavigateNext } from 'react-icons/md';
import { RiArrowDropDownLine, RiSearchLine } from 'react-icons/ri';
import styled from 'styled-components';

export const ListContainer = styled.div`
    padding: 1.5em 1.5em;
    height: 100%;
    width: 100%;
    margin-left: 16%;
    background: rgba(253,253,253,1);
`;

export const ListGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
    margin-bottom: 1.5em;
`;

export const UpperRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
`;

export const Title = styled.div`
    display: flex;
    font-weight: 900;
    align-items: center;
    margin-right: .9em;
    font-size: .9rem;
    margin-bottom: 1rem;
    height: 1.5rem;
`;

export const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    height: 1.5rem;

`;

export const UserInfo = styled.div`
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

export const FilterUpperRow = styled.div`
    display: flex;
`;

export const SearchContainer = styled.div`
    position: relative;
    height: 1.5rem;
    width: 30%;
    margin-right: 1rem;
`

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
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .25rem;
    display: flex;
    flex-direction: column;
    background: white;
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
