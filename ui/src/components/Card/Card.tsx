import { reactRenderer, sigil } from "@tlon/sigil-js";
import moment from "moment";
import React from "react";
import api from "../../api";
import { Advertisement } from "../../types";
import { daToDate } from "../../util";
import { CardContainer, Image, Publisher, Title, Date, ForwardIcon, BottomRow, DeleteIcon, FavIcon, Price, ContentContainer, MiddleRow, Icons, PublisherInfo, PriceLabel, PriceContainer, SourceContainer } from './style';

interface CardProps {
    advertisement: Advertisement,
    setAdToShow: Function,
}

export const Card = ({ advertisement, setAdToShow }: CardProps) => {
    const formatedDate = daToDate(advertisement!.date!).fromNow();

    const handleCardClick = () => {
        setAdToShow(advertisement);
    }

    return (
        <CardContainer onClick={handleCardClick}>
            <Image src='https://picsum.photos/200' />
            <ContentContainer>
                <Title>{advertisement?.title} <FavIcon />
                    <ForwardIcon />
                </Title>
                <BottomRow>
                    <PriceContainer>
                        <PriceLabel>
                            Price
                        </PriceLabel>
                        <Price> $100</Price>
                    </PriceContainer>
                    <SourceContainer>
                        <PublisherInfo>
                            {
                                sigil({
                                    patp: 'fidwed-sipwyn',
                                    renderer: reactRenderer,
                                    size: 18,
                                    colors: ['white', 'black'],
                                })
                            }
                            <Publisher>
                                {advertisement?.publisher == ('~' + api.ship!) ? 'You' : advertisement?.publisher}
                            </Publisher>
                        </PublisherInfo>
                        <Date>{formatedDate}</Date>
                    </SourceContainer>
                </BottomRow>
            </ContentContainer>
        </CardContainer >
    );
};

