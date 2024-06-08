import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useBreakpoints from "./api/utilities/responsive";
import Navbar from "./components/Navbar";
import NavbarProductAdmin from "./components/navbar-product-admin";
import FooterPage from "./pages/footer-page";
import LoginPopupMobile from "./components/navbar/login-popup-mobile";
import SplashScreen from "./small-components/Splash-screen";
import Router from "./Router";
import { AnimatePresence, motion } from "framer-motion";
import CustomHeadroom from "./small-components/CustomHeadroom";
import Headroom from "react-headroom";
import SearchBar from "./components/SearchBar";

function App() {
  const routeParams = useLocation().pathname;
  const { isMobile } = useBreakpoints();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const {isDarkMode} = useSelector((state)=>state.theme);

  const routeValidationForLoginPopup = [
    "/login-signup",
    "/login",
    "/signup",
    "/otp-verification",
    '/products',
    '/my/dashboard'
  ].includes(routeParams);
  const footerValidation = (routeParams.includes('/my/dashboard') || routeParams.includes('/products')) && isMobile; 

  useEffect(() => {
    if (!isLoggedIn && isMobile && !routeValidationForLoginPopup) {
      setTimeout(() => {
        setOpenLoginPopup(true);
      }, 6000);
    }
  }, [isMobile, isLoggedIn, routeParams, routeValidationForLoginPopup]);

  useEffect(() => {
    setOpenLoginPopup(false);
  }, [routeParams]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
    setTimeout(() => {
      setSplashVisible(false);
    }, 2500);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {splashVisible ? (
        <SplashScreen />
      ) : (
        <div>
          {!routeParams.includes("/product-admin") && <Navbar />}
          {routeParams.includes("/product-admin") && <NavbarProductAdmin />}
          {isMobile && 
          <Headroom>
          <div className="mobile-search-bar-container">
            <SearchBar />
          </div>
          </Headroom>}
          {openLoginPopup && (
            <LoginPopupMobile setOpenLoginPopup={setOpenLoginPopup} />
          )}
          <Router />
          {!footerValidation && <FooterPage />}
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
