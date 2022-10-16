import { sigil, reactRenderer } from "@tlon/sigil-js";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { sendMessage } from "../../../redux/slices/classifiedsSlice";
import { Chat } from "../../../types";
import { daToDate, getAdById, scrollDetailsToTop } from "../../../util";
import { GoBackIcon } from "../style";
import { ConversationWrapper, Conversation, ConversationUpperRow, ConversationReceiver, ConversationReceiverShip, ConversationAdTitle, MessageList, SentMessage, MessageText, MessageDate, ReceivedMessage, SigilContainer, ReceivedMessageBox, ConversationBottomRow, InputRow, Input, SendIcon } from "./style";

export const DetailsConversation = () => {
    const { id } = useParams();
    const advertisement = getAdById(id);

    const [inputMessage, setInputMessage] = useState('');
    const [chat, setChat] = useState<Chat | undefined>();
    const chats = useAppSelector((state) => state.classifieds.data.chats);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputMessage(value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim().length == 0) return;
        if (!advertisement) return;
        dispatch(sendMessage({ 'advertisement-id': advertisement.id, to: advertisement.ship, text: inputMessage }));
        setInputMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            handleSendMessage();
        }
    }

    const handleChatCloseClick = () => {
        navigate(-1);
        scrollDetailsToTop();

        let detailsBackground = document.getElementById("detailsBackground");
        if (detailsBackground) {
            detailsBackground.removeEventListener("click", () => { });
            detailsBackground.removeEventListener("click", () => { });
        }
    };

    useEffect(() => {
        if (chats && advertisement) {
            let newchat = [...chats].filter(chat => chat["advertisement-id"] == advertisement.id)[0];
            setChat(newchat);

            setTimeout(() => {
                let messageList = document.getElementById("detailsMessageList");
                if (messageList) {
                    messageList.scrollTop = messageList?.scrollHeight!;
                    messageList.scrollIntoView(true);
                }
            }, 100);
        }
    }, [chats]);

    return (
        advertisement && <ConversationWrapper>
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
    )

}

