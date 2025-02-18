"use client"

import { forwardRef } from "react";
import "./bubble.css";

const Bubble = forwardRef(({ left, avatar, message }, ref) => {
    return (
        <div className={`bubble rounded-xl w-fit max-w-[75%] ${left ? "left-bubble" : "right-bubble"}`}>
            <div className={`action-bar ${left ? "left-action-bar" : "right-action-bar"}`}>
                <img src={avatar} className="block h-7 rounded-full" />
            </div>
            <div ref={ref} className="text text-lg">{message.text}</div>
        </div>
    );
});

Bubble.displayName = 'Bubble';
export default Bubble;