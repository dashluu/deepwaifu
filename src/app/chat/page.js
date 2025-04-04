'use client'

import NavBar from './navbar';
import Conversation from './conversation';
import './page.css';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Chat() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [character, setCharacter] = useState({
        avatar: "/characters/placeholder1.avif",
        name: ""
    });

    async function auth() {
        try {
            const response = await fetch("http://localhost:8000/auth", {
                method: "post",
                body: JSON.stringify({ ctx_id: id }),
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                const data = await response.json();
                setCharacter({
                    avatar: data["avatar"],
                    name: data["name"]
                });
            } else {
                // TODO: handle error
                console.log(response);
            }
        } catch (error) {
            // TODO: handle error
            console.log(error.message);
        }
    }

    useEffect(() => {
        auth();
    }, []);

    const user = {
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        name: "User",
        creator: "User"
    };

    return (
        <div className="chat-container">
            <NavBar ctxId={id} character={character}></NavBar>
            <Conversation ctxId={id} character={character} user={user}></Conversation>
        </div >
    );
}