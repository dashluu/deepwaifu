'use client'

import { useState, useEffect } from 'react';
import Bubble from "./bubble";
import "./conversation.css"

export default function Conversation({ conversation }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // TODO: load conversation history
        // setMessages(conversation.messages.map((message, index) => {
        //     let left = message.sender == conversation.character.name;
        //     let avatar = left ? conversation.character.avatar : conversation.user.avatar;
        //     return (
        //         <Bubble key={index} left={left} avatar={avatar} message={{ ...message }}></Bubble>
        //     );
        // }));
    }, []);

    useEffect(() => {
        if (messageUpdate.mode == 0) {
            // Only inserts a new message at the end
            let left = messageUpdate.message.sender == conversation.character.name;
            let avatar = left ? conversation.character.avatar : conversation.user.avatar;
            setMessageList([
                ...messageList,
                <Bubble key={messageList.length} left={left} avatar={avatar} message={messageUpdate.message} messageUpdate={messageUpdate}></Bubble>
            ]);
        } else if (messageUpdate.mode == 2) {
            // Rerender the whole chat history
            setMessages(conversation.messages.map((message, index) => {
                let left = message.sender == conversation.character.name;
                let avatar = left ? conversation.character.avatar : conversation.user.avatar;
                return (
                    <Bubble key={index} left={left} avatar={avatar} message={{ ...message }}></Bubble>
                );
            }));
        }
    }, [messageUpdate.mode]);

    return (
        <div className="conversation-container w-full md:w-3/4 lg:w-3/4 mt-[8rem] sm:mt-[5rem] md:mt-[5rem] lg:mt-[5rem]">
            {messageList}
        </div>
    );
}