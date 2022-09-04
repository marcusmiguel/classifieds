import { reactRenderer, sigil } from "@tlon/sigil-js";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { toggleFavorite } from "../../redux/slices/advertisementsSlice";
import { Advertisement, TabContent } from "../../types";
import { daToDate } from "../../util";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { ForwardModal } from "../ForwardModal/ForwardModal";
import { Desc, DetailsContainer, Publisher, Title, Image, Date, FavButton, FavIcon, ForwardButton, ForwardIcon, Actions, DeleteButton, DeleteIcon, Price, InfoRow, FirstSection, CloseIcon, PriceContainer, SourceContainer, PriceLabel, PublisherInfo, SecondaryImageColumn, SecondaryImage, UpperRow, Tags, Tag, ImageColumn, InfoColumn, InfoBox, ChatButton, ChatIcon, FavIconClicked, Conversation, ConversationUpperRow, ConversationReceiver, ConversationReceiverShip, ConversationAdTitle, MessageList, SentMessage, MessageText, MessageDate, ReceivedMessage, SigilContainer, ReceivedMessageBox, ConversationBottomRow, Input, InputRow, SendIcon, NavigatedIcon } from "./style";

interface DetailsProps {
    advertisement: Advertisement,
    setAd: Function,
    contentToShow: string
}

export const Details = ({ advertisement, setAd, contentToShow }: DetailsProps) => {

    const [displayChat, setDisplayChat] = useState(false);
    const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
    const [displayForwardModal, setDisplayForwardModal] = useState(false);
    const dispatch = useAppDispatch();

    const [hardCodedChat, setHardCodedChat] = useState({
        ship: '~fidwed-sipwyn',
        msgs: [{ ship: '~harlys-forbec', date: moment.utc(), text: 'Can we have a chat about the ad that you just posted?' }
        ]
        , adTitle: 'myad2'
    });

    const [mainImage, setMainImage] = useState<string>(advertisement.images[0]);
    const [secondaryImages, setSecondaryImages] = useState<string[]>([...advertisement.images.slice(1)])

    useEffect(() => {
        document.body.style.overflow = "hidden";

        document.addEventListener(
            "click",
            function (event) {
                var clicked = event.target as Element;
                var chat = document.getElementById('detailsConversation');
                var chatButton = document.getElementById('detailsChatButton');

                if (
                    clicked != chat && !chat?.contains(clicked) && clicked != chatButton && !chatButton?.contains(clicked)
                ) {
                    setDisplayChat(false)
                }
            },
            false
        )
    }, []);

    const handleDetailsClose = () => {
        setAd();
        document.body.style.overflowY = "scroll";
        document.body.style.overflowX = "hidden";
    }

    const handleDeleteModalConfirm = () => {
        // poke the agent

        setDisplayConfirmModal(false);
    };

    const handleImageClick = (e) => {
        let secondaryImagesCopy = [...secondaryImages];
        let newmainimage = secondaryImagesCopy[secondaryImages.indexOf(e.currentTarget.dataset.value)];
        secondaryImagesCopy[secondaryImages.indexOf(e.currentTarget.dataset.value)] = mainImage;

        setSecondaryImages(secondaryImagesCopy)
        setMainImage(newmainimage)
    };

    const handleChatButtonClick = () => {
        let detailsContainer = document.getElementById("detailsContainer")!;

        if (displayChat) {
            setDisplayChat(false)
            detailsContainer.scrollTop = 0;

            detailsContainer.style.overflow = "hidden";
            detailsContainer.style.overflowY = "hidden";
        }
        else {
            setDisplayChat(true);

            setTimeout(() => {
                let messageList = document.getElementById("detailsMessageList")!;
                messageList.scrollTop = messageList?.scrollHeight!;
                messageList.scrollIntoView(true);
            }, 100);

            detailsContainer.style.overflow = "hidden";
            detailsContainer.style.overflowY = "auto";
        }
    }

    return (
        <DetailsContainer id="detailsContainer" >
            <UpperRow>
                {contentToShow == 'theirAds' ? 'Their Ads' : 'My Ads'} <NavigatedIcon /> Details
                <CloseIcon onClick={handleDetailsClose} />
            </UpperRow>
            <FirstSection>
                <ImageColumn >
                    {mainImage ?
                        <Image src={mainImage} />
                        :
                        <Image src={'/apps/classifieds/assets/placeholder.png'} />
                    }
                    <SecondaryImageColumn>
                        {secondaryImages[0] && <SecondaryImage src={secondaryImages[0]} data-value={secondaryImages[0]} onClick={handleImageClick} />}
                        {secondaryImages[1] && <SecondaryImage src={secondaryImages[1]} data-value={secondaryImages[1]} onClick={handleImageClick} />}
                        {secondaryImages[2] && <SecondaryImage src={secondaryImages[2]} data-value={secondaryImages[2]} onClick={handleImageClick} />}
                    </SecondaryImageColumn>
                </ImageColumn>
                <InfoColumn>
                    <InfoBox>
                        <Title>{advertisement?.title}
                        </Title>
                        <Desc>{advertisement?.desc}</Desc>
                        <InfoRow>
                            <PriceContainer>
                                <PriceLabel>
                                    Price
                                </PriceLabel>
                                <Price>$100</Price>
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
                                        {advertisement?.ship == ('~' + api.ship!) ? 'You' : advertisement?.ship}
                                    </Publisher>
                                </PublisherInfo>
                                <Date>{daToDate(advertisement!.date!).fromNow()}</Date>
                            </SourceContainer>
                        </InfoRow>
                    </InfoBox>
                    <Actions>
                        {contentToShow == TabContent[TabContent.theirAds] ?
                            <>
                                <FavButton isFavorited={advertisement.isFavorited} onClick={() => dispatch(toggleFavorite({ id: advertisement.id }))} >
                                    {advertisement.isFavorited ? <><FavIconClicked />Favorited</> : <><FavIcon />Favorite</>}
                                </FavButton>
                                <ForwardButton onClick={() => setDisplayForwardModal(true)}>
                                    <ForwardIcon />Forward
                                </ForwardButton>
                                <ChatButton id="detailsChatButton" onClick={handleChatButtonClick}>
                                    <ChatIcon />Chat
                                </ChatButton>
                            </>
                            :
                            <DeleteButton onClick={() => setDisplayConfirmModal(true)}>
                                <DeleteIcon />Delete
                            </DeleteButton>
                        }
                        {displayConfirmModal &&
                            <ConfirmModal onConfirmFunction={handleDeleteModalConfirm} onCancelFunction={() => setDisplayConfirmModal(false)} Message={"Are you sure?"} />
                        }
                        {displayForwardModal &&
                            <ForwardModal advertisement={advertisement} setDisplayForwardModal={setDisplayForwardModal}></ForwardModal>
                        }
                    </Actions>
                    {displayChat && <Conversation id="detailsConversation">
                        <ConversationUpperRow>
                            <ConversationReceiver>
                                {
                                    sigil({
                                        patp: '~fidwed-sipwyn',
                                        renderer: reactRenderer,
                                        size: 20,
                                        colors: ['white', 'black'],
                                    })
                                }
                                <ConversationReceiverShip>
                                    {advertisement.ship}
                                </ConversationReceiverShip>
                            </ConversationReceiver>
                            <ConversationAdTitle>{advertisement.title}</ConversationAdTitle>
                        </ConversationUpperRow>
                        <MessageList id='detailsMessageList'>
                            {hardCodedChat.msgs.map((msg, index) =>
                                msg.ship == hardCodedChat.ship ?
                                    <SentMessage key={index}><MessageText>{msg.text}</MessageText><MessageDate>{msg.date.fromNow()}</MessageDate></SentMessage>
                                    :
                                    <ReceivedMessage key={index}>
                                        <SigilContainer>
                                            {
                                                sigil({
                                                    patp: msg.ship,
                                                    renderer: reactRenderer,
                                                    size: 20,
                                                    colors: ['white', 'black'],
                                                })
                                            }
                                        </SigilContainer>
                                        <ReceivedMessageBox>
                                            <MessageText>{msg.text}</MessageText>
                                            <MessageDate>{msg.date.fromNow()}</MessageDate>
                                        </ReceivedMessageBox>
                                    </ReceivedMessage>
                            )
                            }
                        </MessageList>
                        <ConversationBottomRow >
                            <InputRow>
                                <Input placeholder="Write your message" ></Input>
                                <SendIcon />
                            </InputRow>
                        </ConversationBottomRow>
                    </Conversation>}
                </InfoColumn>
            </FirstSection>
        </DetailsContainer >
    )
}