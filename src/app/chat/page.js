'use client'

import { useState, useEffect } from 'react';
import NavBar from './navbar';
import Conversation from './conversation';
import './page.css'
import Input from './input';
import MessageModel from '@/models/message-model';
import CharacterModel from '@/models/character-model';
import ConversationModel from '@/models/conversation-model';

export default function Chat() {
    const [messageUpdate, setMessageUpdate] = useState({ mode: 2, message: null });
    const character = new CharacterModel(
        "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        "Character",
        "Creator"
    );
    const characterObj = { ...character };
    const user = new CharacterModel(
        "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        "User",
        "User"
    );

    const conversation = new ConversationModel(character, user);

    conversation.messageList = [
        // new MessageModel(0, "Character", "User", "Hello world"),
        // new MessageModel(1, "Character", "User", "This is an example of a message"),
        // new MessageModel(2, "User", "Character", "This is an example of another message")
    ];

    async function sendMessage(text) {
        try {
            const response = await fetch("http://localhost:8000/chat", {
                method: "post",
                body: text,
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                const reply = new MessageModel(
                    conversation.messageList.length,
                    character.name,
                    user.name,
                    ""
                );
                setMessageUpdate(
                    (prev) => ({ mode: 0, message: { ...reply } }),
                    () => {
                        for await (const chunk of response.body) {
                            for (const byte of chunk) {
                                reply.text += String.fromCharCode(byte);
                                setMessageUpdate({ mode: 1, message: { ...reply } });
                            }
                        }
                    }
                )
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="chat-container">
            <NavBar character={characterObj}></NavBar>
            <Conversation conversation={{ ...conversation }} messageUpdate={messageUpdate}></Conversation>
            <Input character={characterObj} sendMessageCallback={sendMessage}></Input>
        </div >
    );
}