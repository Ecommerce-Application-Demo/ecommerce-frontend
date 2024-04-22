import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountDropdown from "../small-components/AccountDropdown";
import { useSelector } from "react-redux";
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

const Navbar = () => {
  const { isMobile } = useBreakpoints();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [showDropDown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const routeLocation = useLocation().pathname;

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const accountLogoRoute =
    routeLocation === "/login-signup" ||
    routeLocation === "/signup" ||
    routeLocation === "/login";

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
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            )}
            <Link className="navbar-logo-container" to="/">
              Desi Cart
            </Link>
          </div>
          <div className="right-side-mobile-navbar">
              <SearchLogo/>
              <Wishlist/>
              <Cart/>
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
          <div className="navbar-search-container">
            <input type="text" placeholder="what are you looking for?" />
            <SearchLogo />
          </div>
          <div className="navbar-right-container">
            <Link to="/wishlist">
              <div>
                <Wishlist />
              </div>
            </Link>
            <Link to="/cart">
              <div>
                <Cart />
              </div>
            </Link>

            {!accountLogoRoute && (
              <div
                className="navbar-account-logo-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {!showDropDown ? <AccountLogo /> : <AccountLogoActive />}
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
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
