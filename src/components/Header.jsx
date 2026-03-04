import React, { useState, useEffect } from 'react';
import { Code, Home, User, Folder, Brain, Briefcase, Mail, Menu, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Function to determine if a link is active
    const isActiveLink = (path) => {
        if (path === '/' || path === '#home') {
            return location.pathname === '/' || location.hash === '#home';
        }
        if (path.startsWith('#')) {
            return location.hash === path;
        }
        return location.pathname === path;
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const header = document.querySelector('header');
            if (header) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                if (currentScrollY > 50) {
                    header.style.background = 'rgba(255, 255, 255, 0.35)';
                    header.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.25)';
                    header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                }
            }
            setLastScrollY(currentScrollY);
        };

        const handleClickOutside = (e) => {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            if (isMenuOpen && mobileMenuBtn && mobileMenu && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen, lastScrollY]);

    return (
        <header>
            <div className="header__inner">
                <div className="logo">
                    Roland Adams
                </div>
                <div className="header__nav">
                    <div className="header_nav_links">
                        <nav>
                            <Link
                                to="/"
                                className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
                            >
                                <Home size={16} />
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
                            >
                                <User size={16} />
                                About
                            </Link>
                            <Link
                                to="/portfolio"
                                className={`nav-link ${isActiveLink('/portfolio') ? 'active' : ''}`}
                            >
                                <Folder size={16} />
                                Portfolio
                            </Link>
                            <Link
                                to="/skills"
                                className={`nav-link ${isActiveLink('/skills') ? 'active' : ''}`}
                            >
                                <Brain size={16} />
                                Skills
                            </Link>
                            <Link
                                to="/experience"
                                className={`nav-link ${isActiveLink('/experience') ? 'active' : ''}`}
                            >
                                <Briefcase size={16} />
                                Experience
                            </Link>
                            <Link
                                to="/contact"
                                className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
                            >
                                <Mail size={16} />
                                Contact
                            </Link>
                        </nav>
                    </div>
                    <div className="header_nav_mobile_button" id="mobileMenuBtn" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        {isMenuOpen ? 'Close' : 'Menu'}
                    </div>
                </div>
                <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} id="mobileMenu">
                    <nav>
                        <Link to="/" className={`mobile-nav-link ${isActiveLink('/') ? 'active' : ''}`} onClick={closeMenu}>
                            <Home size={20} /> Home
                        </Link>
                        <Link to="/about" className={`mobile-nav-link ${isActiveLink('/about') ? 'active' : ''}`} onClick={closeMenu}>
                            <User size={20} /> About
                        </Link>
                        <Link to="/portfolio" className={`mobile-nav-link ${isActiveLink('/portfolio') ? 'active' : ''}`} onClick={closeMenu}>
                            <Folder size={20} /> Portfolio
                        </Link>
                        <Link to="/skills" className={`mobile-nav-link ${isActiveLink('/skills') ? 'active' : ''}`} onClick={closeMenu}>
                            <Brain size={20} /> Skills
                        </Link>
                        <Link to="/experience" className={`mobile-nav-link ${isActiveLink('/experience') ? 'active' : ''}`} onClick={closeMenu}>
                            <Briefcase size={20} /> Experience
                        </Link>
                        <Link to="/contact" className={`mobile-nav-link ${isActiveLink('/contact') ? 'active' : ''}`} onClick={closeMenu}>
                            <Mail size={20} /> Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
