import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import styled from 'styled-components';

export const Images = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 30em; 
    @media (max-width: 600px) {
        width: 100%;
        height: 15em;
    }
`;

export const ImageWrapper = styled.div`
    min-width: 100%;
    max-width: 100%;
    position: relative;
    -webkit-user-select: none;
    -ms-user-select: none; 
    user-select: none; 
`;

interface ArrowProps {
    $toShow: boolean,
    $disabled: boolean,
}

export const RightArrow = styled(MdOutlineArrowRight) <ArrowProps>`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%); 
    font-size: 2.5rem;
    cursor: ${p => p.$disabled ? 'default' : 'pointer'};
    color: ${p => p.$disabled ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,.8)'};
    background:  rgba(236,243,243,.5);
    border-radius: .25rem;
    visibility: ${p => p.$toShow ? 'visible' : 'hidden'};

    @media (max-width: 600px) {
        visibility: visible;
        font-size: 2rem;
    }
`;

export const LeftArrow = styled(MdOutlineArrowLeft) <ArrowProps>`
    position: absolute;
    left: 0;
    top: 50%;
    font-size: 2.5rem;
    transform: translateY(-50%); 
    cursor: ${p => p.$disabled ? 'default' : 'pointer'};
    color: ${p => p.$disabled ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,.8)'};
    background:  rgba(236,243,243,.5);
    visibility: ${p => p.$toShow ? 'visible' : 'hidden'};
    border-radius: .25rem;

    @media (max-width: 600px) {
        visibility: visible;
        font-size: 2rem;
    }
`;

export const Image = styled.img`
    border-radius: .25rem;
    object-fit: contain;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    border: 1px solid rgba(0,0,0,.2);
    min-height: 20em;
    max-height: 20em;
    width: 100%;
    -webkit-user-select: none;
    -ms-user-select: none; 
    user-select: none; 
    @media (max-width: 600px) {
        min-height: 15em;
        max-height: 15em;
    }
`;

export const SecondaryImages = styled.div`
    display: flex;
    z-index: 110;
    width: 100%;
    height: 15em;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    scroll-behavior: smooth;    
    border-radius: .25rem;
    padding: 0 .1em;

    @media (max-width: 600px) {
        display: none;
    };

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
`;

interface SecondaryImagesProps {
    isSelected: boolean,
}

export const SecondaryImage = styled.img<SecondaryImagesProps>`
    border-radius: .25rem;
    object-fit: contain;
    cursor: pointer;
    &:hover {
        border-style: double;
        border-color: black;
        border-width: medium;
    }
    border-style: ${p => p.isSelected ? 'double' : 'none;'};
    border-color: ${p => p.isSelected ? 'black' : 'none;'};
    border-width: ${p => p.isSelected ? 'thick' : 'none;'};

    background: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    margin-right: 1em;
    &:last-child{
        margin-right: 0;
    }
    max-width: 7em;
    min-width: 7em;
    max-height: 7em;
    min-height: 7em;

    @media (max-width: 600px) {
        margin-right: .8em;
        margin-bottom: 0;
    }
`;

