import styled from 'styled-components';
import { TbPlus } from 'react-icons/tb';
import { RiArrowUpCircleLine, RiCloseFill } from 'react-icons/ri';

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5em 0 .5em 0;
    margin: 0 auto;
    height: 100%;
    background: rgba(253,253,253,1);
    overflow: hidden;
`;

export const FormTitle = styled.div`
    width: 100%;
    font-weight: 900;
    font-size: .9rem;
    margin-bottom: .1em;
`;

export const Label = styled.label`
    width: 100%;
    margin-bottom: .5em;
    font-weight: 700;
    font-size: .7rem;
    margin-top: 1em;
`;

export const Input = styled.input`
    width: 100%;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .25rem;
    padding: 0 .5em;
    font-size: .7rem;
    background: white;
`;

export const UrlInput = styled.input<AddImageProps>`
    width: 100%;
    border: 1px solid rgba(0,0,0,.2);
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
    padding: 0 .5em;
    font-size: .7rem;
`;

export const RadioInput = styled.input`
    margin-right: .5em;
`;

interface AddImageProps {
    disabled: boolean,
}

export const AddImageRow = styled.div`
    display: flex;
`;

export const AddImageButton = styled.button<AddImageProps>`
    border: 1px solid rgba(0,0,0,.2);
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem;
        
`;

export const AddIcon = styled(TbPlus) <AddImageProps>`
    color: ${p => p.disabled == true ? 'rgba(0, 0, 0, .2)' : 'black'}
`;

export const AddedImagesRow = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: .5em;
`;

export const AddedImageContainer = styled.div`
    position: relative;
    margin-right: .6em;
`;

export const AddedImage = styled.img`
    width: 2em;
    height: 2em;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

export const RemoveImage = styled(RiCloseFill)`
    position: absolute;
    top: .1em;
    right: .1em;
    background:black;
    color: white;
    cursor: pointer;
`;

export const SubmitButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8em;
    padding: .5em .5em;
    border-radius: .25rem;
    font-size: .6rem;
    font-weight: 700;
    background: #24a0ed;
    color: white;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    margin-top: 1em;
    z-index: 110;

 
`;

export const SubmitIcon = styled(RiArrowUpCircleLine)`
    margin-right: .3em;
    font-size: .9rem;
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: 5em;
    margin-bottom: .5em;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .25rem;
    padding: 0 .5em;
    resize: none;
    font-size: .7rem;
`;

export const SelectRow = styled.div`
    display: flex;
    justify-items: start;
    width: 100%;
    font-size: .7rem;
`;