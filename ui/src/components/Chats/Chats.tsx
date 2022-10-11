import { reactRenderer, sigil } from "@tlon/sigil-js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../api";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Chat } from "../../types";
import { daToDate } from "../../util";
import { ChatCard, ChatContainer, ChatList, ChatSection, ChatTitle, Conversation, MessageList, InputRow, Input, SendIcon, MessagePreview, CardReceiver, CardReceiverShip, ConversationReceiver, ConversationReceiverShip, ConversationAdTitle, CardAdTitle, ReceivedMessage, SentMessage, MessageText, MessageDate, CardUpperRow, ConversationUpperRow, ConversationBottomRow, MessageShip, ReceivedMessageBox, SigilContainer, EmptyListMessage, CardSigil, CardDate, GoBackIcon } from "./style";

export const Chats = () => {
    const [inputMessage, setInputMessage] = useState('');
    const chats = useAppSelector((state) => state.classifieds.data.chats);
    const [chatsToDisplay, setChatsToDisplay] = useState<Chat[]>();
    const [currentChat, setCurrentChat] = useState<Chat>();
    const navigate = useNavigate();

    const handleSendMessage = () => {
        if (inputMessage.trim().length == 0) return;

        api.poke(
            {
                app: 'classifieds',
                mark: 'classifieds-action',
                json: {
                    'send-message': {
                        'advertisement-id': currentChat!['advertisement-id'],
                        'to': currentChat?.receiver,
                        'text': inputMessage,
                    }
                },
            }
        );
        setInputMessage('');
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputMessage(value);
    }

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            handleSendMessage();
        }
    }

    useEffect(() => {
        window.addEventListener("popstate", handleChatClose);

        return () => {
            window.removeEventListener("popstate", () => { });
        }
    }, []);

    const handleChatOpen = (chat) => {
        window.history.pushState({ page: 'chat' }, '', '');
        setCurrentChat(chat);
    }

    const handleGoBackClick = () => {
        navigate(-1);
        handleChatClose();
    }

    const handleChatClose = () => {
        setCurrentChat(undefined);
    }

    useEffect(() => {
        if (currentChat) {
            let messageList = document.getElementById("messageList");
            if (messageList)
                messageList.scrollTop = messageList?.scrollHeight;
        }
    }, [currentChat]);

    useEffect(() => {
        if (chats) {
            setChatsToDisplay([...chats]);

            let newchat = [...chats].filter(chat => chat["advertisement-id"] == currentChat?.["advertisement-id"])[0];
            if (newchat) {
                setCurrentChat(newchat);

                setTimeout(() => {
                    let messageList = document.getElementById("detailsMessageList");
                    if (messageList) {
                        messageList.scrollTop = messageList?.scrollHeight!;
                        messageList.scrollIntoView(true);
                    }
                    scrollToTop();

                }, 100);
            }
        }
    }, [chats]);

    const scrollToTop = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    return (
        <ChatContainer >
            <ChatTitle>Chat</ChatTitle>
            {chatsToDisplay && chatsToDisplay.length > 0 ?
                <ChatSection>
                    <ChatList>
                        {chatsToDisplay.map((chat, index) =>
                            <ChatCard isActive={chat["advertisement-id"] == currentChat?.["advertisement-id"] ? true : false} key={index} onClick={() => handleChatOpen(chat)}>
                                <CardUpperRow>
                                    <CardReceiver>
                                        <CardSigil> {
                                            chat.receiver && chat.receiver.length <= 14 &&
                                            sigil({
                                                patp: chat.receiver,
                                                renderer: reactRenderer,
                                                size: 25,
                                                colors: ['white', 'black'],
                                            })
                                        }
                                        </CardSigil>
                                        <CardReceiverShip>
                                            {chat.receiver}
                                        </CardReceiverShip>
                                    </CardReceiver>
                                    <CardDate>
                                        {daToDate(chat.msgs[chat.msgs.length - 1].date!).fromNow()}
                                    </CardDate>
                                </CardUpperRow>
                                <CardAdTitle>{chat.title}</CardAdTitle>
                                <MessagePreview>
                                    {chat.msgs.slice(-1)[0].ship == '~' + api.ship ? 'You: ' : chat.receiver + ': '} {chat.msgs.slice(-1)[0].text}
                                </MessagePreview>
                            </ChatCard>
                        )
                        }
                    </ChatList>
                    {currentChat &&
                        <Conversation >
                            <GoBackIcon onClick={() => handleGoBackClick()}></GoBackIcon>
                            <ConversationUpperRow>
                                <ConversationReceiver>
                                    {
                                        currentChat.receiver && currentChat.receiver.length <= 14 &&
                                        sigil({
                                            patp: currentChat.receiver,
                                            renderer: reactRenderer,
                                            size: 20,
                                            colors: ['white', 'black'],
                                        })
                                    }
                                    <ConversationReceiverShip>
                                        {currentChat.receiver}
                                    </ConversationReceiverShip>
                                </ConversationReceiver>
                                <ConversationAdTitle>{currentChat.title}</ConversationAdTitle>
                            </ConversationUpperRow>
                            <MessageList id='messageList'>
                                {currentChat.msgs.map((msg, index) =>
                                    msg.ship == '~' + api.ship ?
                                        <SentMessage key={index}><MessageText>{msg.text}</MessageText><MessageDate>{daToDate(msg.date).fromNow()}</MessageDate></SentMessage>
                                        :
                                        <ReceivedMessage key={index}>
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
                            <ConversationBottomRow>
                                <InputRow>
                                    <Input placeholder="Type a message..." onChange={handleInputChange} onKeyPress={handleKeyPress} value={inputMessage} />
                                    <SendIcon onClick={handleSendMessage} />
                                </InputRow>
                            </ConversationBottomRow>
                        </Conversation>
                    }
                </ChatSection>
                :
                <EmptyListMessage>There are no chats to show.</EmptyListMessage>}
        </ChatContainer >
    );
}
