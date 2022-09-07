import styled from 'styled-components';

export const PaginationList = styled.ul`
    display: flex;
    justify-items: space-between;
    background: white;
`;

export const PaginationListItem = styled.li`
   
    border: 1px solid rgba(0,0,0,.2);
    &:first-child{
        border-top-left-radius: .25rem;
        border-bottom-left-radius: .25rem;
    }
    &:last-child{
        border-top-right-radius: .25rem;
        border-bottom-right-radius: .25rem;
    }
    display: flex;
    justify-content: center;
    width: 100%;
    height: 1.5rem;

    font-weight: 500;
    font-size: .7rem;
    align-items: center;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 

    &:hover{
        cursor: pointer;
        background:  rgba(236,243,243,.5);
    }

`;

export const ActiveListItem = styled.li`
    align-items: center;
    
    display: flex;
    justify-content: center;
    width: 100%;
    font-weight: 700;
    font-size: .7em;

    background:rgba(236,243,243,1);
    border: 1px solid rgba(0,0,0,.2);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 

    &:first-child{
        border-top-left-radius: .25rem;
        border-bottom-left-radius: .25rem;
    }
    &:last-child{
        border-top-right-radius: .25rem;
        border-bottom-right-radius: .25rem;
    }
`;
