import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    Eye,
    MessageCircle,
    ChevronDown,
    Code2,
    Layout,
    Paintbrush,
    Server,
    Code,
    Settings,
    Github,
    Linkedin,
    Twitter,
    Mail,
} from "lucide-react";


const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof window !== "undefined" && window.lucide) {
            window.lucide.createIcons();
        }

        // Parallax effect for hero section
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector(".hero__section");
            const scrollIndicator = document.querySelector(".scroll-indicator");
            if (heroSection) {
                heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            if (scrollIndicator) {
                scrollIndicator.style.opacity = scrolled > 100 ? "0" : "0.7";
            }
        };
        window.addEventListener("scroll", handleScroll);
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                }
            });
        }, observerOptions);
        const animatedElements = document.querySelectorAll(
            ".skill-badge, .social-link"
        );
        animatedElements.forEach((el) => observer.observe(el));
        const createParticle = () => {
            const particle = document.createElement("div");
            particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(147, 112, 219, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: floatUp ${5 + Math.random() * 5}s linear forwards;
      `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 10000);
        };
        const particleInterval = setInterval(createParticle, 2000);

        // Ripple effect for buttons
        const handleButtonClick = (e) => {
            const button = e.currentTarget;
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            const ripple = document.createElement("span");
            ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
            button.style.position = "relative";
            button.style.overflow = "hidden";
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        };
        const buttons = document.querySelectorAll(".hero__cta, .social-link");
        buttons.forEach((button) => {
            button.addEventListener("click", handleButtonClick);
        });

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
            buttons.forEach((button) => {
                button.removeEventListener("click", handleButtonClick);
            });
            animatedElements.forEach((el) => observer.unobserve(el));
            clearInterval(particleInterval);
        };
    }, []);

    const openLink = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <>
  

            <div className="wrapper">
                <main>
                    <section className="hero__section" id="home">
                        <div className="hero__content">
                            <h1>Welcome to My Portfolio</h1>
                            <div className="hero__subtitle">
                                Full-Stack Developer & Creative Problem Solver
                            </div>
                            <p>
                                I'm Roland Adams, a passionate developer creating innovative
                                solutions and bringing ideas to life through code. Explore my
                                work and let's build something amazing together.
                            </p>
                            <div className="hero__buttons">
                                <button
                                    className="hero__cta"
                                    onClick={() => navigate("/portfolio")}
                                >
                                    <Eye size={16} />
                                    View My Work
                                </button>
                                <button
                                    className="hero__cta secondary"
                                    onClick={() => navigate("/contact")}
                                >
                                    <MessageCircle size={16} />
                                    Get In Touch
                                </button>
                            </div>
                            <div className="skills-preview">
                                <div className="skill-badge">
                                    <Code2 size={16} />
                                    JavaScript
                                </div>
                                <div className="skill-badge">
                                    <Layout size={16} />
                                    React
                                </div>
                                <div className="skill-badge">
                                    <Paintbrush size={16} />
                                    Tailwind CSS
                                </div>
                                <div className="skill-badge">
                                    <Server size={16} />
                                    Node.js
                                </div>
                                <div className="skill-badge">
                                    <Code size={16} />
                                    PHP
                                </div>
                                <div className="skill-badge">
                                    <Settings size={16} />
                                    Laravel
                                </div>
                            </div>
                            <div className="social-links">
                                <div
                                    className="social-link"
                                    onClick={() => openLink("https://github.com/roland-adams2007")}
                                >
                                    <Github size={20} />
                                </div>
                                <div
                                    className="social-link"
                                    onClick={() => openLink("https://www.linkedin.com/in/roland-adams-045965315")}
                                >
                                    <Linkedin size={20} />
                                </div>
                                <div
                                    className="social-link"
                                    onClick={() => openLink("https://x.com/R_coredev")}
                                >
                                    <Twitter size={20} />
                                </div>
                                <div
                                    className="social-link"
                                    onClick={() => openLink("mailto:adamsrolly7@gmail.com")}
                                >
                                    <Mail size={20} />
                                </div>
                            </div>
                        </div>
                        <div
                            className="scroll-indicator"
                            onClick={() => navigate("/about")}
                        >
                            <ChevronDown size={24} />
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Home;
