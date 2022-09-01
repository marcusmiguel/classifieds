import React, { useEffect, useState } from "react";
import api from "../../api";
import { AddedImage, AddedImageContainer, AddedImagesRow, AddIcon, AddImageButton, AddImageRow, FormContainer, FormTitle, Input, Label, RadioInput, RemoveImage, SelectRow, SubmitButton, SubmitIcon, TextArea, UrlInput } from "./style";

interface formValues {
  title: string,
  desc: string,
  images: string[],
  price: number,
  tags: string[]
}

export const Form = () => {
  const [formValues, setFormValues] = useState<formValues>({ title: '', desc: '', images: [], tags: [], price: 0 });
  const [addedImages, setAddedImages] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState('');
  const [disableAdImages, setDisableAdImages] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Yes")

  const handleButtonClick = () => {
    api.poke(
      {
        app: 'classifieds',
        mark: 'classifieds-action',
        json: { 'pub-advertisement': { 'title': formValues.title, 'desc': formValues.desc } },
      }
    );
    setFormValues({ title: '', desc: '', images: [], price: 0, tags: [] });
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
    if (addedImages.length < 4 && inputUrl) {
      setAddedImages([...addedImages, inputUrl]);
      setInputUrl('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      document!.getElementById('add-image-button')!.click();
    }
  }
  useEffect(() => {
    if (addedImages.length >= 4) {
      setDisableAdImages(true);
    };
    setFormValues({ ...formValues, images: addedImages });
  }, [addedImages]);

  const handleRemoveImage = (image) => {
    if (addedImages.length == 4) {
      setDisableAdImages(false);
    }

    setAddedImages(addedImages.filter(x => x != image));
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
          onChange={() => setSelectedOption("Yes")}
          type="radio"
          value='Yes'
          checked={selectedOption == "Yes"}
        />Yes
      </SelectRow >
      <SelectRow>
        <RadioInput
          onChange={() => setSelectedOption("No")}
          type="radio"
          checked={selectedOption == "No"}
          value='No'
        />No
      </SelectRow>
      <Label>Images</Label>
      {
        addedImages.length > 0 &&
        <AddedImagesRow >
          {
            addedImages.map((image: string, index) =>
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