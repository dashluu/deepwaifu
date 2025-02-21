'use client'

import { useState, useEffect, useRef } from 'react';
import Bubble from "./bubble";
import "./conversation.css";

export default function Conversation({ ctxId, character, user }) {
    const [bubbles, setBubbles] = useState([]);
    const messageCounter = useRef(0);
    const lastBubble = useRef(null);

    function addMessage(message) {
        let left = message.sender === character.name;
        let avatar = left ? character.avatar : user.avatar;
        let bubble = <Bubble ref={lastBubble} key={messageCounter.current} left={left} avatar={avatar} message={message}></Bubble>;
        setBubbles(prevBubbles => [
            ...prevBubbles,
            bubble
        ]);
    }

    async function sendMessage(text) {
        try {
            const message = {
                ctx_id: ctxId,
                sender: user.name,
                receiver: character.name,
                text: text
            };
            messageCounter.current += 1;
            addMessage(message);
            // Wait for a sec before responding
            await new Promise(resolve => setTimeout(resolve, 1000));
            const initialReply = {
                sender: character.name,
                receiver: user.name,
                text: "Thinking..."
            };
            messageCounter.current += 1;
            addMessage(initialReply);
            const response = await fetch("http://localhost:8000/chat", {
                method: "post",
                body: JSON.stringify(message),
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
            } else {
                // TODO: handle error
                console.log(response);
            }
        } catch (error) {
            // TODO: handle error
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