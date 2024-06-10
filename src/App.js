import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { enableFooterAction, enableNavbarAction, enableSearchbarAction } from "./redux/Slices/Theme/themeSlice";
import NetworkStatus from "./small-components/NetworkStatus";

function App() {
  const routeParams = useLocation().pathname;
  const dispatch = useDispatch();
  const { isMobile } = useBreakpoints();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const {isDarkMode, enableFooter, enableNavbar, enableSearchbar} = useSelector((state)=>state.theme);

  const routeValidationForLoginPopup = [
    "/login-signup",
    "/login",
    "/signup",
    "/otp-verification",
    '/products',
    '/my/dashboard'
  ].includes(routeParams);
  
  const footerRoute = [
    '/my/dashboard',
    '/products',
    '/checkout/cart'
  ].includes(routeParams);

  const footerValidation = footerRoute && isMobile;
  const navbarValidation = ["/product-admin", "/checkout/cart", '/checkout/payment'] .includes(routeParams);
  useEffect(()=>{
    dispatch(enableFooterAction(!footerValidation));
    dispatch(enableNavbarAction(!navbarValidation));
    dispatch(enableSearchbarAction(isMobile && !navbarValidation));
  },[footerValidation, routeParams, isMobile]);

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
        <NetworkStatus>
          {enableNavbar && <Navbar />}
          {routeParams.includes("/product-admin") && <NavbarProductAdmin />}
          {enableSearchbar && 
          <Headroom>
          <div className="mobile-search-bar-container">
            <SearchBar />
          </div>
          </Headroom>}
          {/* {openLoginPopup && (
            <LoginPopupMobile setOpenLoginPopup={setOpenLoginPopup} />
          )} */}
          <Router />
          {enableFooter && <FooterPage />}
        </NetworkStatus>
      )}
    </AnimatePresence>
  );
}

export default App;
