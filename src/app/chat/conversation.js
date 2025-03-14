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
                sender: "user",
                receiver: "assistant",
                content: text
            };

            console.log("Sending message:", JSON.stringify(message));

            messageCounter.current += 1;
            addMessage({
                sender: user.name,
                receiver: character.name,
                text: text
            });

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

            if (!response.ok) {
                // Get the error details from the response
                const errorData = await response.json();
                console.error("Error details:", errorData);
                
                if (lastBubble.current) {
                    lastBubble.current.innerHTML = "Error: " + JSON.stringify(errorData);
                }
                return;
            }

            if (response.ok) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let replyText = "";

                try{
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        
                        const text = decoder.decode(value);
                        console.log("Received chunk:", text); // Debug log
                        
                        // Handle different response formats
                        if (text.includes("data: ")) {
                            // Handle SSE format
                            const lines = text.split("\n");
                            for (const line of lines) {
                                if (line.startsWith("data: ")) {
                                    const content = line.substring(6);
                                    if (content === "[DONE]") break;
                                    replyText += content;
                                }
                            }
                        } else {
                            // Handle raw text format
                            replyText += text;
                        }
                        
                        // Update the bubble's text if ref is available
                        if (lastBubble.current) {
                            lastBubble.current.innerHTML = replyText;
                        }
                    }
                } catch (error) {
                    console.error("Error reading response:", error);
                    if (lastBubble.current) {
                        lastBubble.current.innerHTML = "Error reading response: " + error.message;
                    }
                }
            } else {
                console.error("Request failed with status:", response.status);
                if (lastBubble.current) {
                    lastBubble.current.innerHTML = "Error: Failed to get response";
                }
            }
        } catch (error) {
            console.log("Error sending message:", error.message);
            // Update the message to show error
            if (lastBubble.current) {
                lastBubble.current.innerHTML = "Error: " + error.message;
            }
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