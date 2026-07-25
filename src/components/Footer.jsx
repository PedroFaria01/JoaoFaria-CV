import { useEffect, useRef } from 'react';
import { animateFooterIn } from '../utils/animations.js';
import './Footer.css';

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    animateFooterIn(footerRef.current);
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>
      <p>&copy; {new Date().getFullYear()} Joao Rodrigo Faria — Expert Tool Engineer</p>
    </footer>
  );
}

export default Footer;
