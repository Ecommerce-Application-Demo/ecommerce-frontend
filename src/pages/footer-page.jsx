import React from 'react';

const FooterPage = () => {
    const currentYear = new Date().getFullYear();
  return (
        <footer className='footer-main-container'>
            Copyright © {currentYear} Desicart. All rights reserved.
        </footer>
  );
};

export default FooterPage;
