import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Home from '../../pages/Home';

const CustomRoute = ({ component: Component, isPrivate, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // If route is private and user is not logged in, redirect to login page
  if (isPrivate && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const pageTransition = {
    initial: { opacity: 0, scale: 3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 3 },
    transition: { ease: "easeOut", duration: 0.3 },
  };
  console.log(Component);
  return (
    <Route {...rest}>
      <motion.div {...pageTransition}>
        <Component />
      </motion.div>
    </Route>
    // <Route><Home/></Route>
  );
};

export default CustomRoute;
