
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {

    Github,
    Linkedin,
    Twitter,
    Mail,
    Calendar,
    PhoneCall
} from "lucide-react";

const Contact = () => {
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
                    <section className="contact__section" id="contact">
                        <div className="contact__content">
                            <h1>Get In Touch</h1>
                            <p>I'm excited to connect and discuss your next project or idea. Reach out through any of the
                                channels below, and I'll get back to you promptly.</p>
                            <div className="contact__info">
                                <div className="contact__item" onClick={() => openLink("mailto:adamsrolly7@gmail.com")}>
                                    <Mail size={20} />
                                    adamsrolly7@gmail.com
                                </div>
                                <div className="contact__item" onClick={() => openLink(('tel:+2347043507082'))}>
                                    <PhoneCall size={20} />
                                    +234 704 350 7082
                                </div>
                                <div className="contact__item" onClick={() => openLink('https://calendly.com/adamsrolly7')}>
                                    <Calendar size={20} />
                                    Schedule a Call
                                </div>
                            </div>
                            <div className="social-links">
                                <div className="social-link" onClick={() => openLink("https://github.com/roland-adams2007")}>
                                    <Github size={20} />
                                </div>
                                <div className="social-link" onClick={() => openLink("https://www.linkedin.com/in/roland-adams-045965315")}>
                                    <Linkedin size={20} />
                                </div>
                                <div className="social-link" onClick={() => openLink("https://x.com/R_coredev")}>
                                    <Twitter size={20} />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

        </>
    )

}

export default Contact;