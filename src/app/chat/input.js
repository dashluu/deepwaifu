'use client'

import { useRef, useEffect } from 'react';
import "./input.css"

export default function Input({ character, sendMessageCallback }) {
    const inputRef = useRef(null);

    async function sendMessage(e) {
        if (e.key === "Enter" && e.shiftKey) {
            // Shift + Enter == enters new line 
        } else if (e.key === "Enter") {
            // Enter alone sends the message
            e.preventDefault();
            await sendMessageCallback(e.value);
        }
    }

    useEffect(() => {
        if (inputRef != null) {
            inputRef.addEventListener("keydown", function (e) { sendMessage(e); });
        }
    }, [inputRef]);

    return (
        <div className="input-container w-full md:w-3/4 lg:w-3/4">
            <textarea className="w-full rounded-xl text-lg font-normal input bg-stone-900"
                placeholder={`Message ${character.name}...`}
                ref={inputRef}></textarea>
        </div >
    )
}