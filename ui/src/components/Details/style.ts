import { RiDeleteBinLine, RiShareForwardLine, RiCloseFill, RiSendPlane2Line, RiEditLine, RiPriceTag3Line } from 'react-icons/ri';
import { BiChat } from 'react-icons/bi';
import styled from 'styled-components';
import { MdNavigateNext, MdOutlineArrowBackIosNew } from 'react-icons/md';

export const DetailsBackground = styled.div`
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(253,253,253,1);
    position: fixed;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1em 0;
    top: 0;

    ::-webkit-scrollbar {
        width: 15px;
        height: 15px;
    }
    ::-webkit-scrollbar-track {
        border: 1px solid rgba(0,0,0,.2);
        background: rgba(253,253,253,1);
        border-top-right-radius: .25rem; 
        border-bottom-right-radius: .25rem; 
    }
      ::-webkit-scrollbar-thumb {
        border-radius: .25rem;
        background: white;
        box-shadow: inset 0 0 1px 1px rgba(0,0,0,.6);
    }

`;

export const DetailsContainer = styled.div` 
    width: 80%;
    max-width: 65em;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: .8rem;
    z-index: 100;
    background: rgba(253,253,253,1);
    overflow-y: visible;
    @media (max-width: 600px) {
        width: 80%;
    }   
    
`;

export const UpperRow = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;

    @media (max-width: 600px) {
        font-size: .7rem;
    }
`;

export const Title = styled.div`
    font-size: 1rem;
    font-weight: 900;
    line-height: 1;
    word-break: break-all;
    margin-bottom: .5em;
    margin-top: -.15em;

    @media (max-width: 600px) {
        font-size: .8rem;
        display: none;
    }
`;

export const SmallScreenTitle = styled.div`
    font-size: 1rem;
    font-weight: 900;
    line-height: 1;
    word-break: break-all;
    margin-bottom: .5em;
    margin-top: -.15em;
    @media (min-width: 601px) {
        display: none;
    }
`;

export const Tags = styled.div`
    display: flex;
    width: 100%;
    align-content: space-between;
    flex-wrap: wrap;
    padding-bottom: .5em;
`;

export const Tag = styled.span`
    background:  white;
    border-radius: .25rem;
    font-size: .65rem;
    display: flex;
    justify-content: center;
    margin-right: 1em;
    cursor: pointer;

    &.active{
        background: rgba(0,0,0,.2);
    }
`;

export const CloseIcon = styled(RiCloseFill)`
    font-size: 1.5em;
    position: absolute;
    right: 0;
    cursor: pointer;
    &:hover{
        color: rgba(0,0,0,.5);
    }
`;

export const FirstSection = styled.div`
    display: flex;
    border-radius: .25rem;
    padding: 2em 0 2em 0;
    position: relative;
    width: 100%;
    @media (max-width: 600px) {
        flex-direction: column;
        padding: 1em 0 1em 0;
    }
`;

export const DescTitle = styled.span`
    font-weight: 800;
    margin-bottom: .5em;
    font-size: .9rem;
    @media (max-width: 600px) {
        font-size: .8rem;
    }
`;

export const Desc = styled.span`
    line-height: 1.2;
    word-wrap: break-word; 
    white-space: normal;
    text-align: justify;
    font-size: .7rem;
    overflow-y: auto;
    padding-right: .5em;

    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-track {
        border: 1px solid rgba(0,0,0,.2);
        background: rgba(253,253,253,1);
        border-radius: .25rem; 
    }
    ::-webkit-scrollbar-thumb {
        border-radius: .25rem;
        background: white;
        box-shadow: inset 0 0 1px 1px rgba(0,0,0,.6);
    }

    @media (max-width: 600px) {
        padding: 1em 0 0 0;
        overflow: hidden;
    }
`;

export const SourceContainer = styled.div`
    display: flex;
    align-content: center;
    margin-bottom: 1em;

    @media (max-width: 600px) {
        display: none;
    }
`;

export const SmallScreenSourceContainer = styled.div`
    display: flex;
    align-content: center;
    margin-bottom: 1em;
    @media (min-width: 601px) {
        display: none;
    }
`;

export const PublisherInfo = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    margin-right: 1em;
`;

export const Publisher = styled.span`
    display: flex;
    align-items: center;
    font-size: .7rem;
    line-height: 1em;
    font-style: italic;
    margin-left: .3em;
`;

export const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: .5em;
    margin-bottom: -.4em;
    margin-top: auto;
    @media (max-width: 600px) {
        margin-bottom: 0;
    }
`;

export const PriceLabel = styled.span`
    font-size: .8rem;
    display: flex;
    align-items: center;
    margin-bottom: -.4em;
`;

export const Price = styled.span`
    font-weight: 800;
    font-size: .9rem;
    display: flex;
    align-content: end;
`;

export const PriceIcon = styled(RiPriceTag3Line)`
   margin-right: .3em;
   margin-top: -.12em;
`;

export const InfoColumn = styled.div`
    display: flex;  
    flex-direction: column;
    width: 50%;
    height: 30em;    
    padding-left: 2em;
    @media (max-width: 600px) {
        width: 100%;
        padding: 1em 0;
        height: auto;
    }
`;

export const InfoBox = styled.div`
    display: flex;  
    flex-direction: column;
    width: 100%;
    min-height: 20em;
    max-height: 20em;

    @media (max-width: 600px) {
        flex-direction: column-reverse;
        min-height:initial;
        max-height:initial;
    }
    // box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    // background: white;
    // border: 1px solid rgba(0,0,0,.2);
    // padding: 1em;
    // border-radius: .25rem;

`;

export const Date = styled.div`
    font-style: italic;
    font-size: .7rem;
`;

export const Actions = styled.div`

    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    margin-top: 1.42em;
    @media (max-width: 600px) {
        width: 100%;
        justify-content: center;
    }
`;

export const ForwardButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .64rem;
    font-weight: 700;
    background: white;
    color: black;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    margin-right: 1em;
    z-index: 110;
`;

export const DeleteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .64rem;
    font-weight: 700;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    z-index: 110;
    background: #DF5150;
    color: white;

`;

export const EditButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .64rem;
    font-weight: 700;
    background: white;
    color: black;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    margin-right: 1em;
    z-index: 110;

`;

export const ChatButton = styled.button`
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
    z-index: 110;

`;

export const ForwardIcon = styled(RiShareForwardLine)`
    font-size: .9rem;
    margin-right: .3em;

`;

export const DeleteIcon = styled(RiDeleteBinLine)`
    margin-right: .3em;
    font-size: .9rem;
`;

export const EditIcon = styled(RiEditLine)`
    margin-right: .3em;
    font-size: .9rem;
`;

export const ChatIcon = styled(BiChat)`
    font-size: .9rem;
    margin-right: .3em;
`;

export const GoBackIcon = styled(MdOutlineArrowBackIosNew)`
    visibility: hidden;
    @media (max-width: 600px) {
        visibility: visible;
    };
    z-index: 200;
    left: .5em;
    top: 7.5%;
    transform: translateY(-50%);
    position: absolute;
`;


export const NavigatedIcon = styled(MdNavigateNext)`

`;