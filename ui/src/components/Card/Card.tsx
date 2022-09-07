import { reactRenderer, sigil } from "@tlon/sigil-js";
import moment from "moment";
import React from "react";
import api from "../../api";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Advertisement } from "../../types";
import { daToDate } from "../../util";
import { CardContainer, Image, Publisher, Title, Date, ForwardIcon, BottomRow, DeleteIcon, FavIcon, Price, ContentContainer, MiddleRow, Icons, PublisherInfo, PriceLabel, PriceContainer, SourceContainer } from './style';

interface CardProps {
    advertisement: Advertisement,
    setAdToShow: Function,
};

export const Card = ({ advertisement, setAdToShow }: CardProps) => {
    const formatedDate = daToDate(advertisement!.date!).fromNow();

    const handleCardClick = () => {
        setAdToShow(advertisement);
    }

    return (
        <CardContainer onClick={handleCardClick}>
            {advertisement.images[0] ?
                <Image src={advertisement.images[0]} />
                :
                <Image src='/apps/classifieds/assets/placeholder.png' />
            }
            <ContentContainer>
                <Title>{advertisement?.title}
                    {advertisement.isFavorited && < FavIcon />}
                    <ForwardIcon />
                </Title>
                <BottomRow>
                    <PriceContainer>
                        <PriceLabel>
                            Price
                        </PriceLabel>
                        <Price>${advertisement?.price}</Price>
                    </PriceContainer>
                    <SourceContainer>
                        <PublisherInfo>
                            {
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

