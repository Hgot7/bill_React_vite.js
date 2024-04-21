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


    // sidebar-responsive In 1060px
    const [showSidebar, setShowSidebar] = useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            const sidebarResponsive = document.body.querySelector(".sidebar-responsive");
            if (!sidebarResponsive.contains(event.target) && showSidebar) {
                setShowSidebar(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSidebar]);

    useEffect(() => {
        const sidebarResponsive = document.body.querySelector(".sidebar-responsive");
        const storedToggleState = localStorage.getItem('toggleSidebarState');
        if (storedToggleState === "true") { // เปรียบเทียบกับ "true" ไม่ใช่ true
            sidebarResponsive.style.display = "none";
        } else {
            sidebarResponsive.style.display = showSidebar ? "block" : "none";
        }
    }, [showSidebar]);

    return (
        <header ref={headerProfileRef} className={`headerprofile ${isToggleSidebar ? 'close' : ''}`}>

            <div className='showsidebar'>
                <i id='showsidebar-toggle' class="bi bi-list-ul" onClick={() => setShowSidebar(!showSidebar)}></i>
            </div>
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
