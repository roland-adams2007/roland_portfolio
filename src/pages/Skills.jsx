import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    Briefcase,
    Trophy,
    GraduationCap,
    Code2,
    BookOpen,
    Award,
    Rocket,
    SparklesIcon,
} from "lucide-react";

const Skills = () => {
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

    // Function to map skill level to progress bar width
    const getProgressWidth = (level) => {
        switch (level) {
            case "Expert":
                return "95%";
            case "Advanced":
                return "85%";
            case "Intermediate":
                return "75%";
            default:
                return "50%"; // Fallback for any unexpected level
        }
    };

    return (
        <>
            <Helmet>
                <title>Skills - Roland Adams</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="Portfolio of Roland Adams, a passionate Full-Stack Developer creating innovative solutions with JavaScript, React, Node.js, and more."
                />
                <meta name="author" content="Roland Adams" />
                <meta
                    name="keywords"
                    content="Roland Adams, Full-Stack Developer, JavaScript, React, Node.js, Tailwind CSS, PHP, Laravel, portfolio, web development"
                />
            </Helmet>

            <div className="wrapper">
                <main>
                    <section className="skills__section">
                        <div className="skills__header">
                            <h1>My Technical Skills</h1>
                            <p>
                                A comprehensive overview of my expertise across various
                                technologies and frameworks, built through years of hands-on
                                development experience.
                            </p>
                        </div>

                        <div className="skills__categories">
                            <div className="skill__category">
                                <div className="category__header">
                                    <div className="category__icon">
                                        <Briefcase size={16} />
                                    </div>
                                    <h2 className="category__title">Frontend Development</h2>
                                </div>
                                <div className="skills__grid">
                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Code2 size={16} />
                                            </div>
                                            <div className="skill__name">JavaScript</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            Modern ES6+, DOM manipulation, async programming, and
                                            advanced JavaScript concepts
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Trophy size={16} />
                                            </div>
                                            <div className="skill__name">React.js</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            Hooks, Context API, Redux, component architecture, and modern
                                            React patterns
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <GraduationCap size={16} />
                                            </div>
                                            <div className="skill__name">Tailwind CSS</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            Utility-first CSS framework, custom components, responsive
                                            design, and optimization
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <BookOpen size={16} />
                                            </div>
                                            <div className="skill__name">CSS</div>
                                            <div className="skill__level">Expert</div>
                                        </div>
                                        <div className="skill__description">
                                            Advanced styling, animations, Flexbox, Grid, preprocessors,
                                            and modern CSS features
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Expert") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Award size={16} />
                                            </div>
                                            <div className="skill__name">HTML5</div>
                                            <div className="skill__level">Expert</div>
                                        </div>
                                        <div className="skill__description">
                                            Semantic markup, accessibility, SEO optimization, and modern
                                            HTML standards
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Expert") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Rocket size={16} />
                                            </div>
                                            <div className="skill__name">Next.js</div>
                                            <div className="skill__level">Intermediate</div>
                                        </div>
                                        <div className="skill__description">
                                            Server-side rendering, static generation, API routes, and
                                            full-stack React development
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Intermediate") }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="skill__category">
                                <div className="category__header">
                                    <div className="category__icon">
                                        <Briefcase size={16} />
                                    </div>
                                    <h2 className="category__title">Backend Development</h2>
                                </div>
                                <div className="skills__grid">
                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Briefcase size={16} />
                                            </div>
                                            <div className="skill__name">Node.js</div>
                                            <div className="skill__level">Intermediate</div>
                                        </div>
                                        <div className="skill__description">
                                            Express.js, REST APIs, middleware, authentication, and
                                            server-side JavaScript
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Intermediate") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Code2 size={16} />
                                            </div>
                                            <div className="skill__name">PHP</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            Object-oriented programming, modern PHP features, and web
                                            development best practices
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Trophy size={16} />
                                            </div>
                                            <div className="skill__name">Laravel</div>
                                            <div className="skill__level">Intermediate</div>
                                        </div>
                                        <div className="skill__description">
                                            MVC architecture, Eloquent ORM, authentication, testing, and
                                            Laravel ecosystem
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Intermediate") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <GraduationCap size={16} />
                                            </div>
                                            <div className="skill__name">MySQL</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            Database design, optimization, complex queries, indexing,
                                            and performance tuning
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <BookOpen size={16} />
                                            </div>
                                            <div className="skill__name">RESTful APIs</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            API design, documentation, versioning, authentication, and
                                            best practices
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Award size={16} />
                                            </div>
                                            <div className="skill__name">Authentication</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            JWT, OAuth, session management, security best practices, and
                                            user authorization
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="skill__category">
                                <div className="category__header">
                                    <div className="category__icon">
                                        <Rocket size={16} />
                                    </div>
                                    <h2 className="category__title">Tools & Technologies</h2>
                                </div>
                                <div className="skills__grid">
                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Briefcase size={16} />
                                            </div>
                                            <div className="skill__name">Git & GitHub</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            Version control, branching strategies, collaboration, and
                                            CI/CD workflows
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Code2 size={16} />
                                            </div>
                                            <div className="skill__name">Command Line</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            Terminal proficiency, shell scripting, automation, and
                                            development workflows
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <Trophy size={16} />
                                            </div>
                                            <div className="skill__name">npm & Composer</div>
                                            <div className="skill__level">Advanced</div>
                                        </div>
                                        <div className="skill__description">
                                            Package management, dependency handling, scripts automation,
                                            and build processes
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Advanced") }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="skill__item">
                                        <div className="skill__header">
                                            <div className="skill__icon">
                                                <GraduationCap size={16} />
                                            </div>
                                            <div className="skill__name">Webpack & Vite</div>
                                            <div className="skill__level">Intermediate</div>
                                        </div>
                                        <div className="skill__description">
                                            Module bundling, build optimization, development servers, and
                                            asset management
                                        </div>
                                        <div className="skill__progress">
                                            <div
                                                className="skill__progress-bar"
                                                style={{ width: getProgressWidth("Intermediate") }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Skills;