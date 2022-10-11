import React, { useEffect, useState } from "react";
import api from "../../api";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { editAd, publishAd } from "../../redux/slices/classifiedsSlice";
import { Advertisement } from "../../types";
import { AddedImage, AddedImageContainer, AddedImagesRow, AddIcon, AddImageButton, AddImageRow, ErrorMessage, FormContainer, FormTitle, Input, Label, RadioInput, RemoveImage, SelectRow, SubmitButton, SubmitIcon, TextArea, UrlInput } from "./style";

interface FormProps {
  advertisement?: Advertisement,
  onConfirmFunction?: Function,
}

interface formValues {
  title: string,
  desc: string,
  price: string,
  tags: string[],
  images: string[],
  forward: boolean,
}

export const Form = ({ advertisement, onConfirmFunction }: FormProps) => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<formValues>({ title: '', desc: '', tags: [], price: '', images: [], forward: true });
  const [formErrors, setFormErrors] = useState({ title: "", });

  const [inputUrl, setInputUrl] = useState('');
  const [disableAdImages, setDisableAdImages] = useState(false);

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();
    validate();
  }

  const validate = () => {
    const errors = { title: "" };
    var error = false;

    if (formValues.title.trim().length == 0) {
      errors.title = "Title cannot be blank.";
      error = true;
    }

    setFormErrors(errors);
    if (!error) {
      submitForm();
    }
  }

  const submitForm = () => {
    if (advertisement) {
      let payload = {
        id: advertisement.id,
        title: advertisement.title == formValues.title ? null : formValues.title,
        desc: advertisement.desc == formValues.desc ? null : formValues.desc,
        price: advertisement.price == formValues.price ? null : formValues.price,
        forward: advertisement.forward == formValues.forward ? null : formValues.forward,
        images: JSON.stringify(advertisement.images) == JSON.stringify(formValues.images) ? null : formValues.images,
      }
      dispatch(editAd(payload));

      if (onConfirmFunction)
        onConfirmFunction();
    }
    else {
      dispatch(publishAd({ formValues: formValues }))
    }
    setFormValues({ title: '', desc: '', price: '', tags: [], images: [], forward: true });
    setInputUrl('');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id == 'title')
      setFormErrors({ title: "", });

    setFormValues({ ...formValues, [id]: value });
  };


  const handleUrlChange = (e) => {
    const { value } = e.target;
    setInputUrl(value);
  };

  const handleUrlSubmit = () => {
    if (formValues.images.length < 20 && inputUrl) {
      setFormValues({ ...formValues, images: [...formValues.images, inputUrl] });
      setInputUrl('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      document!.getElementById('add-image-button')!.click();
    }
  }

  useEffect(() => {
    if (formValues.images.length >= 20) {
      setDisableAdImages(true);
    };
  }, [formValues.images]);


  useEffect(() => {
    if (advertisement) {
      setFormValues({ title: advertisement.title, desc: advertisement.desc, price: advertisement.price, tags: [], images: advertisement.images, forward: advertisement.forward });
    }
  }, []);

  const handleRemoveImage = (image) => {
    if (formValues.images.length == 4) {
      setDisableAdImages(false);
    }

    setFormValues({ ...formValues, images: [...formValues.images.filter(x => x != image)] });
  }

  return (
    <FormContainer>
      {advertisement ? <FormTitle>Edit Ad</FormTitle> : <FormTitle>New Ad</FormTitle>}
      <Label>Title</Label>
      <Input
        placeholder="give a small title..."
        onChange={handleChange}
        type="text"
        value={formValues.title}
        id='title'
        maxLength={100}
      />
      <ErrorMessage>{formErrors.title}</ErrorMessage>
      <Label>Price</Label>
      <Input
        onChange={handleChange}
        type='text'
        value={formValues.price}
        id='price'
        maxLength={12}
        placeholder="e.g. 100 €"
      />
      {/* <Label>Allow forwarding?</Label>
      <SelectRow>
        <RadioInput
          onChange={() => setFormValues({ ...formValues, forward: true })}
          type="radio"
          value='Yes'
          checked={formValues.forward == true}
        />Yes
      </SelectRow >
      <SelectRow>
        <RadioInput
          onChange={() => setFormValues({ ...formValues, forward: false })}
          type="radio"
          checked={formValues.forward == false}
          value='No'
        />No
      </SelectRow> */}
      <Label>Images</Label>
      {
        formValues.images.length > 0 &&
        <AddedImagesRow >
          {
            formValues.images.map((image: string, index) =>
              <AddedImageContainer key={index}>
                <RemoveImage onClick={() => handleRemoveImage(image)} />
                <AddedImage src={image} />
              </AddedImageContainer>)
          }
        </AddedImagesRow>
      }
      <AddImageRow>
        <UrlInput
          placeholder="url"
          onChange={handleUrlChange}
          type="url"
          value={inputUrl}
          disabled={disableAdImages}
          onKeyPress={handleKeyPress}
        />
        <AddImageButton id='add-image-button' disabled={disableAdImages} onClick={handleUrlSubmit}><AddIcon disabled={disableAdImages} /></AddImageButton>
      </AddImageRow>
      <Label>Description</Label>

      <TextArea
        placeholder="write more details..."
        onChange={handleChange}
        value={formValues.desc}
        id='desc'
        maxLength={1000}
      />
      <SubmitButton onClick={handleSubmitButtonClick}><SubmitIcon />Submit</SubmitButton>
    </FormContainer >
  );
}