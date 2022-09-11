import styled from 'styled-components';
import { RiShareForwardLine, RiDeleteBinLine, RiStarLine, RiStarFill, RiStarSmileFill, RiShareForwardFill } from 'react-icons/ri';

export const CardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-items: space-between;
    border-radius: .25rem;
    border: 1px solid rgba(0,0,0,.2);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: 0.3s;
    height: 7.5em;
    width: 100%;
    padding: .5em .5em;
    background: white;
    cursor: pointer;

    &:hover {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 4px 10px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
`;

export const Image = styled.img`
    height: 6.5em;
    width: 6.5em;
    border-radius: .25rem;
    object-fit: contain;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    // border: 1px solid rgba(0,0,0,.2);
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: space-between;
    padding: 0em .5em 0em 1em;
`;

export const MiddleRow = styled.div`
    display: flex;
    justify-content: end;
    align-items: start;
`;

export const BottomRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: end;
`;

export const ForwardIcon = styled(RiShareForwardFill)`
    display: inline;
    margin: 0 .2em .2em .2em;
`;

export const DeleteIcon = styled(RiDeleteBinLine)``;

export const FavIcon = styled(RiStarFill)`
    display: inline;
    margin: 0 .2em .2em .2em;
    color: orange;
`;

export const SourceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

export const PublisherInfo = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`;

export const Publisher = styled.span`
    display: flex;
    align-items: center;
    font-size: .7rem;
    line-height: 1em;
    font-style: italic;
    margin-left: .3em;
`;

export const Title = styled.div`
    font-weight: 900;
    font-size: .8rem;
    line-height: 1em;
    height: 100%;
    width: 100%;
    text-align: justify;
    word-break: break-all;
    overflow: hidden;
`;

export const Icons = styled.div`
    display: flex;
`;

export const Date = styled.span`
    display: flex;
    align-items: end;
    font-size: .7rem;
    font-style: italic;
    height: 1.3em;
`;

export const PriceLabel = styled.span`
    font-size: .6rem;
    height: 1em;
`;

export const Price = styled.span`
    font-weight: 800;
    font-size: .7rem;
    display: flex;
    align-content: center;
`;
