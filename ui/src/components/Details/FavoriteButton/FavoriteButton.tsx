import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { toggleFavorite } from "../../../redux/slices/classifiedsSlice";
import { Advertisement } from "../../../types";
import { FavButton, FavIcon, FavIconClicked } from "./style";

interface FavoriteButtonProps {
    advertisement: Advertisement,
}

export const FavoriteButton = ({ advertisement }: FavoriteButtonProps) => {

    const [isFavorited, setIsFavorited] = useState(false);
    const favorites = useAppSelector((state) => state.classifieds.data.favorites);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (favorites)
            setIsFavorited(favorites?.includes(advertisement.id));
    }, [favorites]);

    const handleFavButtonClick = () => {
        setIsFavorited(!isFavorited);
        dispatch(toggleFavorite({ id: advertisement.id }));
    }

    return (
        <FavButton isFavorited={isFavorited} onClick={() => handleFavButtonClick()} >
            {isFavorited ? <><FavIconClicked />Favorited</> : <><FavIcon />Favorite</>}
        </FavButton>
    )

}