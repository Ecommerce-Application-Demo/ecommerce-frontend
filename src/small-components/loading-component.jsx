import React from 'react';
import { DesiCartIconForLoading } from '../assets/icons';
import { motion } from 'framer-motion';

const LoadingComponent = ({size}) => {
  return (
    <div className='LoadingComponent'>
      <motion.div
        animate={{ rotate: [0, 270, 500, 600],
            opacity:[0, 0.5, 1, 0.5]
         }}
        transition={{ repeat: Infinity, repeatType: "loop", ease: "easeInOut", duration: 1.3 }}
      >
        <DesiCartIconForLoading size={size}/>
      </motion.div>
    </div>
  );
}

export default LoadingComponent;
