import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    Briefcase, Trophy, GraduationCap, Code2, BookOpen, Award, Rocket, SparklesIcon, Users, MessageSquare
} from "lucide-react";

const Experience = () => {
    const navigate = useNavigate();

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
                    <section className="experience-section">
                        <div className="section-title">
                            <h1>My Journey</h1>
                            <p>From learning the foundations to leading teams - here's my professional and educational
                                experience</p>
                        </div>

                        <div className="timeline">
                            <div className="timeline-item right">
                                <div className="timeline-icon">
                                    <Briefcase size={20} />
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-date">Feb 2025 - Feb 2026</div>
                                    <h3 className="timeline-title">Team Leader</h3>
                                    <div className="timeline-subtitle">3jstech</div>
                                    <p className="timeline-description">
                                        Led development teams and managed project deliveries. Responsible for code reviews,
                                        team coordination, and ensuring best practices across multiple projects. Mentored
                                        junior developers and drove technical decisions. Successfully completed my tenure after delivering key projects and building strong team processes.
                                    </p>
                                    <div className="timeline-skills">
                                        <span className="skill-tag">Team Leadership</span>
                                        <span className="skill-tag">Project Management</span>
                                        <span className="skill-tag">Code Review</span>
                                        <span className="skill-tag">Mentoring</span>
                                        <span className="skill-tag">Full-Stack Development</span>
                                    </div>
                                    <div className="achievement-badge">
                                        <Trophy size={16} />
                                        Completed
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item left">
                                <div className="timeline-icon">
                                    <Users size={20} />
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-date">Nov 2025 - Present</div>
                                    <h3 className="timeline-title">Junior Community and Content Specialist</h3>
                                    <div className="timeline-subtitle">Apodissi</div>
                                    <p className="timeline-description">
                                        Managing community engagement and creating content strategies. Developing and implementing content plans across various platforms. Fostering community growth and maintaining brand presence through effective communication and engagement initiatives.
                                    </p>
                                    <div className="timeline-skills">
                                        <span className="skill-tag">Community Management</span>
                                        <span className="skill-tag">Content Strategy</span>
                                        <span className="skill-tag">Social Media</span>
                                        <span className="skill-tag">Communication</span>
                                        <span className="skill-tag">Brand Engagement</span>
                                    </div>
                                    <div className="achievement-badge">
                                        <MessageSquare size={16} />
                                        Currently Active
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item right">
                                <div className="timeline-icon">
                                    <GraduationCap size={20} />
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-date">2024 - Present</div>
                                    <h3 className="timeline-title">University Student</h3>
                                    <div className="timeline-subtitle">University of Ilorin</div>
                                    <p className="timeline-description">
                                        Currently pursuing my degree while balancing academic excellence with professional
                                        growth.
                                        Applying theoretical knowledge to real-world projects and continuously expanding my
                                        understanding of computer science fundamentals.
                                    </p>
                                    <div className="timeline-skills">
                                        <span className="skill-tag">Computer Science</span>
                                        <span className="skill-tag">Software Engineering</span>
                                        <span className="skill-tag">Algorithm Design</span>
                                        <span className="skill-tag">Data Structures</span>
                                        <span className="skill-tag">Academic Research</span>
                                    </div>
                                    <div className="achievement-badge">
                                        <BookOpen size={16} />
                                        In Progress
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item left">
                                <div className="timeline-icon">
                                    <Code2 size={20} />
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-date">Feb 2024 - Jun 2024</div>
                                    <h3 className="timeline-title">Full-Stack Development Bootcamp</h3>
                                    <div className="timeline-subtitle">MOAT Academy</div>
                                    <p className="timeline-description">
                                        Intensive bootcamp focusing on modern web development technologies that I started on
                                        February 12th, 2024. Gained hands-on experience with front-end and back-end development,
                                        working on real-world projects and learning industry best practices.
                                    </p>
                                    <div className="timeline-skills">
                                        <span className="skill-tag">JavaScript</span>
                                        <span className="skill-tag">React</span>
                                        <span className="skill-tag">Node.js</span>
                                        <span className="skill-tag">PHP</span>
                                        <span className="skill-tag">Laravel</span>
                                        <span className="skill-tag">MySQL</span>
                                        <span className="skill-tag">HTML/CSS</span>
                                    </div>
                                    <div className="achievement-badge">
                                        <Award size={16} />
                                        Certificate Earned
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item right">
                                <div className="timeline-icon">
                                    <Rocket size={20} />
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-date">2023</div>
                                    <h3 className="timeline-title">Programming Journey Begins</h3>
                                    <div className="timeline-subtitle">Self-Learning & Exploration</div>
                                    <p className="timeline-description">
                                        Started my journey into the world of programming and web development through self-study.
                                        Discovered my passion for creating digital solutions and built foundational knowledge
                                        that prepared me for formal training and professional opportunities.
                                    </p>
                                    <div className="timeline-skills">
                                        <span className="skill-tag">Problem Solving</span>
                                        <span className="skill-tag">Self-Learning</span>
                                        <span className="skill-tag">Web Fundamentals</span>
                                        <span className="skill-tag">Programming Logic</span>
                                        <span className="skill-tag">Online Resources</span>
                                    </div>
                                    <div className="achievement-badge">
                                        <SparklesIcon size={16} />
                                        The Beginning
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default Experience;