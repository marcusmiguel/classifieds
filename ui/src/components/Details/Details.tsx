import { reactRenderer, sigil } from "@tlon/sigil-js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { deleteAd, sendMessage, toggleFavorite } from "../../redux/slices/classifiedsSlice";
import { Advertisement, Chat } from "../../types";
import { daToDate, getAdById, locationHasPath } from "../../util";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { EditModal } from "../EditModal/EditModal";
import { ForwardModal } from "../ForwardModal/ForwardModal";
import { Desc, DetailsContainer, Publisher, Title, Image, Date, FavButton, FavIcon, Actions, DeleteButton, DeleteIcon, Price, FirstSection, CloseIcon, PriceContainer, SourceContainer, PriceLabel, PublisherInfo, SecondaryImage, UpperRow, Tags, Tag, Images, InfoColumn, InfoBox, ChatButton, ChatIcon, FavIconClicked, Conversation, ConversationUpperRow, ConversationReceiver, ConversationReceiverShip, ConversationAdTitle, MessageList, SentMessage, MessageText, MessageDate, ReceivedMessage, SigilContainer, ReceivedMessageBox, ConversationBottomRow, Input, InputRow, SendIcon, NavigatedIcon, EditButton, EditIcon, DescTitle, LeftArrow, RightArrow, ImageWrapper, SecondaryImages, DetailsBackground, GoBackIcon, ConversationWrapper, SmallScreenTitle, SmallScreenSourceContainer, PriceIcon } from "./style";

export const Details = () => {

    const { id } = useParams();
    const advertisement: Advertisement | null = getAdById(id);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const favorites = useAppSelector((state) => state.classifieds.data.favorites);
    const chats = useAppSelector((state) => state.classifieds.data.chats);
    const [chat, setChat] = useState<Chat | undefined>();
    const [displayChat, setDisplayChat] = useState(false);
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
    const [displayEditModal, setDisplayEditModal] = useState(false);
    const [displayForwardModal, setDisplayForwardModal] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [mainImage, setMainImage] = useState<number | undefined>(0);
    const [secondaryImages, setSecondaryImages] = useState<string[] | undefined>(advertisement?.images);
    const [isFavorited, setIsFavorited] = useState(false);
    const [showImageArrows, setShowImageArrows] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            if (e.key == 'ArrowLeft') {
                handleLeftArrowClick();
            }
            else if (e.key == 'ArrowRight') {
                handleRightArrowClick();
            }
        };

        window.addEventListener("popstate", handleGoBack);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("popstate", () => { });
            window.removeEventListener("keydown", () => { });
        }
    }, []);

    useEffect(() => {
        if (favorites && advertisement)
            setIsFavorited(favorites?.includes(advertisement.id))
    }, [favorites]);

    useEffect(() => {
        let nextImageElem = document.querySelector(`[data-index='${mainImage}']`);
        nextImageElem?.scrollIntoView(true);
    }, [mainImage]);

    useEffect(() => {
        if (advertisement?.images && advertisement?.images.length > 0) {
            setMainImage(0);
            setSecondaryImages(advertisement?.images);
        }
        else {
            setMainImage(undefined);
            setSecondaryImages(undefined);
        }
    }, [advertisement]);

    useEffect(() => {
        if (chats && advertisement) {
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

    const handleFavButtonClick = () => {
        setIsFavorited(!isFavorited);
        advertisement && dispatch(toggleFavorite({ id: advertisement.id }));
    }

    const handleImageClick = (e, index) => {
        if (secondaryImages) {
            setMainImage(index);

            let clickedImage = e.target;
            if (clickedImage) {
                clickedImage.scrollIntoView(true);
            }
        }
    };

    const handleChatButtonClick = () => {
        if (displayChat) {
            handleChatClose();
            scrollToTop();
            navigate(-1);
        }
        else {
            let detailsBackground = document.getElementById("detailsBackground");
            detailsBackground!.addEventListener(
                "click",
                function (event) {
                    var clicked = event.target as Element;
                    var chat = document.getElementById('detailsConversation');
                    var chatButton = document.getElementById('detailsChatButton');
                    if (
                        clicked != chat && chat && !chat?.contains(clicked) && clicked != chatButton && !chatButton?.contains(clicked)
                    ) {
                        navigate(-1);
                        scrollToTop();
                        handleChatClose();
                    }
                },
                { once: true }
            )

            setDisplayChat(true);
            window.history.pushState({ page: 'chat' }, '', '');

            setTimeout(() => {
                let messageList = document.getElementById("detailsMessageList");
                if (messageList) {
                    messageList.scrollTop = messageList?.scrollHeight!;
                    messageList.scrollIntoView(true);
                }
            }, 100);
        }
    }

    const scrollToTop = () => {
        let detailsBackground = document.getElementById("detailsBackground");
        if (detailsBackground) {
            detailsBackground.scrollTop = 0;
        }
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputMessage(value);
    }

    const handleSendMessage = () => {
        if (inputMessage.trim().length == 0) return
        advertisement && dispatch(sendMessage({ 'advertisement-id': advertisement.id, to: advertisement.ship, text: inputMessage }));
        setInputMessage('');
    }

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            handleSendMessage();
        }
    }

    const handleCloseEditModalClick = () => {
        navigate(-1);
        handleCloseEditModal();
    }

    const handleEditModalConfirm = () => {
        navigate(-1);
        handleCloseEditModal();
    }

    const handleCloseEditModal = () => {
        setDisplayEditModal(false);
        let detailsBackground = document.getElementById('detailsBackground');
        if (detailsBackground) {
            detailsBackground.style.overflowX = 'hidden';
            detailsBackground.style.overflowY = 'auto';
        }
    }

    const handleOpenEditModal = () => {
        document.getElementById('detailsBackground')!.style.overflow = 'hidden';
        window.history.pushState({ page: 'edit' }, '', '');

        setDisplayEditModal(true);
    }

    const handleOpenDeleteModal = () => {
        window.history.pushState({ page: 'delete' }, '', '');
        setDisplayDeleteModal(true);
    }

    const handleDetailsClose = () => {
        navigate(-1);
        document.body.style.overflowY = "auto";
    }

    const handleDeleteModalConfirm = () => {
        advertisement && dispatch(deleteAd({ id: advertisement.id }));
        navigate(-1);
        handleDeleteModalClose();
        handleDetailsClose();
    };

    const handleDeleteModalCloseClick = () => {
        navigate(-1);
        handleDeleteModalClose();
    };

    const handleDeleteModalClose = () => {
        setDisplayDeleteModal(false);
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

    const handleGoBack = () => {
        handleChatClose();
        handleCloseEditModal();
        handleDeleteModalClose();
    };

    const handleChatCloseClick = () => {
        navigate(-1);
        handleChatClose();
        scrollToTop();
    };

    const handleChatClose = () => {
        let detailsBackground = document.getElementById("detailsBackground");

        if (detailsBackground) {
            detailsBackground.removeEventListener("click", () => { });
        }

        setDisplayChat(false);
    };

    return (
        <DetailsBackground id="detailsBackground" >
            <DetailsContainer >
                {displayEditModal &&
                    advertisement && <EditModal onConfirmFunction={handleEditModalConfirm} onCloseFunction={handleCloseEditModalClick} advertisement={advertisement} />
                }
                <UpperRow>
                    {locationHasPath('/ads') ? 'Ads' : 'My Ads'} <NavigatedIcon /> Details
                    <CloseIcon onClick={handleDetailsClose} />
                </UpperRow>
                {advertisement && <FirstSection>
                    <SmallScreenTitle>{advertisement?.title}
                    </SmallScreenTitle>
                    <SmallScreenSourceContainer>
                        <PublisherInfo>
                            {advertisement.ship && advertisement.ship.length <= 14 &&
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
                        <Date>{daToDate(advertisement.date).fromNow()}</Date>
                    </SmallScreenSourceContainer>
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
                    <InfoColumn>
                        <InfoBox>
                            <Title>{advertisement?.title}
                            </Title>
                            <SourceContainer>
                                <PublisherInfo>
                                    {advertisement.ship && advertisement.ship.length <= 14 &&
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
                                <Date>{daToDate(advertisement.date).fromNow()}</Date>
                            </SourceContainer>
                            <Desc>{advertisement?.desc}</Desc>
                            {advertisement.price.trim().length == 0 ?
                                <PriceContainer />
                                :
                                <PriceContainer>
                                    <PriceLabel>
                                        <PriceIcon></PriceIcon> Price
                                    </PriceLabel>
                                    <Price>{advertisement?.price}</Price>
                                </PriceContainer>}
                        </InfoBox>
                        <Actions>
                            {locationHasPath('/ads') ?
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
                                    <EditButton onClick={handleOpenEditModal}>
                                        <EditIcon />Edit
                                    </EditButton>
                                    <DeleteButton onClick={handleOpenDeleteModal}>
                                        <DeleteIcon />Delete
                                    </DeleteButton>
                                </>
                            }
                            {displayDeleteModal &&
                                <DeleteModal onConfirmFunction={handleDeleteModalConfirm} onCancelFunction={handleDeleteModalCloseClick} />
                            }

                            {displayForwardModal &&
                                <ForwardModal advertisement={advertisement} setDisplayForwardModal={setDisplayForwardModal}></ForwardModal>
                            }
                        </Actions>
                        {displayChat &&
                            <ConversationWrapper>
                                <Conversation id="detailsConversation">
                                    <GoBackIcon onClick={() => handleChatCloseClick()}></GoBackIcon>
                                    <ConversationUpperRow>
                                        <ConversationReceiver>
                                            {advertisement.ship && advertisement.ship.length <= 14 &&
                                                sigil({
                                                    patp: advertisement.ship,
                                                    renderer: reactRenderer,
                                                    size: 20,
                                                    colors: ['white', 'black'],
                                                })
                                            }
                                            <ConversationReceiverShip>
                                                {advertisement?.ship}
                                            </ConversationReceiverShip>
                                        </ConversationReceiver>
                                        <ConversationAdTitle>{advertisement?.title}</ConversationAdTitle>
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
                                                            msg.ship && msg.ship.length <= 14 &&
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
                                            <Input placeholder="Type your message..." onChange={handleInputChange} onKeyPress={handleKeyPress} value={inputMessage} />
                                            <SendIcon onClick={handleSendMessage} />
                                        </InputRow>
                                    </ConversationBottomRow>
                                </Conversation>
                            </ConversationWrapper>
                        }
                    </InfoColumn>
                </FirstSection>}
            </DetailsContainer >
        </DetailsBackground>
    )
}