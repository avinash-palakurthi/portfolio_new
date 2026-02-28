import { useState, useEffect, useRef } from "react";

/* ── Fonts ── */
if (!document.head.querySelector('link[href*="Playfair"]')) {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Mono:wght@400&family=Outfit:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

/* ── Global CSS ── */
const styleId = "ap-portfolio-styles";
if (!document.head.querySelector(`#${styleId}`)) {
  const s = document.createElement("style");
  s.id = styleId;
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --gold: #c9a84c;
      --gold-dim: #a07830;
      --bg: #080808;
      --bg2: #0d0d0d;
      --surface: #141414;
      --border: rgba(201,168,76,0.18);
      --text: #e8e2d4;
      --muted: #706a5e;
      --white: #f5f0e8;
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
      font-weight: 400;
      line-height: 1.7;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: var(--gold-dim); }

    /* NAV */
    .ap-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.4rem 2.5rem;
      background: rgba(8,8,8,0.92);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border);
    }
    .nav-logo {
      font-family: 'DM Mono', monospace;
      font-size: 0.9rem; color: var(--gold);
      letter-spacing: 0.15em; text-transform: uppercase;
    }
    .nav-desktop { display: flex; gap: 2.5rem; list-style: none; }
    .nav-desktop a {
      font-family: 'DM Mono', monospace;
      font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--muted); text-decoration: none; transition: color 0.25s;
    }
    .nav-desktop a:hover, .nav-desktop a.active { color: var(--gold); }

    .nav-burger {
      display: none; flex-direction: column; gap: 5px;
      cursor: pointer; background: none; border: none; padding: 4px; z-index: 300;
    }
    .nav-burger span {
      display: block; width: 26px; height: 2px;
      background: var(--gold); border-radius: 2px; transition: all 0.3s;
    }
    .nav-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .nav-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .nav-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    .mobile-menu {
      display: none;
      position: fixed; inset: 0;
      background: rgba(8,8,8,0.97);
      backdrop-filter: blur(24px);
      z-index: 190;
      flex-direction: column; align-items: center; justify-content: center; gap: 3rem;
    }
    .mobile-menu.open { display: flex; animation: fadeUp 0.3s ease; }
    .mobile-menu a {
      font-family: 'Playfair Display', serif;
      font-size: 2.8rem; font-weight: 700;
      color: var(--white); text-decoration: none; transition: color 0.25s; cursor: pointer;
    }
    .mobile-menu a:hover { color: var(--gold); }

    /* HERO */
    .ap-hero {
      min-height: 100vh;
      display: grid; grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: 9rem 5rem 6rem;
      gap: 4rem; position: relative; overflow: hidden;
    }
    .hero-glow {
      position: absolute; right: -150px; top: 50%; transform: translateY(-50%);
      width: 600px; height: 600px; border-radius: 50%;
      background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-bottom-line {
      position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0.25;
    }
    .hero-left { animation: fadeUp 0.9s ease both; }
    .hero-eyebrow {
      font-family: 'DM Mono', monospace;
      font-size: 0.88rem; letter-spacing: 0.26em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 1.6rem;
      display: flex; align-items: center; gap: 1rem;
    }
    .hero-eyebrow::before { content: ''; width: 38px; height: 1px; background: var(--gold); display: block; }
    .ap-h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(3.8rem, 7vw, 6.5rem);
      font-weight: 900; line-height: 1.0; color: var(--white);
    }
    .gold-italic { font-style: italic; color: var(--gold); }
    .hero-tagline {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.2rem, 2vw, 1.7rem);
      font-style: italic; color: var(--muted);
      margin: 1.2rem 0 2.5rem;
    }
    .hero-desc {
      font-size: clamp(1rem, 1.5vw, 1.15rem);
      color: #8a8070; max-width: 460px; line-height: 1.85; margin-bottom: 3rem;
    }
    .hero-desc strong { color: var(--text); font-weight: 500; }
    .btn-group { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: var(--gold); color: #080808;
      padding: 1rem 2.2rem;
      font-family: 'DM Mono', monospace; font-size: 0.82rem;
      letter-spacing: 0.1em; text-transform: uppercase;
      text-decoration: none; transition: all 0.3s; white-space: nowrap;
    }
    .btn-primary:hover { background: var(--white); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(201,168,76,0.3); }
    .btn-secondary {
      font-family: 'DM Mono', monospace; font-size: 0.82rem;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--muted); text-decoration: none;
      border-bottom: 1px solid var(--border); padding-bottom: 2px;
      transition: color 0.25s, border-color 0.25s;
    }
    .btn-secondary:hover { color: var(--gold); border-color: var(--gold); }

    .hero-right { display: flex; justify-content: flex-end; align-items: center; animation: fadeUp 0.9s 0.25s ease both; }
    .hero-card {
      width: 100%; max-width: 400px;
      border: 1px solid var(--border); background: var(--surface);
      padding: 2.5rem; position: relative;
    }
    .hero-card::before {
      content: ''; position: absolute; top: -1px; left: 2rem; right: 2rem;
      height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent);
    }
    .stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
    .stat { border-left: 2px solid var(--border); padding-left: 1rem; }
    .stat-num { font-family: 'Playfair Display', serif; font-size: 1.9rem; font-weight: 700; color: var(--gold); line-height: 1; }
    .stat-label { font-family: 'DM Mono', monospace; font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-top: 0.3rem; }
    .focus-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
    .focus-list li { font-family: 'DM Mono', monospace; font-size: 0.8rem; color: var(--muted); display: flex; align-items: center; gap: 0.75rem; }
    .focus-list li::before { content: ''; width: 6px; height: 6px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }

    /* ABOUT */
    .ap-about-wrap {
      padding: 7rem 2.5rem; max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1.6fr; gap: 5rem; align-items: start;
    }
    .section-label {
      font-family: 'DM Mono', monospace; font-size: 0.82rem;
      letter-spacing: 0.25em; text-transform: uppercase;
      color: var(--gold); display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;
    }
    .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
    .about-heading { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 3.5vw, 3.2rem); font-weight: 700; color: var(--white); line-height: 1.2; }
    .about-body { font-size: clamp(1rem, 1.3vw, 1.1rem); color: #8a8070; line-height: 1.9; }
    .about-body p + p { margin-top: 1.3rem; }
    .about-body strong { color: var(--text); font-weight: 500; }
    .skills-grid { margin-top: 2.5rem; display: flex; flex-wrap: wrap; gap: 0.6rem; }
    .skill-tag {
      font-family: 'DM Mono', monospace; font-size: 0.78rem; letter-spacing: 0.06em;
      color: var(--gold); border: 1px solid rgba(201,168,76,0.25);
      padding: 0.45rem 1rem; background: rgba(201,168,76,0.05); transition: all 0.2s;
    }
    .skill-tag:hover { background: rgba(201,168,76,0.12); border-color: var(--gold); }

    /* PROJECT */
    .ap-project { padding: 7rem 2.5rem; background: var(--bg2); position: relative; overflow: hidden; }
    .ap-project::before {
      content: 'BorderPilot'; position: absolute; right: -2rem; top: 50%;
      transform: translateY(-50%) rotate(90deg);
      font-family: 'Playfair Display', serif; font-size: 9rem; font-weight: 900;
      color: rgba(201,168,76,0.025); pointer-events: none; white-space: nowrap;
    }
    .project-inner { max-width: 1100px; margin: 0 auto; }
    .project-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3.5rem; flex-wrap: wrap; gap: 1.5rem; }
    .project-title { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 5vw, 4rem); font-weight: 900; color: var(--white); line-height: 1.05; }
    .project-title span { color: var(--gold); }
    .project-meta { font-family: 'DM Mono', monospace; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); text-align: right; line-height: 1.9; }
    .project-meta span { color: var(--gold); }

    .project-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
    .project-cell { background: var(--surface); padding: 2.5rem; transition: background 0.3s; }
    .project-cell:hover { background: #181818; }
    .cell-icon { width: 42px; height: 42px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: var(--gold); font-size: 1.2rem; }
    .cell-title { font-size: 1.1rem; font-weight: 600; color: var(--white); margin-bottom: 0.8rem; }
    .cell-body { font-size: 1rem; color: var(--muted); line-height: 1.75; }

    .arch-box { margin-top: 2.5rem; border: 1px solid var(--border); background: var(--surface); padding: 2.5rem; }
    .arch-label { font-family: 'DM Mono', monospace; font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 2rem; }
    .flow-wrap { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 0.5rem; }
    .flow-item { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
    .flow-box {
      background: var(--bg); border: 1px solid var(--border);
      padding: 0.7rem 1.1rem;
      font-family: 'DM Mono', monospace; font-size: 0.78rem; letter-spacing: 0.04em;
      color: var(--text); white-space: nowrap; transition: all 0.2s;
    }
    .flow-box:hover { border-color: var(--gold); color: var(--gold); }
    .flow-sub { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--muted); text-align: center; }
    .flow-arrow { color: var(--gold-dim); font-size: 1.1rem; padding: 0 0.3rem; align-self: center; margin-bottom: 1.2rem; }

    .rag-section { margin-top: 2.5rem; border: 1px solid var(--border); background: var(--surface); padding: 2.5rem; }
    .rag-title { font-family: 'DM Mono', monospace; font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
    .rag-files { display: flex; flex-wrap: wrap; gap: 0.7rem; }
    .rag-file {
      display: flex; align-items: center; gap: 0.6rem;
      background: var(--bg); border: 1px solid var(--border);
      padding: 0.55rem 1rem;
      font-family: 'DM Mono', monospace; font-size: 0.76rem; color: var(--muted);
      transition: all 0.2s;
    }
    .rag-file:hover { border-color: var(--gold); color: var(--text); }

    .verdict-row { margin-top: 2rem; display: flex; gap: 1rem; }
    .verdict { flex: 1; padding: 1.5rem; border: 1px solid var(--border); text-align: center; }
    .verdict-dot { width: 12px; height: 12px; border-radius: 50%; margin: 0 auto 0.8rem; }
    .verdict-dot.green { background: #22c55e; box-shadow: 0 0 10px #22c55e55; }
    .verdict-dot.yellow { background: #eab308; box-shadow: 0 0 10px #eab30855; }
    .verdict-dot.red { background: #ef4444; box-shadow: 0 0 10px #ef444455; }
    .verdict-name { font-family: 'DM Mono', monospace; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

    .tech-row { margin-top: 2rem; display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: center; }
    .tech-label { font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-right: 0.4rem; }
    .tech-chip { border: 1px solid rgba(201,168,76,0.2); color: var(--muted); font-family: 'DM Mono', monospace; font-size: 0.76rem; padding: 0.35rem 0.85rem; transition: all 0.2s; }
    .tech-chip:hover { border-color: var(--gold); color: var(--gold); }

    .deploy-badge {
      display: inline-flex; align-items: center; gap: 0.6rem;
      margin-top: 1.8rem;
      border: 1px solid rgba(201,168,76,0.25); padding: 0.55rem 1.2rem;
      font-family: 'DM Mono', monospace; font-size: 0.78rem; letter-spacing: 0.08em;
      color: var(--gold); background: rgba(201,168,76,0.05);
      text-decoration: none; transition: all 0.25s;
    }
    .deploy-badge:hover { background: rgba(201,168,76,0.12); border-color: var(--gold); }
    .deploy-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 6px #22c55e; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

    /* FOOTER */
    .ap-footer {
      padding: 3.5rem 2.5rem;
      border-top: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;
    }
    .footer-name { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--white); }
    .footer-copy { font-family: 'DM Mono', monospace; font-size: 0.78rem; letter-spacing: 0.08em; color: var(--muted); }

    /* REVEAL */
    .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal.visible { opacity: 1; transform: none; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── MOBILE ── */
    @media (max-width: 768px) {
      .ap-nav { padding: 1.1rem 1.5rem; }
      .nav-desktop { display: none; }
      .nav-burger { display: flex; }

      .ap-hero {
        grid-template-columns: 1fr;
        padding: 7rem 1.5rem 4rem;
        min-height: auto; gap: 0;
      }
      .hero-right { display: none; }
      .hero-glow { display: none; }
      .ap-h1 { font-size: clamp(3rem, 13vw, 4.5rem); }
      .hero-tagline { font-size: 1.25rem; }
      .hero-desc { font-size: 1.05rem; max-width: 100%; }

      .ap-about-wrap {
        grid-template-columns: 1fr;
        padding: 4rem 1.5rem; gap: 2.5rem;
      }
      .about-heading { font-size: 2.2rem; }
      .about-body { font-size: 1.05rem; }

      .ap-project { padding: 4rem 1.5rem; }
      .ap-project::before { display: none; }
      .project-header { flex-direction: column; align-items: flex-start; }
      .project-meta { text-align: left; }
      .project-title { font-size: 2.5rem; }
      .project-grid { grid-template-columns: 1fr; }

      .arch-box { padding: 1.6rem; }
      .flow-wrap { gap: 0.4rem; }
      .flow-box { font-size: 0.74rem; padding: 0.6rem 0.85rem; white-space: normal; text-align: center; }

      .rag-section { padding: 1.6rem; }
      .rag-file { font-size: 0.73rem; }

      .verdict-row { gap: 0.5rem; }
      .verdict { padding: 1rem 0.6rem; }
      .verdict-name { font-size: 0.7rem; }

      .ap-footer { padding: 2.5rem 1.5rem; flex-direction: column; text-align: center; }
    }

    @media (max-width: 480px) {
      .ap-h1 { font-size: clamp(2.6rem, 12vw, 3.6rem); }
      .btn-primary { padding: 0.9rem 1.6rem; font-size: 0.78rem; }
      .btn-secondary { font-size: 0.78rem; }
      .skill-tag { font-size: 0.74rem; padding: 0.4rem 0.85rem; }
      .hero-eyebrow { font-size: 0.78rem; }
      .section-label { font-size: 0.75rem; }
    }

    /* ── DESKTOP ── */
    @media (min-width: 1024px) {
      html { font-size: 20px; }
      .about-body { font-size: 1rem; line-height: 1.95; }
      .hero-desc { font-size: 1rem; }
      .cell-body { font-size: 0.95rem; line-height: 1.8; }
      .ap-h1 { font-size: clamp(3.5rem, 5.5vw, 5.5rem); }
      .about-heading { font-size: clamp(1.8rem, 2.8vw, 2.6rem); }
      .project-title { font-size: clamp(2.2rem, 3.5vw, 3.2rem); }
    }
  `;
  document.head.appendChild(s);
}

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const y = window.scrollY + 120;
      ["about", "project"].forEach((id) => {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight)
          setActive(id);
      });
      if (window.scrollY < 150) setActive("");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <>
      <nav className="ap-nav">
        <div className="nav-logo">AP // Portfolio</div>
        <ul className="nav-desktop">
          <li>
            <a href="#about" className={active === "about" ? "active" : ""}>
              About
            </a>
          </li>
          <li>
            <a href="#project" className={active === "project" ? "active" : ""}>
              Work
            </a>
          </li>
          <li>
            <a href="/avinash_resume.pdf" download>
              Resume
            </a>
          </li>
        </ul>
        <button
          className={`nav-burger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a onClick={() => goTo("about")}>About</a>
        <a onClick={() => goTo("project")}>Work</a>
        <a
          href="/avinash_resume.pdf"
          download
          onClick={() => setMenuOpen(false)}
        >
          Resume
        </a>
      </div>
    </>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="ap-hero">
      <div className="hero-glow" />
      <div className="hero-left">
        <div className="hero-eyebrow">Applied AI Engineer</div>
        <h1 className="ap-h1">
          Avinash
          <br />
          <span className="gold-italic">Palakurthi</span>
        </h1>
        <p className="hero-tagline">Building AI that solves real problems.</p>
        <p className="hero-desc">
          I build <strong>AI-powered tools</strong> that connect language models
          with real-world data — turning documents, APIs, and compliance logic
          into products that actually save time.
        </p>
        <div className="btn-group">
          <a href="/ai_avinash.pdf" download className="btn-primary">
            ↓ Resume
          </a>
          <a href="#project" className="btn-secondary">
            See My Work
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-card">
          <div className="stat-row">
            {[
              { num: "RAG", label: "Pipelines" },
              { num: "OCR", label: "Extraction" },
              { num: "LLM", label: "Reasoning" },
              { num: "API", label: "Integration" },
            ].map((s) => (
              <div className="stat" key={s.num}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <ul className="focus-list">
            <li>OpenAI · LangChain · Python</li>
            <li>FastAPI · React · Docker</li>
            <li>RAG — Document Q&A</li>
            <li>VIES API — VAT Validation</li>
            <li>AWS EC2 · S3 · CloudFront · ACM</li>
          </ul>
        </div>
      </div>
      <div className="hero-bottom-line" />
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  const leftRef = useReveal();
  const rightRef = useReveal();
  const skills = [
    "OpenAI",
    "LangChain",
    "Python",
    "FastAPI",
    "React",
    "RAG",
    "Pydantic",
    "VIES API",
    "OCR",
    "Docker",
    "AWS EC2",
    "AWS S3",
    "CloudFront",
    "ACM (SSL)",
  ];

  return (
    <section id="about">
      <div className="ap-about-wrap">
        <div className="reveal" ref={leftRef}>
          <div className="section-label">About</div>
          <h2 className="about-heading">
            Simple tools,
            <br />
            <span className="gold-italic">smart results.</span>
          </h2>
        </div>
        <div className="reveal" ref={rightRef}>
          <div className="about-body">
            <p>
              I'm an <strong>Applied AI Engineer</strong> who builds tools that
              use AI to do real, useful work. I care about making things that
              are easy to understand and actually help people — not just demos.
            </p>
            <p>
              My focus is connecting language models to real data — documents,
              APIs, and business rules — so they give{" "}
              <strong>accurate, helpful answers</strong>. I've worked with RAG
              pipelines, OCR document reading, and live API checks to build
              systems that cut down on manual work.
            </p>
            <p>
              I built <strong>BorderPilot AI</strong> end to end — FastAPI
              backend, React frontend, containerised with{" "}
              <strong>Docker</strong>, deployed on <strong>AWS</strong> using
              EC2, S3, CloudFront CDN, and ACM for SSL. Live at a custom domain
              with HTTPS.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((s) => (
              <span className="skill-tag" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PROJECT ── */
const CELLS = [
  {
    icon: "⚠",
    title: "The Problem",
    body: "EU shipments get delayed because of wrong VAT numbers, bad HS codes, missing ADR safety docs, and incomplete ICS2 data. Checking all this by hand takes time and causes mistakes.",
  },
  {
    icon: "◈",
    title: "What It Does",
    body: "BorderPilot reads shipment documents using OCR, checks VAT numbers live via the VIES API, looks up ADR and ICS2 rules, and uses RAG to give a clear explanation of any issues found.",
  },
  {
    icon: "◎",
    title: "The Result",
    body: "Compliance checks that used to need an expert now run in seconds. Each document gets a Green, Yellow, or Red result with a plain-language reason — before it reaches the border.",
  },
];

const FLOW = [
  { label: "Upload Doc", sub: "PDF / Image" },
  { label: "OCR Read", sub: "OpenAI Vision" },
  { label: "Map Data", sub: "Pydantic" },
  { label: "Check Rules", sub: "VAT · ADR · ICS2" },
  { label: "RAG Answer", sub: "LangChain" },
  { label: "Result", sub: "Green / Yellow / Red" },
];

const RAG_FILES = [
  { name: "adr_chapter_5.pdf", icon: "📄" },
  { name: "adr_chapter_8.pdf", icon: "📄" },
  { name: "adr_Limited_Quantities.pdf", icon: "📄" },
  { name: "adr_training_1.3.pdf", icon: "📄" },
  { name: "entry_and_import_in_eu.pdf", icon: "📄" },
  { name: "eudr.pdf", icon: "📄" },
  { name: "hs_code.csv", icon: "📊" },
  { name: "ICS2_ens_filing.pdf", icon: "📄" },
  { name: "ics2-operational_guidance.pdf", icon: "📄" },
];

const TECH = [
  "OpenAI",
  "LangChain",
  "Python",
  "FastAPI",
  "React",
  "Docker",
  "RAG",
  "VIES API",
  "AWS EC2",
  "S3",
  "CloudFront",
];

function Project() {
  const headerRef = useReveal();
  const gridRef = useReveal();
  const archRef = useReveal();
  const ragRef = useReveal();

  return (
    <section id="project" className="ap-project">
      <div className="project-inner">
        <div className="project-header reveal" ref={headerRef}>
          <div>
            <div className="section-label">Featured Project</div>
            <h2 className="project-title">
              BorderPilot <span>AI</span>
            </h2>
          </div>
          <div className="project-meta">
            EU Shipment Checks
            <br />
            Automated with AI
            <br />
            <span>Present</span>
          </div>
        </div>

        <div className="project-grid reveal" ref={gridRef}>
          {CELLS.map((c) => (
            <div className="project-cell" key={c.title}>
              <div className="cell-icon">{c.icon}</div>
              <div className="cell-title">{c.title}</div>
              <div className="cell-body">{c.body}</div>
            </div>
          ))}
        </div>

        <div className="arch-box reveal" ref={archRef}>
          <div className="arch-label">// How It Works</div>
          <div className="flow-wrap">
            {FLOW.map((step, i) => (
              <div
                key={step.label}
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <div className="flow-item">
                  <div className="flow-box">{step.label}</div>
                  <div className="flow-sub">{step.sub}</div>
                </div>
                {i < FLOW.length - 1 && <div className="flow-arrow">→</div>}
              </div>
            ))}
          </div>

          <div className="verdict-row">
            {[
              { cls: "green", label: "Cleared" },
              { cls: "yellow", label: "Needs Review" },
              { cls: "red", label: "Rejected" },
            ].map((v) => (
              <div className="verdict" key={v.cls}>
                <div className={`verdict-dot ${v.cls}`} />
                <div className="verdict-name">{v.label}</div>
              </div>
            ))}
          </div>

          <div className="tech-row">
            <span className="tech-label">Stack</span>
            {TECH.map((t) => (
              <span className="tech-chip" key={t}>
                {t}
              </span>
            ))}
          </div>

          <a
            href="https://borderpilot.anuveekshi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="deploy-badge"
          >
            <div className="deploy-dot" />
            Live on AWS — borderpilot.anuveekshi.com ↗
          </a>
        </div>

        <div className="rag-section reveal" ref={ragRef}>
          <div className="rag-title">
            // RAG Knowledge Base — Documents Used
          </div>
          <div className="rag-files">
            {RAG_FILES.map((f) => (
              <div className="rag-file" key={f.name}>
                <span>{f.icon}</span>
                {f.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="ap-footer">
      <div className="footer-name">
        Avinash <span className="gold-italic">Palakurthi</span>
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} · Applied AI Engineer
      </div>
    </footer>
  );
}

/* ── APP ── */
export default function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Project />
      <Footer />
    </div>
  );
}
