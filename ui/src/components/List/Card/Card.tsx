import { reactRenderer, sigil } from "@tlon/sigil-js";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../api";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { Advertisement } from "../../../types";
import { daToDate } from "../../../util";
import { CardContainer, Image, Publisher, Title, Date, ForwardIcon, BottomRow, DeleteIcon, FavIcon, Price, ContentContainer, MiddleRow, Icons, PublisherInfo, PriceLabel, PriceContainer, SourceContainer, PriceIcon } from './style';

interface CardProps {
    advertisement: Advertisement,
};

export const Card = ({ advertisement }: CardProps) => {

    const formatedDate = daToDate(advertisement!.date!).fromNow();
    const favorites = useAppSelector((state) => state.classifieds.data.favorites);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`${advertisement.id}`);
    };

    return (
        <CardContainer onClick={handleCardClick}>
            {advertisement.images[0] ?
                <Image src={advertisement.images[0]} />
                :
                <Image src='/apps/classifieds/assets/placeholder.png' />
            }
            <ContentContainer>
                <Title>
                    {advertisement?.title}
                    {favorites?.includes(advertisement.id) && < FavIcon />}
                    {/* <ForwardIcon /> */}
                </Title>
                <BottomRow>
                    {advertisement.price.trim().length == 0 ?
                        <PriceContainer /> :
                        <PriceContainer>
                            <PriceLabel>
                                <PriceIcon></PriceIcon> Price
                            </PriceLabel>
                            <Price>{advertisement?.price}</Price>
                        </PriceContainer>}
                    <SourceContainer>
                        <PublisherInfo>
                            {
                                advertisement.ship && advertisement.ship.length <= 14 &&
                                sigil({
                                    patp: advertisement?.ship,
                                    renderer: reactRenderer,
                                    size: 18,
                                    colors: ['white', 'black'],
                                })
                            }
                            <Publisher>
                                {advertisement?.ship == ('~' + api.ship!) ? 'You' : advertisement?.ship}
                            </Publisher>
                        </PublisherInfo>
                        <Date>{formatedDate}</Date>
                    </SourceContainer>
                </BottomRow>
            </ContentContainer>
        </CardContainer >
    );
};

