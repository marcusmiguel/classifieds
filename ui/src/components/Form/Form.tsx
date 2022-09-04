import React, { useEffect, useState } from "react";
import api from "../../api";
import { AddedImage, AddedImageContainer, AddedImagesRow, AddIcon, AddImageButton, AddImageRow, FormContainer, FormTitle, Input, Label, RadioInput, RemoveImage, SelectRow, SubmitButton, SubmitIcon, TextArea, UrlInput } from "./style";

interface formValues {
  title: string,
  desc: string,
  price: number,
  tags: string[],
  images: string[],
}

export const Form = () => {
  const [formValues, setFormValues] = useState<formValues>({ title: '', desc: '', tags: [], price: 0, images: [] });
  const [inputUrl, setInputUrl] = useState('');
  const [disableAdImages, setDisableAdImages] = useState(false);
  const [selectedOption, setSelectedOption] = useState(true)

  const handleButtonClick = () => {
    api.poke(
      {
        app: 'classifieds',
        mark: 'classifieds-action',
        json: {
          'publish-ad': {
            'title': formValues.title,
            'desc': formValues.desc,
            'price': formValues.price + '',
            'forward': selectedOption,
            'images': formValues.images
          }
        },
      }
    );
    setFormValues({ title: '', desc: '', price: 0, tags: [], images: [] });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleUrlChange = (e) => {
    const { value } = e.target;
    setInputUrl(value);
  };

  const handleUrlSubmit = () => {
    if (formValues.images.length < 4 && inputUrl) {
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
    if (formValues.images.length >= 4) {
      setDisableAdImages(true);
    };
  }, [formValues.images]);

  const handleRemoveImage = (image) => {
    if (formValues.images.length == 4) {
      setDisableAdImages(false);
    }

    setFormValues({ ...formValues, images: [...formValues.images.filter(x => x != image)] });
  }

  return (
    <FormContainer>
      <FormTitle>Publish Ad</FormTitle>
      <Label>Title</Label>
      <Input
        placeholder="give a small title..."
        onChange={handleChange}
        type="text"
        value={formValues.title}
        id='title'
      />
      <Label>Price</Label>
      <Input
        onChange={handleChange}
        type="number"
        value={formValues.price}
        id='price'
      />
      <Label>Allow forwarding?</Label>
      <SelectRow>
        <RadioInput
          onChange={() => setSelectedOption(true)}
          type="radio"
          value='Yes'
          checked={selectedOption == true}
        />Yes
      </SelectRow >
      <SelectRow>
        <RadioInput
          onChange={() => setSelectedOption(false)}
          type="radio"
          checked={selectedOption == false}
          value='No'
        />No
      </SelectRow>
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
      />
      <SubmitButton onClick={handleButtonClick}><SubmitIcon />Submit</SubmitButton>
    </FormContainer >
  );
}