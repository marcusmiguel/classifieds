import { reactRenderer, sigil } from "@tlon/sigil-js";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { sendMessage } from "../../../redux/slices/classifiedsSlice";
import { daToDate, scrollToTop } from "../../../util";
import { Conversation, ConversationAdTitle, ConversationBottomRow, ConversationReceiver, ConversationReceiverShip, ConversationUpperRow, GoBackIcon, Input, InputRow, MessageDate, MessageList, MessageText, ReceivedMessage, ReceivedMessageBox, SendIcon, SentMessage, SigilContainer } from "./style"

export const ChatsConversation = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const chats = useAppSelector((state) => state.classifieds.data.chats);
    const currentChat = chats?.filter(x => x["advertisement-id"] == id)[0];
    const dispatch = useAppDispatch();
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim().length == 0) return;
        if (!currentChat) return;
        dispatch(sendMessage({ 'advertisement-id': currentChat['advertisement-id'], to: currentChat.receiver, text: inputMessage }));
        setInputMessage('');
        scrollToTop();
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputMessage(value);
    }

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (currentChat) {
                setInputMessage('');
                let messageList = document.getElementById("messageList");
                if (messageList)
                    messageList.scrollTop = messageList?.scrollHeight;
            }
        }, 100);
    }, [currentChat]);

    return (
        <>
            {currentChat &&
                <Conversation >
                    <GoBackIcon onClick={() => navigate(-1)}></GoBackIcon>
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
                </Conversation>}
        </>
    )
}