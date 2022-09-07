import { reactRenderer, sigil } from "@tlon/sigil-js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { ChatCard, ChatContainer, ChatList, ChatSection, ChatTitle, Conversation, MessageList, InputRow, Input, SendIcon, MessagePreview, Date, CardReceiver, CardReceiverShip, ConversationReceiver, ConversationReceiverShip, ConversationAdTitle, CardAdTitle, ReceivedMessage, SentMessage, MessageText, MessageDate, CardUpperRow, ConversationUpperRow, ConversationBottomRow, MessageShip, ReceivedMessageBox, SigilContainer } from "./style";

export const Chat = () => {

    const [hardCodedChats, setHardCodedChats] = useState([{ ship: '~fidwed-sipwyn', msgs: [{ ship: '~harlys-forbec', date: moment.utc(), text: 'Can we have a chat about the ad that you just posted?' }], adTitle: 'myad2' },
    { ship: '~harlys-forbec', msgs: [{ ship: '~fidwed-sipwyn', date: moment.utc(), text: 'Hi there ' }, { ship: '~harlys-forbec', date: moment.utc(), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in nunc sed nulla varius sodales. Duis et nisi ac enim feugiat consequat. Etiam vitae efficitur nunc. Proin ut nisl diam. Fusce posuere ex eget eleifend rutrum.' }, { ship: '~harlys-forbec', date: moment.utc(), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in nunc sed nulla varius sodales. Duis et nisi ac enim feugiat consequat. Etiam vitae efficitur nunc. Proin ut nisl diam. Fusce posuere ex eget eleifend rutrum.' }], adTitle: 'myad1' },

    ]);
    const [currentChat, setCurrentChat] = useState(hardCodedChats[0]);
    const [inputMessage, setInputMessage] = useState();

    const handleSendMessage = () => {
        //poke the agent
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputMessage(value);
    }

    useEffect(() => {
        let messageList = document.getElementById("messageList")!;
        messageList.scrollTop = messageList?.scrollHeight!;
    }, [currentChat])

    return (
        <ChatContainer>
            <ChatTitle>Chats</ChatTitle>
            <ChatSection>
                <ChatList>
                    {hardCodedChats.map((chat, index) =>
                        <ChatCard key={index} onClick={() => setCurrentChat(chat)}>
                            <CardUpperRow>
                                <CardReceiver>
                                    {
                                        sigil({
                                            patp: chat.ship,
                                            renderer: reactRenderer,
                                            size: 20,
                                            colors: ['white', 'black'],
                                        })
                                    }
                                    <CardReceiverShip>
                                        {chat.ship}
                                    </CardReceiverShip>
                                </CardReceiver>
                                <Date>
                                    {chat.msgs[0].date.fromNow()}
                                </Date>
                            </CardUpperRow>
                            <CardAdTitle>{chat.adTitle}</CardAdTitle>
                            <MessagePreview>
                                {chat.msgs[0].text}
                            </MessagePreview>
                        </ChatCard>
                    )
                    }
                </ChatList>
                <Conversation>
                    <ConversationUpperRow>
                        <ConversationReceiver>
                            {
                                sigil({
                                    patp: currentChat.ship,
                                    renderer: reactRenderer,
                                    size: 20,
                                    colors: ['white', 'black'],
                                })
                            }
                            <ConversationReceiverShip>
                                {currentChat.ship}
                            </ConversationReceiverShip>
                        </ConversationReceiver>
                        <ConversationAdTitle>{currentChat.adTitle}</ConversationAdTitle>
                    </ConversationUpperRow>
                    <MessageList id='messageList'>
                        {currentChat.msgs.map((msg, index) =>
                            msg.ship == currentChat.ship ?
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
                    <ConversationBottomRow>
                        <InputRow>
                            <Input placeholder="Write your message" onChange={handleInputChange}></Input>
                            <SendIcon onClick={handleSendMessage} />
                        </InputRow>
                    </ConversationBottomRow>
                </Conversation>
            </ChatSection>
        </ChatContainer >
    );
}
