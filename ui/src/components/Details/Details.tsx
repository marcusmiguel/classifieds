import { reactRenderer, sigil } from "@tlon/sigil-js";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { deleteAd, sendMessage, toggleFavorite } from "../../redux/slices/classifiedsSlice";
import { Advertisement, Chat, TabContent } from "../../types";
import { daToDate } from "../../util";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { EditModal } from "../EditModal/EditModal";
import { ForwardModal } from "../ForwardModal/ForwardModal";
import { Desc, DetailsContainer, Publisher, Title, Image, Date, FavButton, FavIcon, ForwardButton, ForwardIcon, Actions, DeleteButton, DeleteIcon, Price, InfoRow, FirstSection, CloseIcon, PriceContainer, SourceContainer, PriceLabel, PublisherInfo, SecondaryImage, UpperRow, Tags, Tag, ImageColumn, InfoColumn, InfoBox, ChatButton, ChatIcon, FavIconClicked, Conversation, ConversationUpperRow, ConversationReceiver, ConversationReceiverShip, ConversationAdTitle, MessageList, SentMessage, MessageText, MessageDate, ReceivedMessage, SigilContainer, ReceivedMessageBox, ConversationBottomRow, Input, InputRow, SendIcon, NavigatedIcon, SecondaryImageRow, EditButton, EditIcon } from "./style";

interface DetailsProps {
    advertisement: Advertisement,
    setAd: Function,
    contentToShow: string
}

export const Details = ({ advertisement, setAd, contentToShow }: DetailsProps) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.classifieds.data.favorites);
    const chats = useAppSelector((state) => state.classifieds.data.chats);
    const [chat, setChat] = useState<Chat | undefined>();
    const [displayChat, setDisplayChat] = useState(false);
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
    const [displayEditModal, setDisplayEditModal] = useState(false);
    const [displayForwardModal, setDisplayForwardModal] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [mainImage, setMainImage] = useState<string>(advertisement.images[0]);
    const [secondaryImages, setSecondaryImages] = useState<string[]>([...advertisement.images.slice(1)])
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        if (favorites)
            setIsFavorited(favorites?.includes(advertisement.id))
    }, [favorites]);

    useEffect(() => {
        console.log(advertisement)
    }, [advertisement]);


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
                    setDisplayChat(false);
                    scrollToTop();
                }
            },
            false
        )
    }, []);

    useEffect(() => {
        if (chats) {
            let newchat = [...chats].filter(chat => chat["advertisement-id"] == advertisement.id)[0];
            setChat(newchat);

            if (displayChat) {
                setTimeout(() => {
                    let messageList = document.getElementById("detailsMessageList");
                    if (messageList) {
                        messageList.scrollTop = messageList?.scrollHeight!;
                        messageList.scrollIntoView(true);
                    }
                }, 100);
            }
        }
    }, [chats]);

    const handleDetailsClose = () => {
        setAd();
        document.body.style.overflow = "auto";
    }

    const handleFavButtonClick = () => {
        setIsFavorited(!isFavorited);
        dispatch(toggleFavorite({ id: advertisement.id }));
    }

    const handleDeleteModalConfirm = () => {
        dispatch(deleteAd({ id: advertisement.id }));
        setAd();
        document.body.style.overflow = "auto";
        setDisplayDeleteModal(false);
    };

    const handleImageClick = (e) => {
        let secondaryImagesCopy = [...secondaryImages];
        let newmainimage = secondaryImagesCopy[secondaryImages.indexOf(e.currentTarget.dataset.value)];
        secondaryImagesCopy[secondaryImages.indexOf(e.currentTarget.dataset.value)] = mainImage;

        setSecondaryImages(secondaryImagesCopy);
        setMainImage(newmainimage);
    };

    const handleChatButtonClick = () => {
        if (displayChat) {
            setDisplayChat(false);
            scrollToTop();
        }
        else {
            setDisplayChat(true);

            setTimeout(() => {
                let messageList = document.getElementById("detailsMessageList");
                if (messageList) {
                    messageList.scrollTop = messageList?.scrollHeight!;
                    messageList.scrollIntoView(true);
                }
            }, 100);

            let detailsContainer = document.getElementById("detailsContainer");
            if (detailsContainer) {
                detailsContainer.style.overflow = "hidden";
                detailsContainer.style.overflowY = "auto";
            }
        }
    }

    const scrollToTop = () => {
        let detailsContainer = document.getElementById("detailsContainer");
        if (detailsContainer) {
            detailsContainer.scrollTop = 0;
            detailsContainer.style.overflow = "hidden";
        }
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputMessage(value);
    }

    const handleSendMessage = () => {
        if (inputMessage.trim().length == 0) return
        dispatch(sendMessage({ 'advertisement-id': advertisement.id, to: advertisement.ship, text: inputMessage }))
        setInputMessage('');
    }

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            handleSendMessage();
        }
    }

    const onEditCloseFunction = () => {
        setDisplayEditModal(false);
    }

    return (
        <DetailsContainer id="detailsContainer" >
            <UpperRow>
                {contentToShow == TabContent[TabContent.ads] ? 'Ads' : 'My Ads'} <NavigatedIcon /> Details
                <CloseIcon onClick={handleDetailsClose} />
            </UpperRow>
            <FirstSection>
                <ImageColumn >
                    {mainImage ?
                        <Image src={mainImage} />
                        :
                        <Image src={'/apps/classifieds/assets/placeholder.png'} />
                    }
                    <SecondaryImageRow>
                        {secondaryImages[0] && <SecondaryImage src={secondaryImages[0]} data-value={secondaryImages[0]} onClick={handleImageClick} />}
                        {secondaryImages[1] && <SecondaryImage src={secondaryImages[1]} data-value={secondaryImages[1]} onClick={handleImageClick} />}
                        {secondaryImages[2] && <SecondaryImage src={secondaryImages[2]} data-value={secondaryImages[2]} onClick={handleImageClick} />}
                    </SecondaryImageRow>
                </ImageColumn>
                <InfoColumn>
                    <InfoBox>
                        <Title>{advertisement?.title}
                        </Title>
                        <Desc>{advertisement?.desc}</Desc>
                        <InfoRow>
                            {advertisement.price.trim().length == 0 ?
                                <PriceContainer />
                                :
                                <PriceContainer>
                                    <PriceLabel>
                                        Price
                                    </PriceLabel>
                                    <Price>{advertisement.price}</Price>
                                </PriceContainer>}
                            <SourceContainer>
                                <PublisherInfo>
                                    {
                                        sigil({
                                            patp: advertisement.ship,
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
                        {contentToShow == TabContent[TabContent.ads] ?
                            <>
                                <FavButton isFavorited={isFavorited} onClick={() => handleFavButtonClick()} >
                                    {isFavorited ? <><FavIconClicked />Favorited</> : <><FavIcon />Favorite</>}
                                </FavButton>
                                {/* <ForwardButton onClick={() => setDisplayForwardModal(true)}>
                                    <ForwardIcon />Forward
                                </ForwardButton> */}
                                <ChatButton id="detailsChatButton" onClick={handleChatButtonClick}>
                                    <ChatIcon />Chat
                                </ChatButton>
                            </>
                            :
                            <>
                                <EditButton onClick={() => setDisplayEditModal(true)}>
                                    <EditIcon />Edit
                                </EditButton>
                                <DeleteButton onClick={() => setDisplayDeleteModal(true)}>
                                    <DeleteIcon />Delete
                                </DeleteButton>
                            </>
                        }
                        {displayDeleteModal &&
                            <DeleteModal onConfirmFunction={handleDeleteModalConfirm} onCancelFunction={() => setDisplayDeleteModal(false)} />
                        }
                        {displayEditModal &&
                            <EditModal onConfirmFunction={handleDeleteModalConfirm} onCloseFunction={onEditCloseFunction} advertisement={advertisement} />
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
                                        patp: advertisement.ship,
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
                            {chat?.msgs.map((msg, index) =>
                                msg.ship == "~" + api.ship ?
                                    <SentMessage key={index}><MessageText>{msg.text}</MessageText><MessageDate>{daToDate(msg.date).fromNow()}</MessageDate></SentMessage>
                                    :
                                    <ReceivedMessage key={index}>
                                        {/* {!(chat.msgs[index] && chat.msgs[index].ship != '~' + api.ship) && */}
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
                                            <MessageDate>{daToDate(msg.date).fromNow()}</MessageDate>
                                        </ReceivedMessageBox>
                                    </ReceivedMessage>
                            )
                            }
                        </MessageList>
                        <ConversationBottomRow >
                            <InputRow>
                                <Input placeholder="Write your message" onChange={handleInputChange} onKeyPress={handleKeyPress} value={inputMessage} />
                                <SendIcon onClick={handleSendMessage} />
                            </InputRow>
                        </ConversationBottomRow>
                    </Conversation>}
                </InfoColumn>
            </FirstSection>
        </DetailsContainer >
    )
}