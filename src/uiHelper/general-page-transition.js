import React from 'react'
import {motion} from 'framer-motion';
const PageTransition = ({children}) => {

    const pageTransition = {
        initial: { opacity: 0,scale:3 },
        animate: { opacity: 1, scale:1 },
        exit: { opacity: 0, scale:3 },
        transition: { ease: "easeOut", duration: 0.3 },
      };

      return (
        <motion.div {...pageTransition}>
            {children}
        </motion.div>
      )
    
}

export default PageTransition;