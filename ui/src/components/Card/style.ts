import styled from 'styled-components';
import { RiDeleteBinLine, RiStarFill, RiShareForwardFill, RiPriceTag3Line } from 'react-icons/ri';

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

    @media (max-width: 600px) {
        font-size: .7rem;
    }

    overflow: hidden;
`;

export const Image = styled.img`
    min-height: 6.5em;
    min-width: 6.5em;
    max-height: 6.5em;
    max-width: 6.5em;
    border-radius: .25rem;
    object-fit: contain;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: space-between;
    padding: 0em 0em 0em .5em;
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
    @media (max-width: 400px) {
        display: none;
    }
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
    @media (max-width: 480px) {
        padding-bottom: .2em;
    }
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

    @media (max-width: 600px) {
        font-weight: 600;
        font-size: .7rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 2.15rem;
    }
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
    font-size: .7rem;
    display: flex;
    align-items: center;
    vertical-align: middle;
    margin-bottom: -.4em;
`;

export const PriceIcon = styled(RiPriceTag3Line)`
   margin-right: .3em;
   margin-top: -.12em;
`;

export const Price = styled.span`
    font-weight: 800;
    font-size: .8rem;
    display: flex;
    align-content: center;
    word-break: break-all;

    @media (max-width: 600px) {
        font-size: .65rem;
        font-weight: 600;
    }
`;
