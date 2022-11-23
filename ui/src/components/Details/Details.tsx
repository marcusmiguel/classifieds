import { reactRenderer, sigil } from "@tlon/sigil-js";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { Advertisement } from "../../types";
import { daToDate, getAdById, scrollDetailsToTop } from "../../util";
import { DetailsImages } from "./DetailsImages/DetailsImages";
import { FavoriteButton } from "./FavoriteButton/FavoriteButton";
import { Desc, DetailsContainer, Publisher, Title, Date, Actions, DeleteButton, DeleteIcon, Price, FirstSection, CloseIcon, PriceContainer, SourceContainer, PriceLabel, PublisherInfo, UpperRow, InfoColumn, InfoBox, ChatButton, ChatIcon, NavigatedIcon, EditButton, EditIcon, DetailsBackground, SmallScreenTitle, SmallScreenSourceContainer, PriceIcon } from "./style";

export const Details = () => {

    const { id } = useParams();
    const advertisement: Advertisement | null = getAdById(id);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflowY = "auto";
        }
    }, []);

    useEffect(() => {
        let detailsBackground = document.getElementById('detailsBackground');
        if (detailsBackground) {
            detailsBackground.style.overflowX = 'hidden';
            detailsBackground.style.overflowY = 'auto';
        }
    }, [location]);

    const handleChatButtonClick = () => {
        if (location.pathname.includes('/chat')) {
            scrollDetailsToTop();
            navigate(-1);
        }
        else {

            const addConversationCloseEventListener = () => {
                let detailsBackground = document.getElementById("detailsBackground");

                detailsBackground!.addEventListener(
                    "click",
                    function (event) {
                        var clicked = event.target as Element;
                        var chat = document.getElementById('detailsConversation');
                        var chatButton = document.getElementById('detailsChatButton');
                        if (
                            clicked != chat
                            && chat
                            && !chat?.contains(clicked)
                            && clicked != chatButton
                            && !chatButton?.contains(clicked)
                        ) {
                            navigate(-1)
                            scrollDetailsToTop();
                        }
                        else if (
                            clicked == chat
                            || chat?.contains(clicked)
                        ) {
                            addConversationCloseEventListener();
                        }
                    }, { once: true }
                );

            }
            addConversationCloseEventListener();

            navigate('chat');

            setTimeout(() => {
                let messageList = document.getElementById("detailsMessageList");
                if (messageList) {
                    messageList.scrollTop = messageList?.scrollHeight!;
                    messageList.scrollIntoView(true);
                }
            }, 100);
        }
    }

    const handleOpenEditModal = () => {
        document.getElementById('detailsBackground')!.style.overflow = 'hidden';
        navigate('edit');
    };

    const handleOpenDeleteModal = () => {
        document.getElementById('detailsBackground')!.style.overflow = 'hidden';
        navigate('delete');
    };

    return (
        <DetailsBackground id="detailsBackground" >
            <DetailsContainer >
                <UpperRow>
                    {location.pathname.includes('/ads') ? 'Ads' : 'My Ads'} <NavigatedIcon /> Details
                    <CloseIcon onClick={() => navigate(-1)} />
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
                    <DetailsImages images={advertisement.images} />
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
                            {location.pathname.includes('/ads') ?
                                <>
                                    <FavoriteButton advertisement={advertisement} />
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
                        </Actions>
                        <Outlet />
                    </InfoColumn>
                </FirstSection>}
            </DetailsContainer >
        </DetailsBackground>
    )
}