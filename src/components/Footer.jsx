import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {currentYear} Roland Adams. Crafted with passion and code.</p>
      </div>
    </footer>
  );
};

export default Footer;
