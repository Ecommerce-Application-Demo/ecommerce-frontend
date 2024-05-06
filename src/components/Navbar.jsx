import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountDropdown from "../small-components/AccountDropdown";
import { useDispatch, useSelector } from "react-redux";
import useBreakpoints from "../api/utilities/responsive";
import {
  DesiCartIcon,
  SearchLogo,
  Wishlist,
  Cart,
  AccountLogo,
  AccountLogoActive,
} from "../assets/icons";
import SideNavbar from "./navbar/sidebar";
import { FaBars } from "react-icons/fa";
import Sidebar from "./navbar/sidebar";
import userApi from "../api/asyncThunk/userApi";
import ThemeToggle from "../small-components/ThemeToggle";

const Navbar = () => {
  const user = useSelector((state)=>{return state.user});
  const { isDarkMode } = useSelector((state)=>state.theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {logout} = userApi;
  const {
    isLoggedIn,
    loggedInUserName,
    refreshToken,
  } = user;

  const { isMobile } = useBreakpoints();
  const [showDropDown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const routeLocation = useLocation().pathname;
  const accountLogoRoute =
    routeLocation === "/login-signup" ||
    routeLocation === "/signup" ||
    routeLocation === "/login";
  console.log(isMobile, 'isMobileNavbar');


  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  console.log(isDarkMode);
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div className="navbar-container">
      {isMobile && (
        <div className="navbar-section-mobile-container">
          <div className="left-side-mobile-navbar">
            <FaBars
              className="mobile-menu-icon"
              onClick={handleToggleSidebar}
            />
            {sidebarOpen && (
              <SideNavbar
                dispatch = { dispatch }
                isLoggedIn = { isLoggedIn }
                loggedInUserName = { loggedInUserName }
                logout = { logout }
                navigate = { navigate }
                setSidebarOpen = { setSidebarOpen }
                sidebarOpen = { sidebarOpen }
              />
            )}
            <Link className="navbar-logo-container" to="/">
              Desi Cart
            </Link>
          </div>
          <div className="right-side-mobile-navbar">
              {/* <SearchLogo/> */}
                <Wishlist stroke={isDarkMode ? 'white' : 'black'}/>
              <Cart stroke={isDarkMode ? 'white' : 'black'}/>
            <ThemeToggle />
          </div>
        </div>
      )}
      {!isMobile && (
        <>
          <Link className="navbar-logo-container" to="/">
            <DesiCartIcon />
          </Link>
          <div className="navbar-section-container">
            <Link className="navbar-section-link">MEN</Link>
            <Link className="navbar-section-link">WOMEN</Link>
            <Link className="navbar-section-link">KIDS</Link>
            <Link className="navbar-section-link">FOOTWEAR</Link>
          </div>
          <div className="navbar-right-container">
            <Link to="/wishlist">
              <div>
                <Wishlist stroke={isDarkMode ? 'white' : 'black'}/>
              </div>
            </Link>
            <Link to="/cart">
              <div>
              <Cart stroke={isDarkMode ? 'white' : 'black'}/>
              </div>
            </Link>

            {!accountLogoRoute && (
              <div
                className="navbar-account-logo-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {!showDropDown ? <AccountLogo color={isDarkMode ? 'white': 'black'}/> : <AccountLogoActive />}
                {showDropDown && (
                  <div
                    className="navbar-account-dropdown-wrapper"
                    onMouseEnter={handleMouseEnter}
                  >
                    <AccountDropdown />
                  </div>
                )}
              </div>
            )}
            <ThemeToggle />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
