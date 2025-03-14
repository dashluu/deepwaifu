"use client"

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./bubble.css";

const Bubble = forwardRef(({ left, avatar, message }, ref) => {
    const messageText = message.content || message.text;
    const [text, setText] = useState(messageText);
    
    // Expose methods to parent through ref
    useImperativeHandle(ref, () => ({
        // Method to update the inner text of the bubble
        set innerHTML(newText) {
            setText(newText);
        },
        // Method to get the inner text
        get innerHTML() {
            return text;
        }
    }));

    return (
        <div className={`bubble rounded-xl w-fit max-w-[75%] ${left ? "left-bubble" : "right-bubble"}`}>
            <div className={`action-bar ${left ? "left-action-bar" : "right-action-bar"}`}>
                <img src={avatar} className="block h-7 rounded-full" alt="Avatar" />
            </div>
            <div ref={ref} className="text text-lg">{text}</div>
        </div>
    );
});

Bubble.displayName = 'Bubble';
export default Bubble;