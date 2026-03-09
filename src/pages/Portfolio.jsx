import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ExternalLink, Github, Globe, Layers, Zap, Code2, ArrowUpRight, Filter
} from "lucide-react";

import ff from "../assets/ff.png";
import tixora from "../assets/tixora.png";
import tf from "../assets/tf.png";
import cp from "../assets/cp.png";
import paynix from "../assets/paynix.png";
import crypto from "../assets/crypto.png";

const projects = [
    {
        id: 1,
        title: "CryptoPulse",
        description: "CryptoPulse is a real-time cryptocurrency tracking dashboard that displays live prices, market trends, and key data for popular digital assets. It helps users quickly monitor the crypto market and stay updated on price movements and market activity.",
        tags: ["React", "Node.js", "Redis", "CryptoGecko API"],
        category: "Full-Stack",
        status: "Live",
        github: "https://github.com/roland-adams2007/cryptopulse",
        live: "https://cryptopulse-blush-ten.vercel.app/",
        image: crypto,
        accent: "#1e3a8a", // dark blue
    },
    {
        id: 2,
        title: "CreatorSpace",
        description: "A centralized workspace for creators and businesses to build, manage, and publish multiple websites — all from one powerful dashboard.",
        tags: ["React", "Node.js", "MySQL", "Framer Motion"],
        category: "Full-Stack",
        status: "Live",
        github: "https://github.com/roland-adams2007/CSpace",
        live: "https://creatorspace-wine.vercel.app/",
        image: cp,
        accent: "#a78bfa",
    },
    {
        id: 3,
        title: "FileFlow",
        description: "A cloud file storage platform similar to Cloudinary — upload, manage, and access your files from anywhere with a clean, minimal interface and fast delivery.",
        tags: ["React", "Node.js", "MySQL", "Tailwind CSS"],
        category: "Full-Stack",
        status: "Live",
        github: "https://github.com/roland-adams2007/fileflow",
        live: "https://fileflow-sable.vercel.app/",
        image: ff,
        accent: "#38bdf8",
    },
    {
        id: 4,
        title: "Tixora",
        description: "An event ticketing platform to discover, create, and manage events. Buy and sell tickets seamlessly with a smooth checkout experience.",
        tags: ["React", "PHP", "MySQL", "Tailwind CSS"],
        category: "Full-Stack",
        status: "Live",
        github: "https://github.com/roland-adams2007/tixora",
        live: "https://tixora.com.ng/",
        image: tixora,
        accent: "#f97316",
    },
    {
        id: 5,
        title: "TaskFlow",
        description: "The ultimate task management platform that helps teams collaborate, organize, and achieve more. Track projects, manage deadlines, and boost productivity.",
        tags: ["React", "Node.js", "MySQL"],
        category: "Full-Stack",
        status: "Live",
        github: "https://github.com/roland-adams2007/taskflow",
        live: "https://taskflow-nu-seven.vercel.app/",
        image: tf,
        accent: "#34d399",
    },
    {
        id: 6,
        title: "Paynix",
        description: "A modern online banking experience — manage your finances, send money, and track transactions through a sleek and intuitive interface.",
        tags: ["React", "PHP", "Framer Motion", "Tailwind CSS"],
        category: "Frontend",
        status: "Live",
        github: "https://github.com/roland-adams2007/paynix",
        live: "https://paynix-tau.vercel.app/",
        image: paynix,
        accent: "#fbbf24",
    },
];
const categories = ["All", "Full-Stack", "Frontend"];

const Portfolio = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState("All");
    const [hoveredId, setHoveredId] = useState(null);
    const [visibleCards, setVisibleCards] = useState([]);

    const filtered = activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    useEffect(() => {
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

        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    setVisibleCards((prev) => [...prev, entry.target.dataset.id]);
                }
            });
        }, observerOptions);

        const cards = document.querySelectorAll(".portfolio-card");
        cards.forEach((el) => observer.observe(el));

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

        const buttons = document.querySelectorAll(".hero__cta, .social-link, .portfolio-btn");
        buttons.forEach((button) => button.addEventListener("click", handleButtonClick));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            buttons.forEach((button) => button.removeEventListener("click", handleButtonClick));
            cards.forEach((el) => observer.unobserve(el));
            clearInterval(particleInterval);
        };
    }, [activeFilter]);

    const openLink = (url) => {
        if (url) window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <>
            <div className="wrapper">
                <main>
                    <section className="portfolio-section">
                        <div className="section-title">
                            <h1>My Work</h1>
                            <p>A curated collection of projects I've built — from full-stack platforms to open-source tools</p>
                        </div>

                        <div className="portfolio-filter">
                            <Filter size={16} className="filter-icon" />
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`filter-btn${activeFilter === cat ? " active" : ""}`}
                                    onClick={() => setActiveFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="portfolio-grid">
                            {filtered.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="portfolio-card"
                                    data-id={project.id}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onMouseEnter={() => setHoveredId(project.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <div className="card-thumbnail">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="card-image"
                                        />
                                        <div
                                            className="card-glow"
                                            style={{ background: project.accent, opacity: hoveredId === project.id ? 0.18 : 0 }}
                                        />
                                        <div className="card-status-badge" style={{ borderColor: project.accent, color: project.accent }}>
                                            <span className="status-dot" style={{ background: project.accent }} />
                                            {project.status}
                                        </div>
                                        <div className="card-overlay" style={{ opacity: hoveredId === project.id ? 1 : 0 }}>
                                            <div className="card-actions">
                                                {project.github && (
                                                    <button
                                                        className="portfolio-btn icon-btn"
                                                        onClick={() => openLink(project.github)}
                                                        title="View Source"
                                                    >
                                                        <Github size={18} />
                                                    </button>
                                                )}
                                                {project.live && (
                                                    <button
                                                        className="portfolio-btn icon-btn"
                                                        onClick={() => openLink(project.live)}
                                                        title="Live Demo"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="card-meta">
                                            <span className="card-category">
                                                <Layers size={12} />
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className="card-title">
                                            {project.title}
                                            <ArrowUpRight size={16} className="title-arrow" />
                                        </h3>

                                        <p className="card-description">{project.description}</p>

                                        <div className="card-tags">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="tech-tag" style={{ "--tag-accent": project.accent }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="card-footer">
                                            <button
                                                className="portfolio-btn view-btn"
                                                onClick={() => openLink(project.live || project.github)}
                                                style={{ "--btn-accent": project.accent }}
                                            >
                                                {project.live ? (
                                                    <><Globe size={14} /> View Live</>
                                                ) : (
                                                    <><Code2 size={14} /> View Code</>
                                                )}
                                            </button>
                                            {project.github && project.live && (
                                                <button
                                                    className="portfolio-btn ghost-btn"
                                                    onClick={() => openLink(project.github)}
                                                >
                                                    <Github size={14} /> Source
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="portfolio-cta">
                            <Zap size={20} />
                            <span>More projects on GitHub</span>
                            <button
                                className="portfolio-btn cta-btn"
                                onClick={() => openLink("https://github.com/roland-adams2007")}
                            >
                                <Github size={16} /> View GitHub Profile
                            </button>
                        </div>
                    </section>
                </main>
            </div>

            <style>{`
                .portfolio-section {
                    padding: 4rem 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .portfolio-filter {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin: 2rem 0 2.5rem;
                    flex-wrap: wrap;
                }

                .filter-icon {
                    color: rgba(147, 112, 219, 0.7);
                    margin-right: 0.25rem;
                }

                .filter-btn {
                    padding: 0.4rem 1rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: transparent;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: all 0.2s ease;
                    position: relative;
                    overflow: hidden;
                }

                .filter-btn:hover {
                    border-color: rgba(147, 112, 219, 0.5);
                    color: rgba(255, 255, 255, 0.9);
                }

                .filter-btn.active {
                    background: rgba(147, 112, 219, 0.2);
                    border-color: rgba(147, 112, 219, 0.7);
                    color: #fff;
                }

                .portfolio-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                    gap: 1.5rem;
                }

                .portfolio-card {
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.07);
                    background: rgba(255, 255, 255, 0.03);
                    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .portfolio-card.fade-in {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .portfolio-card:hover {
                    border-color: rgba(147, 112, 219, 0.3);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                    transform: translateY(-4px);
                }

                .card-thumbnail {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.4s ease;
                }

                .portfolio-card:hover .card-image {
                    transform: scale(1.04);
                }

                .card-glow {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }

                .card-status-badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    padding: 0.25rem 0.65rem;
                    border-radius: 20px;
                    border: 1px solid;
                    font-size: 0.72rem;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    background: rgba(0, 0, 0, 0.55);
                    backdrop-filter: blur(8px);
                    z-index: 3;
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .card-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.3s ease;
                    z-index: 4;
                    backdrop-filter: blur(4px);
                }

                .card-actions {
                    display: flex;
                    gap: 0.75rem;
                }

                .icon-btn {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }

                .icon-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.1);
                }

                .card-body {
                    padding: 1.25rem;
                }

                .card-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.6rem;
                }

                .card-category {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    font-size: 0.75rem;
                    color: rgba(147, 112, 219, 0.9);
                    font-weight: 500;
                    letter-spacing: 0.03em;
                }

                .card-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #fff;
                    margin: 0 0 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .title-arrow {
                    opacity: 0;
                    transform: translateX(-4px);
                    transition: all 0.2s ease;
                    color: rgba(147, 112, 219, 0.8);
                }

                .portfolio-card:hover .title-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                .card-description {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.55);
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .card-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.4rem;
                    margin-bottom: 1rem;
                }

                .tech-tag {
                    padding: 0.2rem 0.6rem;
                    border-radius: 6px;
                    font-size: 0.72rem;
                    font-weight: 500;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: rgba(255, 255, 255, 0.6);
                    transition: all 0.2s ease;
                }

                .tech-tag:hover {
                    background: rgba(var(--tag-accent), 0.1);
                    border-color: var(--tag-accent);
                    color: var(--tag-accent);
                }

                .card-footer {
                    display: flex;
                    gap: 0.6rem;
                }

                .view-btn {
                    flex: 1;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    background: rgba(147, 112, 219, 0.15);
                    border: 1px solid rgba(147, 112, 219, 0.4);
                    color: rgba(147, 112, 219, 1);
                    cursor: pointer;
                    font-size: 0.82rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                    transition: all 0.2s ease;
                    position: relative;
                    overflow: hidden;
                }

                .view-btn:hover {
                    background: rgba(147, 112, 219, 0.3);
                    border-color: rgba(147, 112, 219, 0.7);
                }

                .ghost-btn {
                    padding: 0.5rem 0.85rem;
                    border-radius: 8px;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                    font-size: 0.82rem;
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    transition: all 0.2s ease;
                    position: relative;
                    overflow: hidden;
                }

                .ghost-btn:hover {
                    border-color: rgba(255, 255, 255, 0.3);
                    color: rgba(255, 255, 255, 0.8);
                }

                .portfolio-cta {
                    margin-top: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px dashed rgba(147, 112, 219, 0.3);
                    background: rgba(147, 112, 219, 0.05);
                    color: rgba(255, 255, 255, 0.6);
                    flex-wrap: wrap;
                }

                .portfolio-cta svg {
                    color: rgba(147, 112, 219, 0.8);
                }

                .cta-btn {
                    padding: 0.55rem 1.25rem;
                    border-radius: 8px;
                    background: rgba(147, 112, 219, 0.2);
                    border: 1px solid rgba(147, 112, 219, 0.5);
                    color: #fff;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.2s ease;
                    position: relative;
                    overflow: hidden;
                }

                .cta-btn:hover {
                    background: rgba(147, 112, 219, 0.35);
                    transform: translateY(-1px);
                }

                @media (max-width: 640px) {
                    .portfolio-grid {
                        grid-template-columns: 1fr;
                    }
                    .portfolio-cta {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>
        </>
    );
};

export default Portfolio;