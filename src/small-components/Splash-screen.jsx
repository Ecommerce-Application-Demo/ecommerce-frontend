import React, { useEffect } from "react";
import { DesiCartIconForLoading } from "../assets/icons";
import { AnimatePresence, motion } from "framer-motion";
import useBreakpoints from "../api/utilities/responsive";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../api/asyncThunk/userApi";
import { authenticateErrorHandler } from "../api/utilities/helper";
import { useLocation } from "react-router-dom";

const SplashScreen = () => {
    const dispatch = useDispatch();
    const route = useLocation().pathname;
    const {isMobile} = useBreakpoints();
    const {isDarkMode} = useSelector((state)=>state.theme);
    const jwt = localStorage.getItem("JWT") || null;
    useEffect(()=>{
      if (jwt && route=== '/') {
        dispatch(userApi.authenticateCall()).unwrap()
        .then(()=>{})
        .catch((error)=>{
          if (error?.name === 'CustomError') {
            authenticateErrorHandler(dispatch, error);
          }
        })
      }
    },[]);

    return (
      <motion.div
        className="splash-screen-container"
        exit={{ opacity: 0 }} // Apply exit animation when component is removed
      >
        <div className="splashScreen-wrapper">
          <motion.div
            className="icon-container"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            exit={{ scale: 5, duration: 0.1 }} 
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ ease: "anticipate", duration: 1, repeat: 0, delay:0.3 }}
            >
              <DesiCartIconForLoading />
            </motion.div>
          </motion.div>
          <motion.h2
            className="text-container"
            initial={{ opacity: 0, x:-100 }}
            animate={{ opacity: 1, x:0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 0.8 }}
            exit={{ opacity: 0 }}
          >
            DesiCart
          </motion.h2>
        </div>
      </motion.div>
    );
  };
  
  export default SplashScreen;
  