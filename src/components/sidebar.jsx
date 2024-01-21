import React, { useState } from 'react';
import Logo from '../images/logo.png'

function sidebar() {

  const IMAGES = {
    image1: new URL('../images/logo.png', import.meta.url).href,
    image2: new URL('../images/logo.png', import.meta.url).href,
  }

  const [isDarkMode, setIsDarkMode] = useState(false); {/*  isDarkMode = false because setState ไว้*/ }
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
    // light mode and Dark mode change Text message
    var LightMode = document.body.querySelector(".mode-text"); {/* text mode light mode */ }
    if (document.body.classList.contains("dark")) {
      LightMode.innerText = "Light Mode";
    } else {
      LightMode.innerText = "Dark Mode";
    }
  };

// action after that click ToggleSidebar
  const [isToggleSidebar, setIsToggleSidebar] = useState(false); {/* Togglesidebar */ }
  const handleSidebarToggle = () => {
    setIsToggleSidebar(!isToggleSidebar);
    var searchInput = document.getElementById("searchInput"); {/* display search input */ }
    if (!isToggleSidebar) {
      searchInput.style.display = "none";
    } else {
      searchInput.style.display = "block";
    }
  };

  // click searchbox

  const [isToggleSearchbox, setIsToggleSearchbox] = useState(false); {/* ToggleSearchbox */ }
  const handleSearchboxToggle = () => {
    setIsToggleSearchbox(!isToggleSearchbox);
    setIsToggleSidebar(false);
    var sidebar = document.body.querySelector(".sidebar"); {/* text mode light mode */ }
    var searchInput = document.getElementById("searchInput"); {/* display search input */ }
    sidebar.classList.remove("close");
    searchInput.style.display = "block";

  };



  return (

    <nav className={`sidebar${isToggleSidebar ? ' close' : ''}`}>
      <header>
        <div className="imagelogo">
          <span className="image">
            <img src={IMAGES.image2} alt="logo" />
          </span>
          <div className="text header-text">
            <span className="name">Bill Payment</span>
            <span className="profession">Apartment Due</span>
          </div>
        </div>
        <i class="bi bi-chevron-right toggle" onClick={handleSidebarToggle}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box" onClick={handleSearchboxToggle}>
            <i class="bi bi-search icon"></i>
            <input type="search" id='searchInput' placeholder='Search...' />
          </li>
          <ul className="menu-link">
            <li className="nav-link">
              <a href="#">
                <i class="bi bi-house-fill icon"></i>
                <span className="text nav-text">Dashboard</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i class="bi bi-credit-card icon"></i>
                <span className="text nav-text">Payment</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i class="bi bi-clipboard-data icon"></i>
                <span className="text nav-text">Report</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i class="bi bi-alarm icon"></i>
                <span className="text nav-text">Timezone</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i class="bi bi-app-indicator icon"></i>
                <span className="text nav-text">Indicator</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i class="bi bi-wallet2 icon"></i>
                <span className="text nav-text">Wallet</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="logout">
            <a href="#">
              <i class="bi bi-box-arrow-left icon"></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>
          <li className="mode">
            <div className="moon-sun">
              <i class="bi bi-moon-stars icon moon"></i>
              <i class="bi bi-sun icon sun"></i>
            </div>
            <span className="mode-text text">Dark Mode</span>
            <div className="toggle-switch" onClick={handleDarkModeToggle}>
              <span className={`switch ${isDarkMode ? 'dark' : ''}`}></span> {/* // true ทำ */}
            </div>
          </li>

        </div>
      </div>
    </nav>

  )
}

export default sidebar