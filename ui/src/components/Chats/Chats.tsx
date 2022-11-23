import { reactRenderer, sigil } from "@tlon/sigil-js";
import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useAppSelector } from "../../redux/hooks/hooks";
import { daToDate } from "../../util";
import { ChatCard, ChatContainer, ChatList, ChatSection, ChatTitle, MessagePreview, CardReceiver, CardReceiverShip, CardAdTitle, CardUpperRow, EmptyListMessage, CardSigil, CardDate } from "./style";

export const Chats = () => {

    const chats = useAppSelector((state) => state.classifieds.data.chats);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleChatOpen = (chat) => {
        navigate(chat["advertisement-id"]);
    };

    return (
        <ChatContainer >
            <ChatTitle>Chat</ChatTitle>
            {chats && chats.length > 0 ?
                <ChatSection>
                    <ChatList>
                        {chats.map((chat, index) =>
                            <ChatCard isActive={chat["advertisement-id"] == id} key={index} onClick={() => handleChatOpen(chat)}>
                                <CardUpperRow>
                                    <CardReceiver>
                                        <CardSigil> {
                                            chat.receiver && chat.receiver.length <= 14 &&
                                            sigil({
                                                patp: chat.receiver,
                                                renderer: reactRenderer,
                                                size: 20,
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
                    <Outlet />
                </ChatSection>
                :
                <EmptyListMessage>There are no chats to show.</EmptyListMessage>}
        </ChatContainer >
    );
}
