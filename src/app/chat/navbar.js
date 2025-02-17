'use client'

import { useRef, useEffect } from 'react';
import Character from './character';
import './navbar.css'

export default function NavBar({ character }) {
    const navbarRef = useRef(null);

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
        <div className="navbar" ref={navbarRef}>
            <Character character={character}></Character>
        </div>
    );
}