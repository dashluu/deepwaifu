'use client'

import { useRef, useEffect } from 'react';
import Character from './character';
import './navbar.css';
import { useRouter } from 'next/navigation';

export default function NavBar({ ctxId, character }) {
    const navbarRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (navbarRef.current) {
            if (window.scrollY < navbarRef.current.offsetTop) {
                navbarRef.current.classList.remove("navbar-sticky");
            } else {
                navbarRef.current.classList.add("navbar-sticky");
            }
        }
    });

    async function deleteChat() {
        try {
            const response = await fetch("http://localhost:8000/delete-chat", {
                method: "delete",
                body: JSON.stringify({ ctx_id: ctxId }),
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                router.push("/");
            } else {
                // TODO: handle error
                console.log(response);
            }
        } catch (error) {
            // TODO: handle error
            console.log(error.message);
        }
    }

    return (
        <div className="navbar flex items-center w-full gap-4" ref={navbarRef}>
            <div className="flex-shrink-0">
                <img src="/deepwaifu.png" alt="DeepWaifu" className="h-7 w-auto logo"
                    onClick={function () { deleteChat(); }} />
            </div>
            <Character character={character}></Character>
        </div>
    );
}