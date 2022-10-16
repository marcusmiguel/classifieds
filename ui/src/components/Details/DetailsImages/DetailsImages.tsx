import React, { useEffect, useState } from "react";
import { Images, Image, ImageWrapper, LeftArrow, RightArrow, SecondaryImages, SecondaryImage } from "./style";

interface DetailsImagesProps {
    images: string[],
}

export const DetailsImages = ({ images }: DetailsImagesProps) => {

    const [mainImage, setMainImage] = useState<number | undefined>(0);
    const [secondaryImages, setSecondaryImages] = useState<string[] | undefined>(images);
    const [showImageArrows, setShowImageArrows] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!((location.pathname.indexOf('/edit') > -1)
                || (location.pathname.indexOf('/delete') > -1)
            )) {
                if (e.key == 'ArrowLeft') {
                    handleLeftArrowClick();
                }
                else if (e.key == 'ArrowRight') {
                    handleRightArrowClick();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", () => { });
        }
    }, []);

    useEffect(() => {
        let nextImageElem = document.querySelector(`[data-index='${mainImage}']`);
        nextImageElem?.scrollIntoView(true);
    }, [mainImage]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (images && images.length > 0) {
                setMainImage(0);
                setSecondaryImages(images);
            }
            else {
                setMainImage(undefined);
                setSecondaryImages(undefined);
            }
        }

        return () => { isMounted = false };
    }, [images]);

    const handleImageClick = (e, index) => {
        if (secondaryImages) {
            setMainImage(index);

            let clickedImage = e.target;
            if (clickedImage) {
                clickedImage.scrollIntoView(true);
            }
        }
    };


    const handleRightArrowClick = () => {
        if (secondaryImages && (mainImage != undefined)) {

            setMainImage(prev => {
                if (prev == undefined) return 0;

                let index = prev;
                if ((index + 1) != secondaryImages.length) {
                    index = prev + 1;
                }

                return index;
            }
            );
        }
    };

    const handleLeftArrowClick = () => {
        if (secondaryImages && (mainImage != undefined)) {
            setMainImage(prev => {
                if (prev == undefined) return 0;
                var index = prev;
                if ((index - 1) != -1) {
                    index -= 1;
                }

                return index;
            });
        }
    };


    return (
        <Images >
            {((mainImage != undefined) && secondaryImages) ?
                <ImageWrapper id="image-wrapper" onMouseEnter={() => setShowImageArrows(true)} onMouseLeave={() => setShowImageArrows(false)}>
                    {secondaryImages && secondaryImages.length > 1 && <LeftArrow $toShow={showImageArrows} $disabled={(mainImage == 0)} onClick={() => handleLeftArrowClick()} />}
                    <Image src={secondaryImages[mainImage]} />
                    {secondaryImages && secondaryImages.length > 1 && < RightArrow $toShow={showImageArrows} $disabled={(mainImage == secondaryImages.length - 1)} onClick={() => handleRightArrowClick()} />}
                </ImageWrapper>
                :
                <Image src={'/apps/classifieds/assets/placeholder.png'} />
            }
            {secondaryImages && secondaryImages.length > 1 && <SecondaryImages>
                {
                    secondaryImages.map(
                        (img, index) => <SecondaryImage data-index={index} key={index} src={img} data-value={img} onClick={(e) => handleImageClick(e, index)} isSelected={(index == mainImage)} />
                    )
                }
            </SecondaryImages>}
        </Images>
    )
}