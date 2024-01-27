import React, { useState, useRef, useEffect } from 'react';

function Header() {
    const [isToggleSidebar, setIsToggleSidebar] = useState(false);
    const headerProfileRef = useRef(null); //สร้าง ref ชื่อ headerProfileRef เพื่อใช้ในการเก็บ reference ของ Element ที่ได้จาก header Component.                               
    useEffect(() => {
        const toggle = document.body.querySelector(".toggle");
        const searchInput = document.body.querySelector(".search-box"); {/* text mode light mode */ }

        const handleToggleClick = () => {
            setIsToggleSidebar(!isToggleSidebar);
        };
        const handleSearchboxClick = () => {  // check ก่อนว่า isToggleSidebar เป็น ture หรือไหมให้ทำการเปลี่ยน state
            if (isToggleSidebar) {
                setIsToggleSidebar(!isToggleSidebar);
            }
        };
        toggle.addEventListener("click", handleToggleClick);
        searchInput.addEventListener("click", handleSearchboxClick);

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
