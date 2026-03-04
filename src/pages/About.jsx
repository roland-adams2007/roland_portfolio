
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import me from "../assets/me.jpg";

import {
    Github, MessageCircle, Camera
} from "lucide-react";



const About = () => {
    const navigate = useNavigate();

    useEffect(() => {

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
                    <section className="about__section" id="about">
                        <div className="profile-container">
                            <div className="profile-picture" id="profilePicture">
                                <img src={me} alt="Roland Adams" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                <div className="profile-upload-overlay">
                                    <Camera size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="about__content">
                            <h1>About Me</h1>
                            <div className="about__subtitle">Full-Stack Developer & Creative Problem Solver</div>
                            <p>Hi, I'm Roland Adams, a passionate full-stack developer with a knack for turning ideas into
                                reality through code. With a strong foundation in both front-end and back-end technologies, I
                                specialize in building seamless, user-friendly applications that solve real-world problems.</p>
                            <p>My journey in tech began with a curiosity for how things work, which evolved into a love for
                                crafting elegant solutions. I thrive on challenges, whether it's optimizing performance,
                                designing intuitive interfaces, or integrating complex systems. My goal is to create impactful
                                digital experiences that make a difference.</p>
                            <p>When I'm not coding, you can find me exploring new technologies, contributing to open-source
                                projects, or enjoying a good cup of coffee while brainstorming my next big idea.</p>

                            <div className="about__buttons">
                                <button className="about__cta" onClick={() => openLink("https://github.com/roland-adams2007")}>
                                    <Github size={20} />
                                    View My GitHub
                                </button>
                                <button className="about__cta secondary" onClick={() => navigate('/contact')}>
                                    <MessageCircle size={20} />
                                    Contact Me
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

        </>
    )

}

export default About;