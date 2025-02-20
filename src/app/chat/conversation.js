'use client'

import { useState, useEffect, useRef } from 'react';
import Bubble from "./bubble";
import "./conversation.css";

export default function Conversation({ character, user }) {
    const [bubbles, setBubbles] = useState([]);
    const conversation = {
        character: character,
        user: user,
        messages: [
            // Sample messages to test UI
            {
                id: 0,
                sender: character.name,
                receiver: user.name,
                text: `Hello ${user.name}`
            },
            {
                id: 1,
                sender: user.name,
                receiver: character.name,
                text: `Hello ${character.name}`
            }
        ]
    };
    const [messageId, setMessageId] = useState(conversation.messages.length);
    const lastBubble = useRef(null);

    function addMessage(message) {
        let left = message.sender === character.name;
        let avatar = left ? character.avatar : user.avatar;
        let bubble = <Bubble ref={lastBubble} key={message.id} left={left} avatar={avatar} id={message.id} message={message}></Bubble>;
        setBubbles(prevBubbles => [
            ...prevBubbles,
            bubble
        ]);
    }

    async function sendMessage(text) {
        try {
            const message = {
                id: messageId,
                sender: user.name,
                receiver: character.name,
                text: text
            };
            addMessage(message);
            setMessageId(prevId => prevId + 1);
            // Wait for a sec before responding
            await new Promise(resolve => setTimeout(resolve, 1000));
            const initialReply = {
                id: messageId + 1,
                sender: character.name,
                receiver: user.name,
                text: "Thinking..."
            };
            addMessage(initialReply);
            setMessageId(prevId => prevId + 1);
            const response = await fetch("http://localhost:8000/chat", {
                method: "post",
                body: JSON.stringify({ text: text }),
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                let replyText = "";
                for await (const chunk of response.body) {
                    for (const byte of chunk) {
                        replyText += String.fromCharCode(byte);
                        lastBubble.current.innerHTML = replyText;
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async function onSendMessage(e) {
        if (e.key === "Enter" && e.shiftKey) {
            // Shift + Enter == enters new line 
        } else if (e.key === "Enter") {
            // Enter alone sends the message
            e.preventDefault();
            const text = e.target.value;
            e.target.value = "";
            await sendMessage(text);
        }
    }

    useEffect(() => {
        // Load conversation history
        setBubbles(conversation.messages.map((message, index) => {
            let left = message.sender == character.name;
            let avatar = left ? character.avatar : user.avatar;
            return (
                <Bubble ref={lastBubble} key={index} left={left} avatar={avatar} id={index} message={message}></Bubble>
            );
        }));
    }, []);

    return (
        <div className="conversation-container w-full md:w-3/5 lg:w-3/5 mt-[5rem]">
            <div className="bubbles-container">
                {bubbles}
            </div>
            <div className="input-container w-full md:w-3/5 lg:w-3/5">
                <textarea className="w-full rounded-xl text-lg font-normal input bg-stone-900"
                    placeholder={`Message ${character.name}...`}
                    onKeyDown={(e) => { onSendMessage(e); }}></textarea>
            </div >
        </div>
    );
}