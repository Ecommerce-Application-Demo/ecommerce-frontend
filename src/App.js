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

function App() {
  const routeParams = useLocation().pathname;
  const { isMobile } = useBreakpoints();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  // Save theme preference to localStorage whenever it's toggled
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const routeValidationForLoginPopup = [
    "/login-signup",
    "/login",
    "/signup",
    "/otp-verification",
  ].includes(routeParams);

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
    setTimeout(() => {
      setSplashVisible(false);
    }, 2500);
  }, []);

  const handleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
  };

  return (
    <AnimatePresence mode="wait">
      {splashVisible ? (
        <SplashScreen />
      ) : (
        <div>
          {!routeParams.includes("/product-admin") && <Navbar />}
          {routeParams.includes("/product-admin") && <NavbarProductAdmin />}
          {openLoginPopup && (
            <LoginPopupMobile setOpenLoginPopup={setOpenLoginPopup} />
          )}
          <Router />
          <p onClick={handleDarkMode}>toggle</p>
          <FooterPage />
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
