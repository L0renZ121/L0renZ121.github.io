import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { render } from "preact";
import "./styles.css";

const projects = [
  { id: "disaster", category: "fullstack", emoji: "🆘", type: "full stack", title: "Disaster Early Help Platform", description: "A real-time disaster response platform connecting victims with helpers using geo-location & alerts.", tech: "CSS", github: "https://github.com/AA-maker-dev/Disaster-Early-Help-Platform" },
  { id: "mental", category: "frontend", emoji: "🧠", type: "frontend", title: "AI Powered Mental Health Chatbot", description: "An AI-powered chatbot providing empathetic mental health support and resources.", tech: "JavaScript", github: "https://github.com/AA-maker-dev/AI-Powered-Mental-Health-Chatbot" },
  { id: "scam", category: "security", emoji: "🛡️", type: "security", title: "AI Scam Message Detector", description: "ML-powered tool that classifies messages as scam or legitimate using NLP techniques.", tech: "Python", github: "https://github.com/AA-maker-dev/AI-Scam-Message-Detector" },
];

const skillGroups = [
  ["Languages", [["JavaScript / TypeScript", 95], ["Python", 88], ["PHP", 82], ["Go", 70], ["C / C++", 65]]],
  ["Frontend", [["React / Next.js", 92], ["Vue / Nuxt", 85], ["Tailwind CSS", 95], ["Three.js / WebGL", 75]]],
  ["Backend", [["Node.js / Express", 90], ["Django / FastAPI", 82], ["PostgreSQL / MongoDB", 88], ["GraphQL / REST APIs", 85]]],
  ["Cybersecurity", [["Penetration Testing", 78], ["OWASP Security", 85], ["Network Security", 80], ["CTF Challenges", 75]]],
  ["DevOps & cloud", [["Docker / Kubernetes", 82], ["AWS / GCP", 78], ["CI/CD Pipelines", 85], ["Linux Administration", 88]]],
  ["Tools", [["Git / GitHub", 95], ["VS Code / Neovim", 92], ["Figma / Design Tools", 78], ["Terminal / CLI", 90]]],
];

const timeline = [
  ["2020 — 2023", "Video Editing & Subtitling", "Worked on video editing, subtitling, and content creation for various projects and clients."],
  ["2023 — 2024", "Front End Designer", "Designed modern, responsive UIs and web layouts, focusing on user experience and visual appeal."],
  ["2024 — 2025", "Front End Developer", "Developed interactive and performant web applications using modern JavaScript frameworks."],
  ["2025 — Present", "Full Stack Developer", "Building and maintaining full stack applications, integrating backend and frontend, and deploying scalable solutions."],
];

const certifications = [
  ["https://images.credly.com/size/680x680/images/dba526ad-3a2f-49af-becf-65d5a66a75ae/image.png", "Make Basics", "https://www.credly.com/badges/74d436dd-fb57-45f5-b09f-d9f76a7dd940/public_url"],
  ["https://images.credly.com/size/680x680/images/02e15286-d87a-45aa-9ba7-8d38307ca368/image.png", "Make Foundation", "https://www.credly.com/badges/3f70d846-b26b-4cf8-b0fd-472fda8d298b/public_url"],
  ["https://images.credly.com/size/680x680/images/484b609b-5bc3-4323-b342-d925e4aac7a0/blob", "AI Automation Explorer", "https://www.credly.com/badges/d1422490-fb78-4886-91b0-4bd00136c2f5/public_url"],
];

const commands = [
  ["Navigate to About", "about", "g a"],
  ["Navigate to Skills", "skills", "g s"],
  ["Navigate to Projects", "projects", "g p"],
  ["Navigate to Experience", "experience", "g e"],
  ["Navigate to Contact", "contact", "g c"],
  ["Toggle theme", "theme", "t"],
  ["Download resume", "resume", "d"],
  ["GitHub profile", "github", "g h"],
];

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, () => setTheme((current) => current === "dark" ? "light" : "dark")];
}

function usePointerEffects() {
  useEffect(() => {
    const media = matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return undefined;
    let frame = 0;
    let x = -200;
    let y = -200;
    let activeElement = null;
    const interactiveSelector = "a, button, input, textarea, select, [role='button'], .project, .skill-group, .badge, .timeline-card, .hero-note, .skill-intro, form, .empty";
    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${x}px`);
        document.documentElement.style.setProperty("--pointer-y", `${y}px`);
        document.documentElement.style.setProperty("--hero-shift-x", `${(x / innerWidth - 0.5) * 34}px`);
        document.documentElement.style.setProperty("--hero-shift-y", `${(y / innerHeight - 0.5) * 22}px`);
        frame = 0;
      });
    };
    const scroll = () => document.documentElement.style.setProperty("--hero-parallax-y", `${Math.min(window.scrollY, 420) * -0.08}px`);
    const over = (event) => {
      const nextElement = event.target.closest(interactiveSelector);
      if (!nextElement || nextElement === activeElement || (activeElement && activeElement.contains(nextElement))) return;
      activeElement = nextElement;
      document.documentElement.classList.add("cursor-active");
    };
    const out = (event) => {
      if (!activeElement || activeElement.contains(event.relatedTarget)) return;
      activeElement = null;
      document.documentElement.classList.remove("cursor-active");
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);
}

function Button({ children, className = "", ...props }) {
  return <button className={`button ${className}`} {...props}>{children}</button>;
}

function Header({ toggleTheme, onCommands }) {
  const [open, setOpen] = useState(false);
  const links = ["about", "skills", "projects", "experience", "contact"];
  return <header className="topbar" id="navbar">
    <div className="wrap nav">
      <a className="brand" href="#top" aria-label="Abhi Khatiwada home"><span className="brand-mark">A</span><span>Abhi Khatiwada</span></a>
      <nav className="nav-links" aria-label="Primary navigation">{links.map((link) => <a href={`#${link}`} key={link}>{link[0].toUpperCase() + link.slice(1)}</a>)}</nav>
      <div className="nav-actions"><Button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">◐</Button><Button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>☰</Button></div>
    </div>
    {open && <nav className="wrap mobile-nav open" aria-label="Mobile navigation">{links.map((link) => <a href={`#${link}`} onClick={() => setOpen(false)} key={link}>{link[0].toUpperCase() + link.slice(1)}</a>)}</nav>}
  </header>;
}

function Hero() {
  const roles = ["Frontend Engineer", "Frontend Designer", "Interaction Builder", "Accessibility Advocate", "UI Problem Solver"];
  const [role, setRole] = useState(roles[0]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;
    const timer = setInterval(() => setRole((current) => roles[(roles.indexOf(current) + 1) % roles.length]), 3000);
    return () => clearInterval(timer);
  }, []);
  return <section className="wrap hero" id="top">
    <div className="hero-copy reveal"><div className="status">Open to collaborations</div><h1>Designing interfaces that make the <em>web feel clear.</em></h1><p className="hero-lede">I'm Abhi Khatiwada — a frontend engineer and designer from Nepal. I build responsive interfaces, visual systems, and thoughtful interactions, with AI, full-stack, and security skills supporting the work.</p><div className="actions"><a className="button primary" href="#projects">Explore projects <span aria-hidden="true">↗</span></a><a className="button secondary" href="/abhi.pdf" download>Download resume <span aria-hidden="true">↓</span></a></div></div>
    <div className="hero-orbit reveal" aria-label="Portfolio focus note"><div className="orbit-ring" aria-hidden="true"></div><div className="hero-note"><div className="note-line"><span>field note / 001</span><span>NP</span></div><strong>{role}</strong><p>Exploring the overlap between visual craft, accessible UI engineering, and the systems that make products reliable.</p><div className="note-line"><span>currently learning</span><span>RAG + cloud security</span></div></div></div>
  </section>;
}

function About() {
  return <section className="wrap" id="about"><div className="section-heading reveal"><h2>Interfaces, shipped.</h2><p>A practical frontend maker with a bias toward visual clarity, responsive systems, and turning rough ideas into working experiences.</p></div><div className="about-grid"><div className="about-copy reveal"><p>My work starts with the interface: shaping a clear idea, building the visual system, and making every interaction feel intentional. AI/ML, full-stack development, cybersecurity, and open source are supporting capabilities that help me take a frontend idea further.</p><div className="fact-list"><div className="fact"><b>01</b><span>Currently building AI-powered tools & full-stack web apps</span></div><div className="fact"><b>02</b><span>Focused on visual systems, responsive UI & interaction design</span></div><div className="fact"><b>03</b><span>Active hackathon participant — shipped real-world projects</span></div><div className="fact"><b>04</b><span>Exploring Cybersecurity, Ethical Hacking & Red Teaming</span></div><div className="fact"><b>05</b><span>Learning LangChain, RAG pipelines & cloud security</span></div></div><div className="link-row"><a className="text-link" href="https://github.com/aa-maker-dev" target="_blank" rel="noreferrer">GitHub ↗</a><a className="text-link" href="http://abhi88.com.np/" target="_blank" rel="noreferrer">Portfolio ↗</a><a className="text-link" href="https://youtube.com/@abh1-o2c" target="_blank" rel="noreferrer">YouTube ↗</a><a className="text-link" href="mailto:khatiwadaabhi123@gmail.com">Email ↗</a></div></div></div></section>;
}

function Skills() {
  return <section className="wrap" id="skills"><div className="section-heading reveal"><h2>The toolkit behind the interface.</h2><p>UI engineering, design tools, accessibility, and the supporting technologies I reach for when the product needs to work beautifully.</p></div><div className="skills-layout"><div className="skill-intro reveal"><h3>Frontend first, systems aware.</h3><p>I care about the details people feel: hierarchy, rhythm, responsiveness, keyboard flow, and the code that keeps those choices maintainable.</p><div className="skill-pills">{["UI engineering", "Responsive design", "Accessibility", "Interaction design", "AI / ML", "Full stack", "Cybersecurity"].map((item) => <span className="pill" key={item}>{item}</span>)}</div></div><div className="skill-list">{skillGroups.map(([name, items]) => <div className="skill-group reveal" key={name}><h3>{name}</h3>{items.map(([label, level]) => <div className="skill-item" key={label}><div className="skill-meta"><span>{label}</span><span>{level}%</span></div><div className="meter"><span style={{ "--level": `${level}%` }} /></div></div>)}</div>)}</div></div></section>;
}

function ProjectCard({ project, onOpen }) {
  const cardRef = useRef(null);
  const boundsRef = useRef(null);
  const frameRef = useRef(0);
  const pendingPointRef = useRef(null);
  const captureBounds = (event) => {
    if (event.pointerType === "mouse") boundsRef.current = cardRef.current?.getBoundingClientRect();
  };
  const onPointerMove = (event) => {
    if (event.pointerType !== "mouse" || !matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const card = cardRef.current;
    const bounds = boundsRef.current;
    if (!card || !bounds) return;
    pendingPointRef.current = [event.clientX, event.clientY];
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      const [clientX, clientY] = pendingPointRef.current || [];
      const x = (clientX - bounds.left) / bounds.width - 0.5;
      const y = (clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--tilt-x", `${(x * 7).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(-y * 7).toFixed(2)}deg`);
      card.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      frameRef.current = 0;
    });
  };
  const resetPointer = () => {
    const card = cardRef.current;
    if (!card) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    boundsRef.current = null;
    pendingPointRef.current = null;
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
    card.style.removeProperty("--glow-x");
    card.style.removeProperty("--glow-y");
  };
  return <article ref={cardRef} className="project reveal" data-category={project.category} onPointerEnter={captureBounds} onPointerMove={onPointerMove} onPointerLeave={resetPointer}><div className="project-visual"><span className="project-emoji">{project.emoji}</span><span className="project-type">{project.type}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-footer"><span className="project-tech">{project.tech}</span><Button className="project-link" onClick={() => onOpen(project)}>Inspect →</Button></div></article>;
}

function Projects({ onOpen }) {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => projects.filter((project) => filter === "all" || project.category === filter), [filter]);
  return <section className="wrap" id="projects"><div className="section-heading reveal"><h2>Frontend work, built for people.</h2><p>A few pinned projects that show how I think: useful outcomes, direct interfaces, and room to keep improving.</p></div><div className="filters reveal" role="group" aria-label="Filter projects">{["all", "fullstack", "frontend", "security", "tools"].map((item) => <Button className={`filter ${filter === item ? "active" : ""}`} onClick={() => setFilter(item)} key={item}>{item === "all" ? "All" : item[0].toUpperCase() + item.slice(1)}</Button>)}</div><div className="project-grid">{filtered.map((project) => <ProjectCard project={project} onOpen={onOpen} key={project.id} />)}</div></section>;
}

function Experience() {
  return <section className="wrap" id="experience"><div className="section-heading reveal"><h2>A path shaped by making.</h2><p>Each chapter added another layer: visual craft, product thinking, and the systems underneath.</p></div><div className="timeline">{timeline.map(([date, title, copy]) => <div className="timeline-item reveal" key={date}><span className="timeline-dot"></span><div className="timeline-card"><time>{date}</time><h3>{title}</h3><p>{copy}</p></div></div>)}</div></section>;
}

function Certifications() {
  return <section className="wrap" id="certifications"><div className="section-heading reveal"><h2>Proof of the learning loop.</h2><p>Verified achievements from hands-on learning and automation work.</p></div><div className="badges">{certifications.map(([image, title, url]) => <article className="badge reveal" key={title}><img src={image} alt={`${title} Credly badge`} /><h3>{title}</h3><p>Credly Achievement · Issued by Make</p><a className="button secondary" href={url} target="_blank" rel="noreferrer">View badge ↗</a></article>)}</div></section>;
}

function Contact({ onToast }) {
  const submit = (event) => { event.preventDefault(); const form = event.currentTarget; const button = form.querySelector("button"); button.disabled = true; button.querySelector("span").textContent = "Message sent"; onToast("Thanks — your message is ready to be followed up."); setTimeout(() => { form.reset(); button.disabled = false; button.querySelector("span").textContent = "Send message"; }, 1800); };
  return <section className="wrap" id="contact"><div className="section-heading reveal"><h2>Have a good problem?</h2><p>I'm open to new projects, creative ideas, and opportunities to build something useful together.</p></div><div className="contact-grid"><div className="contact-copy reveal"><p>Tell me what you're exploring. The best conversations usually start with a rough idea and a clear reason it matters.</p><div className="contact-list"><a href="mailto:contact@abhi88.com.np"><span>Email</span><span>contact@abhi88.com.np ↗</span></a><a href="https://github.com/aa-maker-dev" target="_blank" rel="noreferrer"><span>GitHub</span><span>@aa-maker-dev ↗</span></a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><span>LinkedIn</span><span>Connect with me ↗</span></a></div></div><form className="reveal" onSubmit={submit}><div className="field"><label for="name">Name</label><input id="name" name="name" required autocomplete="name" placeholder="Your name" /></div><div className="field"><label for="email">Email</label><input id="email" name="email" type="email" required autocomplete="email" placeholder="your@email.com" /></div><div className="field"><label for="message">Message</label><textarea id="message" name="message" rows="5" required placeholder="What are you building?" /></div><Button className="primary" type="submit"><span>Send message</span><span aria-hidden="true">↗</span></Button></form></div></section>;
}

function CommandPalette({ open, onClose, toggleTheme, onToast }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const visible = commands.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => { setSelected(0); }, [query]);
  useEffect(() => { if (open) setTimeout(() => document.getElementById("command-input")?.focus(), 0); }, [open]);
  const run = (action) => { if (action === "theme") toggleTheme(); if (action === "resume") { const link = document.createElement("a"); link.href = "/abhi.pdf"; link.download = "abhi.pdf"; link.click(); } if (action === "github") window.open("https://github.com/aa-maker-dev", "_blank", "noopener"); if (["about", "skills", "projects", "experience", "contact"].includes(action)) document.getElementById(action)?.scrollIntoView({ behavior: "smooth" }); if (action) onClose(); };
  if (!open) return null;
  return <div className="command-backdrop open" role="dialog" aria-modal="true" aria-label="Command palette" onClick={(event) => event.target === event.currentTarget && onClose()}><div className="command-box"><input id="command-input" value={query} onInput={(event) => setQuery(event.currentTarget.value)} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); setSelected(Math.min(selected + 1, visible.length - 1)); } if (event.key === "ArrowUp") { event.preventDefault(); setSelected(Math.max(selected - 1, 0)); } if (event.key === "Enter" && visible[selected]) run(visible[selected][1]); if (event.key === "Escape") onClose(); }} placeholder="Search a command…" aria-label="Search commands" /><div className="command-results">{visible.map(([name, action, shortcut], index) => <button className={`command-result ${index === selected ? "selected" : ""}`} type="button" onClick={() => run(action)} key={name}><span>{name}</span><kbd>{shortcut}</kbd></button>)}</div></div></div>;
}

function ProjectDialog({ project, onClose }) {
  if (!project) return null;
  return <div className="modal-backdrop open" role="dialog" aria-modal="true" aria-label="Project details" onClick={(event) => event.target === event.currentTarget && onClose()}><div className="modal-box"><Button className="icon-button modal-close" onClick={onClose} aria-label="Close project details">×</Button><span className="status">{project.tech} project</span><h2>{project.title}</h2><p>{project.description}</p><div className="modal-stats"><div className="modal-stat"><strong>Pinned</strong><span>status</span></div><div className="modal-stat"><strong>Open source</strong><span>repository</span></div></div><a className="button primary" href={project.github} target="_blank" rel="noreferrer">View on GitHub ↗</a></div></div>;
}

function App() {
  const [theme, toggleTheme] = useTheme();
  const [commandsOpen, setCommandsOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [notice, setNotice] = useState("");
  usePointerEffects();
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); reveal.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((element) => reveal.observe(element));
    const onKey = (event) => { if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); setCommandsOpen(true); } if (event.key === "Escape") { setCommandsOpen(false); setProject(null); } if (event.key.toLowerCase() === "t" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) toggleTheme(); };
    document.addEventListener("keydown", onKey);
    return () => { reveal.disconnect(); document.removeEventListener("keydown", onKey); document.documentElement.classList.remove("motion-ready"); };
  }, [toggleTheme]);
  useEffect(() => { if (!notice) return undefined; const timer = setTimeout(() => setNotice(""), 2600); return () => clearTimeout(timer); }, [notice]);
  return <><div className="pointer-spotlight" aria-hidden="true"></div><div className="cursor-ring" aria-hidden="true"></div><Header toggleTheme={toggleTheme} onCommands={() => setCommandsOpen(true)} /><main id="main"><Hero /><About /><Skills /><Projects onOpen={setProject} /><Experience /><Certifications /><section className="wrap" id="blog"><div className="empty reveal"><h3>Notes are in the lab.</h3><p>I'm working on articles about web development, security, and tech insights. Stay tuned!</p></div></section><Contact onToast={setNotice} /></main><footer><div className="wrap footer-row"><span>© {new Date().getFullYear()} Abhi Khatiwada</span><span className="mono">crafted with curiosity in Nepal</span><span className="mono">press / to navigate</span></div></footer><CommandPalette open={commandsOpen} onClose={() => setCommandsOpen(false)} toggleTheme={toggleTheme} onToast={setNotice} /><ProjectDialog project={project} onClose={() => setProject(null)} />{notice && <div className="toast show" role="status">{notice}</div>}</>;
}

render(<App />, document.getElementById("app"));
