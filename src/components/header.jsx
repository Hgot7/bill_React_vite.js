import React, { useState, useRef, useEffect } from 'react';

function Header() {
    const [isToggleSidebar, setIsToggleSidebar] = useState(false);
    const headerProfileRef = useRef(null);

    useEffect(() => {
        const toggle = document.body.querySelector(".toggle");
        const searchInput = document.body.querySelector(".search-box");

        const handleToggleClick = () => {
            setIsToggleSidebar(!isToggleSidebar);
            localStorage.setItem('toggleSidebarState', JSON.stringify(!isToggleSidebar));
        };

        const handleSearchboxClick = () => {
            if (isToggleSidebar) {
                setIsToggleSidebar(!isToggleSidebar);
                localStorage.setItem('toggleSidebarState', JSON.stringify(!isToggleSidebar));
            }
        };

        toggle.addEventListener("click", handleToggleClick);
        searchInput.addEventListener("click", handleSearchboxClick);

        const storedToggleState = localStorage.getItem('toggleSidebarState');
        if (storedToggleState !== null) {
            setIsToggleSidebar(JSON.parse(storedToggleState));
        }

        return () => {
            toggle.removeEventListener("click", handleToggleClick);
            searchInput.removeEventListener("click", handleSearchboxClick);
        };
    }, [isToggleSidebar]);

    return (
        <header ref={headerProfileRef} className={`headerprofile ${isToggleSidebar ? 'close' : ''}`}>
            <a className='navbarname' href="#">Bill Payment</a>
            <nav>
                <ul className="nav_link">

                    <li><i class="bi bi-envelope"></i></li>
                    <li><i class="bi bi-bell"></i></li>

                </ul>
            </nav>
            <div className="border"></div>
            <div className="profilelogo">
                <i className="bi bi-person-circle icon"></i>
                <div className="text header-text">
                    <span className="firstname">Natchapon</span>
                    <span className="role">Admin</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
