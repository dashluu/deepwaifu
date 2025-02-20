'use client'

import { useRef, useEffect } from 'react';
import Character from './character';
import './navbar.css';
import { useRouter } from 'next/navigation';

export default function NavBar({ character }) {
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

    return (
        <div className="navbar flex items-center w-full gap-4" ref={navbarRef}>
            <div className="flex-shrink-0">
                <img src="/deepwaifu.png" alt="DeepWaifu" className="h-7 w-auto logo"
                    onClick={function () { router.push("/"); }} />
            </div>
            <Character character={character}></Character>
        </div>
    );
}