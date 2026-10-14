import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Download,
  ExternalLink,
  Code2,
  Shield,
  Database,
  Terminal,
  Award,
  Cpu,
  Eye,
  X,
  Layers,
  Globe,
  Copy,
  Check,
  CheckCircle2,
  Lock,
  BarChart3,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./index.css";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const projectCategories = [
  "All",
  "Cybersecurity",
  "Web & Full-Stack",
  "AI/ML & Big Data",
  "IoT & Python",
];

const projectsData = [
  {
    title: "TalentPulse",
    category: "Web & Full-Stack",
    icon: <Layers size={22} />,
    desc: "AI-powered career placement & ATS intelligence platform featuring structured Pydantic schemas, blind screening mode, and rate-limiting safeguards.",
    longDesc:
      "A modern career placement and ATS tracking ecosystem. It leverages FastAPI on the backend and React on the frontend, integrating Google Gemini AI to deliver structured ATS analysis, personalized career roadmaps, and real-time remote job matching. The application is built with database resilience (MongoDB + local JSON fallback) and hardened authentication security.",
    tags: [
      "React.js",
      "FastAPI",
      "Python",
      "MongoDB",
      "PBKDF2 Hashing",
      "Pydantic",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/ayushchoudhary22/TalentPulse",
    liveLink: "",
    achievements: [
      "Architected a career placement and ATS tracking ecosystem using React and FastAPI, reducing candidate screening latency by 45%.",
      "Integrated Google Gemini AI via structured Pydantic schemas to deliver multi-metric ATS alignment and personalized career roadmaps.",
      "Hardened credential security using PBKDF2-HMAC-SHA256 with dynamic salts and timing-attack-resistant Bearer token validation.",
      "Implemented an IP-based sliding-window rate limiter in FastAPI and protected against XSS by sanitizing inputs rendered in React.",
      "Designed a Bias Reduction Mode enabling blind screening by dynamically anonymizing names and contact details in recruiter view.",
    ],
  },
  {
    title: "RetailSense AI",
    category: "AI/ML & Big Data",
    icon: <Database size={22} />,
    desc: "Enterprise demand forecasting platform using XGBoost & MLOps standards, projecting $2.45M in annual inventory ROI — engineered at Celebal Technologies.",
    longDesc:
      "A production-grade machine learning platform built to solve critical retail supply chain challenges — overstocking and stockouts. Built during the Celebal Technologies internship, it deploys an XGBoost champion model on 5 years of historical sales data (500 store-item combinations) and translates predictions into mathematical supply chain optimization and financial ROI.",
    tags: [
      "Python",
      "XGBoost",
      "LightGBM",
      "SHAP",
      "Scikit-Learn",
      "Pytest",
      "Streamlit",
      "Pandas",
    ],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Engineered a forecasting pipeline over a 90-day horizon across 500 store-item combinations using 5 years of historical sales data with custom Pandas memory downcasting (62.5% reduction).",
      "Benchmarked 6 algorithms using TimeSeriesSplit cross-validation; deployed XGBoost champion model reducing MAE by 41.4% against historical baseline.",
      "Integrated SHAP to mathematically prove feature importance, identifying 7-day autoregressive lags as primary demand drivers.",
      "Designed an automated supply chain engine calculating Safety Stock, Reorder Points (ROP), and dynamic inventory statuses.",
      "Conducted Business Impact Analysis demonstrating $2.45M reduction in annual holding costs.",
      "Structured codebase using enterprise MLOps standards: modular OOP in src/, YAML configs, and 100% pytest pass rate.",
    ],
  },
  {
    title: "AI Penetration Testing Suite",
    category: "Cybersecurity",
    icon: <Shield size={22} />,
    desc: "Automated vulnerability scanner combining multi-threaded crawlers, Nmap port diagnostics, SQLi/XSS detectors, and Gemini AI remediation advice.",
    longDesc:
      "A modular cybersecurity audit tool written in Python & Flask. Featuring high-speed network diagnostics, spider crawling, and active vulnerability verification, the app provides real-time terminal log streaming and structured audit reporting for remediation.",
    tags: [
      "Python",
      "Flask",
      "WebSockets",
      "Nmap",
      "SQLMap",
      "Google Gemini API",
      "Security Auditing",
    ],
    githubLink: "https://github.com/ayushchoudhary22/Pentration-Tool",
    liveLink: "",
    achievements: [
      "Built custom multi-threaded crawler to index targets, extract headers, cookies, and discover hidden endpoints.",
      "Designed active detection engines for error-based SQL Injection and reflective Cross-Site Scripting (XSS).",
      "Integrated Google Gemini API to review vulnerability payloads and output actionable, step-by-step code remediations.",
      "Created a real-time terminal stream to the UI using Socket.io and compiled downloadable HTML/PDF vulnerability triage reports.",
    ],
  },
  {
    title: "JKLU Cafeteria Portal",
    category: "Web & Full-Stack",
    icon: <Globe size={22} />,
    desc: "MERN check-in and booking engine with Azure AD SSO integration, Razorpay HMAC verification, and dynamic QR entry.",
    longDesc:
      "A digitized check-in and billing portal for JKLU students. Replacing slow and manual paper tracking, this application secures user onboarding with Microsoft Azure AD SSO and enables fast dynamic QR-code scans for entry verification.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Azure AD SSO",
      "Razorpay",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/JKLU-MessPortal/Mess-Portal-",
    liveLink: "https://mess-portal-frontend.vercel.app/",
    achievements: [
      "Engineered dynamic check-in module generating encrypted QR codes for instant cafeteria entry.",
      "Integrated Microsoft Azure AD SSO for domain-restricted student login with role-based access control (RBAC).",
      "Embedded Razorpay Payment Gateway backed by HMAC-SHA256 signature verification for meal booking security.",
      "Built clean Tailwind UI with animated blur-modals, real-time scanning feed, and dietary preferences selector.",
    ],
  },
  {
    title: "Spam Email Detection & Anti-Phishing",
    category: "Cybersecurity",
    icon: <Terminal size={22} />,
    desc: "Hybrid voting classifier and CNN deep learning models comparing email spam & phishing classification accuracy (98.83% accuracy).",
    longDesc:
      "A machine learning and deep learning project analyzing SMS and email datasets. Contrasts standard algorithms using TF-IDF feature mapping against an 1D Convolutional Neural Network (CNN) to achieve high-performance text classification and suspicious email triage.",
    tags: [
      "Python",
      "NLP",
      "Scikit-Learn",
      "TensorFlow",
      "Keras",
      "Streamlit",
      "CNN",
    ],
    githubLink: "https://github.com/ayushchoudhary22/Spam-Email-Detection",
    liveLink:
      "https://spam-email-detection-88eesv2sbzfhcpumxacwil.streamlit.app/",
    achievements: [
      "Developed a Hybrid VotingClassifier (Naive Bayes + Linear SVM + Random Forest) hitting 97.66% accuracy.",
      "Trained a Keras CNN (Embedding, Conv1D, MaxPooling, Dropout) achieving 98.83% spam/phishing detection accuracy.",
      "Engineered text pre-processing pipelines including tokenization, stopword removal, and TF-IDF vectorization.",
      "Created a Streamlit web portal allowing users to input and evaluate email text and headers dynamically.",
    ],
  },
  {
    title: "Smart City Streaming Pipeline",
    category: "AI/ML & Big Data",
    icon: <Cpu size={22} />,
    desc: "Real-time traffic & pollution analytics pipeline using Apache Spark, Kafka streams, and PostgreSQL database.",
    longDesc:
      "A scalable data streaming engine designed to simulate and process city telemetry. Reads real-time data feeds from Kafka topics, aggregates records through time-window bounds in Spark, and writes output to a database for analytical dashboards.",
    tags: [
      "Apache Spark",
      "Kafka",
      "PySpark",
      "PostgreSQL",
      "Data Streaming",
      "Python",
    ],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Simulated continuous telemetry feeds using Kafka producers with 10-second-rounded timestamps.",
      "Aggregated vehicle speeds and PM2.5/PM10 metrics using 10s tumbling windows with 60s watermarks in Spark.",
      "Performed windowed stream-stream joins to align traffic patterns with environmental metrics.",
      "Persisted joined analytical records to PostgreSQL database using optimized foreachBatch Spark handlers.",
    ],
  },
  {
    title: "Oil-Mil E-Commerce System",
    category: "Web & Full-Stack",
    icon: <Layers size={22} />,
    desc: "Organic store portal with interactive shopping cart checkout and secure, JWT-based admin inventory console.",
    longDesc:
      "A specialized MERN e-commerce application serving organic oil customers. It offers a catalog view, cart checkout processes, and a secure dashboard for administrative managers to monitor bookings and update stock lists.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Bcrypt",
      "Tailwind CSS",
    ],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Engineered clean shopping interface with real-time cart subtotal calculations and product filters.",
      "Restricted admin operations using JWT cookie verify protocols and cryptographic Bcrypt password hashing.",
      "Created structured Order schemas storing client addresses, contact logs, and item quantities.",
      "Secured API endpoints with CORS configurations and Helmet security headers integration.",
    ],
  },
  {
    title: "Desktop E-Voting System",
    category: "IoT & Python",
    icon: <Code2 size={22} />,
    desc: "Python desktop GUI application featuring role-based logins and persistent JSON databases.",
    longDesc:
      "A local GUI application built to simulate electronic elections. It features distinct panels for voters and administrators. Users can cast votes for registered candidates, while admins manage candidates and reset election data.",
    tags: ["Python", "Tkinter", "Pillow (PIL)", "JSON DB", "Desktop GUI"],
    githubLink: "https://github.com/ayushchoudhary22/voting-Machine-using-python",
    liveLink: "",
    achievements: [
      "Designed a robust role-based login system separating standard voters from administrative operators.",
      "Utilized JSON file storage to persistently track candidate records, vote metrics, and login credentials.",
      "Enforced voter verification to prevent duplicate votes in the same session.",
    ],
  },
  {
    title: "SDG-7 Clean Energy Analysis",
    category: "AI/ML & Big Data",
    icon: <Database size={22} />,
    desc: "Data Science research on global electrification access and clean energy trends using linear regression and statistical modeling.",
    longDesc:
      "An analytical study investigating global progress towards United Nations Sustainable Development Goal 7 (Affordable and Clean Energy). Processes decades of energy consumption datasets using regression algorithms to output sustainability predictions.",
    tags: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Linear Regression",
    ],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Parsed decades of renewable energy consumption databases across G20 nations using Pandas.",
      "Built linear regression models predicting electricity access and renewable energy shares for 2030.",
      "Produced clean Seaborn and Matplotlib visualization charts tracing clean energy adoption.",
    ],
  },
  {
    title: "IoT Telemetry Alert System",
    category: "IoT & Python",
    icon: <Cpu size={22} />,
    desc: "Serial interface script listening to Arduino hardware sensors and automating instant alerts via PySerial.",
    longDesc:
      "A bridge script linking hardware automation with user notification. Reads COM port telemetry from Arduino systems (e.g. soil moisture, automated valves) and automatically forwards notifications.",
    tags: ["Arduino", "Python", "Serial (PySerial)", "IoT", "Automation"],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Created continuous serial connection (9600 baud) using PySerial to listen for hardware updates.",
      "Parsed incoming sensor telemetry strings to filter background logs from action triggers.",
      "Implemented alert cooldowns to avoid notification spam and preserve system stability.",
    ],
  },
];

const certificationsData = [
  {
    title: "EC-Council Certified Ethical Hacker (CEH v13)",
    issuer: "EC-Council",
    desc: "Comprehensive ANSI-accredited cybersecurity credential verifying penetration testing methodologies, vulnerability assessments, network attack vectors, and countermeasures.",
    tags: ["Ethical Hacking", "CEH v13", "Penetration Testing", "Network Defense"],
    link: "/certificates/ECC-CEH-ANSI-Certificate.pdf",
    isImage: false,
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    desc: "Comprehensive 8-course credential covering incident triage, SIEM & SOC basics, Linux security, network defense, packet analysis, and SQL operations.",
    tags: ["Cybersecurity", "SIEM", "SOC Basics", "Incident Triage", "Linux"],
    link: "/certificates/coursera-google-1.pdf",
    isImage: false,
  },
  {
    title: "Red Hat System Administration I (RH124)",
    issuer: "Red Hat",
    desc: "Completed official Red Hat RH124 course verifying foundational Linux systems administration, user permissions, storage management, and process controls.",
    tags: ["Linux", "Red Hat", "SysAdmin", "Security"],
    link: "/certificates/red-hat.png",
    isImage: true,
  },
  {
    title: "IBM Python for Data Science, AI & Development",
    issuer: "IBM / Coursera",
    desc: "Validates proficiency in core Python programming, data analysis libraries (Pandas, NumPy), and consuming RESTful web APIs.",
    tags: ["Python", "Data Science", "AI", "REST APIs"],
    link: "/certificates/python-ds-ai.pdf",
    isImage: false,
  },
  {
    title: "Ethical Hacking Foundation",
    issuer: "Cybersecurity Training",
    desc: "Validates core principles of penetration testing lifecycle, network vulnerability scanning, threat identification, and remediation practices.",
    tags: ["Penetration Testing", "Ethical Hacking", "InfoSec"],
    link: "/certificates/ehf.pdf",
    isImage: false,
  },
  {
    title: "Big Data & Apache Spark",
    issuer: "Academic Credential",
    desc: "Demonstrates mastery of parallel computing paradigms, Spark DataFrames, distributed datasets, and batch/stream processing.",
    tags: ["Big Data", "Apache Spark", "Distributed Computing"],
    link: "/certificates/big-data.pdf",
    isImage: false,
  },
];

const techPills = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C / C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Tableau", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg" },
  { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((proj) => proj.category === activeFilter);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ayushchoudhary18481@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="app-container">
      {/* Modern Mesh Grid Background */}
      <div className="modern-mesh-bg" />

      {/* Floating Navbar */}
      <nav className="navbar">
        <a href="#" className="nav-brand">
          Ayush Choudhary
          <span className="nav-badge">CEH v13</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#credentials">Certifications</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">
          Let's Connect <ChevronRight size={14} />
        </a>
      </nav>

      {/* Hero Section */}
      <section id="about" className="section-container" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="hero-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeIn} className="hero-name" style={{ marginTop: "1rem" }}>
              Building Secure, <br />
              <span className="hero-name-gradient">Scalable Software</span>.
            </motion.h1>

            <motion.div variants={fadeIn} className="hero-roles">
              <span>Full-Stack Developer</span>
              <span style={{ color: "var(--accent-emerald)" }}>•</span>
              <span style={{ color: "var(--accent-amber)" }}>CEH v13 Certified</span>
              <span style={{ color: "var(--accent-emerald)" }}>•</span>
              <span>Data & ML</span>
            </motion.div>

            <motion.p variants={fadeIn} className="hero-bio">
              I'm Ayush Choudhary, a Computer Science Engineering student (2027 batch) at{" "}
              <strong style={{ color: "white" }}>JK Lakshmipat University</strong>. Certified in{" "}
              <strong style={{ color: "var(--accent-amber)" }}>EC-Council CEH v13</strong>, I specialize in full-stack development (React, FastAPI, Node.js), practical cybersecurity, and data analysis. Experienced in building demand forecasting pipelines at{" "}
              <strong style={{ color: "white" }}>Celebal Technologies</strong> and IoT systems at JNU.
            </motion.p>

            <motion.div variants={fadeIn} className="hero-badges-strip">
              <span className="hero-tag highlight">🛡️ EC-Council CEH v13</span>
              <span className="hero-tag">⚡ Full-Stack (MERN & FastAPI)</span>
              <span className="hero-tag">🐧 Linux SysAdmin (RH124)</span>
              <span className="hero-tag">📊 Tableau & R</span>
              <span className="hero-tag">🔍 Google Cybersecurity</span>
            </motion.div>

            <motion.div variants={fadeIn} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="/Ayush_Choudhary_Resume.pdf" download className="btn btn-primary">
                <Download size={18} /> Download Resume
              </a>
              <a href="#projects" className="btn btn-secondary">
                View Projects
              </a>
            </motion.div>
          </motion.div>

          {/* Photo & Developer Terminal Hub */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-visual-col"
          >
            {/* Real Headshot Profile Card */}
            <div className="hero-photo-card glass-panel">
              <div className="hero-photo-wrapper">
                <img
                  src="/profile.png"
                  alt="Ayush Choudhary"
                  className="hero-profile-img"
                />
                <div className="hero-photo-badge">
                  <Shield size={14} color="var(--accent-amber)" />
                  <span>EC-Council CEH v13</span>
                </div>
              </div>
              <div className="hero-photo-footer">
                <div>
                  <h3 className="hero-photo-name">Ayush Choudhary</h3>
                  <p className="hero-photo-role">Full-Stack Dev & Cybersecurity</p>
                </div>
                <div className="hero-photo-status">
                  <span className="pulse-dot" />
                  <span>JKLU CSE '27</span>
                </div>
              </div>
            </div>

            {/* Terminal Window */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                </div>
                <span className="terminal-title">ayush@sec-node:~ (zsh)</span>
                <Shield size={14} color="var(--accent-emerald)" />
              </div>

              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="terminal-prompt">ayush@sec-node:~$ </span>
                  <span className="terminal-cmd">whoami</span>
                  <div className="terminal-output">
                    Ayush Choudhary — B.Tech CSE '27 @ JKLU
                  </div>
                </div>

                <div className="terminal-line">
                  <span className="terminal-prompt">ayush@sec-node:~$ </span>
                  <span className="terminal-cmd">secops --credentials</span>
                  <div className="terminal-output">
                    <span className="terminal-gold">[★] EC-Council CEH v13 (Certified Ethical Hacker)</span>
                    <br />
                    <span>[+] Google Cybersecurity Professional</span>
                    <br />
                    <span>[+] Red Hat System Administration I (RH124)</span>
                  </div>
                </div>

                <div className="terminal-line" style={{ marginBottom: 0 }}>
                  <span className="terminal-prompt">ayush@sec-node:~$ </span>
                  <span className="terminal-cmd">echo $STACK</span>
                  <div className="terminal-output terminal-highlight">
                    Python • React • FastAPI • C++ • Linux • Tableau • R • Nmap
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <div className="stats-strip">
          <div className="stat-item">
            <div className="stat-number">10<span>+</span></div>
            <div className="stat-label">Projects Built & Deployed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">CEH<span> v13</span></div>
            <div className="stat-label">EC-Council Certified</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2<span></span></div>
            <div className="stat-label">Internships (Celebal & JNU)</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98.8<span>%</span></div>
            <div className="stat-label">Spam/Phishing Model Accuracy</div>
          </div>
        </div>
      </section>

      {/* Featured Certifications Section */}
      <section id="credentials" className="section-container">
        <div className="section-header">
          <span className="section-tag">
            <Award size={14} /> Professional Qualifications
          </span>
          <h2 className="section-title">Industry Certifications</h2>
          <p className="section-subtitle">
            Accredited credentials across Ethical Hacking, Linux Systems Administration, Cybersecurity, and Data Engineering.
          </p>
        </div>

        <div className="certs-container">
          {/* Hero Highlight Card: EC-Council CEH v13 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="featured-ceh-card"
          >
            <div className="featured-ceh-badge">
              <Sparkles size={14} /> Featured Credential • Active
            </div>

            <div className="ceh-grid">
              <div>
                <h3 className="ceh-title">Certified Ethical Hacker (CEH v13)</h3>
                <div className="ceh-org">EC-Council — International Cybersecurity Standard</div>
                <p className="ceh-desc">
                  Demonstrates comprehensive practical knowledge of ethical hacking methodologies, vulnerability assessment, threat intelligence, network attack vectors, system hardening, and countermeasures against modern cyber threats.
                </p>

                <div className="ceh-domains-list">
                  {[
                    "Reconnaissance & Footprinting",
                    "Network Scanning (Nmap/Wireshark)",
                    "Vulnerability Assessment",
                    "System Hacking & Malware Analysis",
                    "Web App Attacks (SQLi / XSS)",
                    "Cryptography & Defense",
                  ].map((dom, i) => (
                    <span key={i} className="ceh-domain-pill">
                      ✓ {dom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ceh-meta-box">
                <div className="ceh-meta-row">
                  <span className="ceh-meta-label">Credential</span>
                  <span className="ceh-meta-val">CEH v13</span>
                </div>
                <div className="ceh-meta-row">
                  <span className="ceh-meta-label">Issuing Authority</span>
                  <span className="ceh-meta-val">EC-Council</span>
                </div>
                <div className="ceh-meta-row">
                  <span className="ceh-meta-label">Domain</span>
                  <span className="ceh-meta-val">Offensive & Defensive Security</span>
                </div>
                <div className="ceh-meta-row" style={{ borderBottom: "none", paddingBottom: "0.4rem" }}>
                  <span className="ceh-meta-label">Status</span>
                  <span className="ceh-meta-val" style={{ color: "var(--accent-emerald)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <CheckCircle2 size={15} /> Verified Holder
                  </span>
                </div>

                <div style={{ paddingTop: "0.8rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                  <a
                    href="/certificates/ECC-CEH-ANSI-Certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      background: "var(--accent-amber)",
                      borderColor: "var(--accent-amber)",
                      color: "#070a12",
                      fontWeight: 700,
                      padding: "0.75rem 1.2rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <Download size={16} /> Open Official CEH Certificate (PDF)
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid of Other Accreditations */}
          <div className="certs-grid">
            {certificationsData.map((cert, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: index * 0.08 } },
                }}
                className="glass-panel cert-card"
              >
                <div className="cert-card-header">
                  <div className="cert-icon-wrapper">
                    <Award size={22} />
                  </div>
                  <div>
                    <h4 className="cert-title">{cert.title}</h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontFamily: "'Fira Code', monospace" }}>
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                <p className="cert-desc">{cert.desc}</p>

                <div className="project-tags" style={{ marginBottom: "1.2rem" }}>
                  {cert.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn-link"
                >
                  {cert.isImage ? "View Certificate Image" : "Open PDF Credential"}
                  <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container">
        <div className="section-header">
          <span className="section-tag">
            <Terminal size={14} /> Technical Arsenal
          </span>
          <h2 className="section-title">Core Competencies</h2>
          <p className="section-subtitle">
            Languages, frameworks, security toolsets, and analytics engines used across development and security auditing.
          </p>
        </div>

        {/* Tech Icon Badges */}
        <div className="tech-icons-row">
          {techPills.map((tech, i) => (
            <div key={i} className="tech-icon-pill">
              <img src={tech.icon} alt={tech.name} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Categorized Skills */}
        <div className="skills-grid">
          {[
            {
              title: "Cybersecurity & SecOps",
              icon: <Shield size={22} color="var(--accent-emerald)" />,
              skills: [
                "EC-Council CEH v13 Concepts",
                "Vulnerability Scanning (Nmap, SQLMap)",
                "Network Packet Analysis (Wireshark)",
                "Linux OS Hardening (RHEL, Ubuntu, Kali)",
                "Web Application Security (OWASP Top 10)",
                "Email Security Basics (SPF, DKIM, DMARC)",
              ],
            },
            {
              title: "Full-Stack Web Development",
              icon: <Code2 size={22} color="var(--accent-cyan)" />,
              skills: [
                "React.js & Tailwind CSS",
                "FastAPI & Python REST APIs",
                "Node.js & Express.js Backends",
                "MongoDB & MySQL Databases",
                "JWT & PBKDF2 Password Hashing",
                "Azure AD SSO & OAuth Integration",
              ],
            },
            {
              title: "Data Science & Analytics",
              icon: <BarChart3 size={22} color="var(--accent-amber)" />,
              skills: [
                "Tableau (Interactive Dashboards)",
                "R Programming for Data Analysis",
                "Python (Pandas, NumPy, Scikit-Learn)",
                "Time Series Forecasting (XGBoost, SARIMA)",
                "Streamlit Dashboard Development",
                "Explainable AI (SHAP)",
              ],
            },
            {
              title: "Systems & Programming Languages",
              icon: <Terminal size={22} color="var(--accent-blue)" />,
              skills: [
                "Python (Scripting & Automation)",
                "C / C++ (Data Structures & OOP)",
                "Bash Scripting & CLI Tooling",
                "Git & GitHub Version Control",
                "Docker Basics & Containerization",
                "Hardware Telemetry (PySerial / Arduino)",
              ],
            },
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { delay: idx * 0.08 } },
              }}
              className="glass-panel skill-card"
            >
              <div className="skill-card-top">
                {cat.icon}
                <h4 className="skill-card-title">{cat.title}</h4>
              </div>
              <ul className="skill-items-list">
                {cat.skills.map((skill, i) => (
                  <li key={i} className="skill-item-row">
                    <span className="skill-bullet" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="section-container">
        <div className="section-header">
          <span className="section-tag">
            <Globe size={14} /> Career Journey
          </span>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            Hands-on internships and formal engineering education in Computer Science and Cybersecurity.
          </p>
        </div>

        <div className="timeline">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="timeline-item">
            <div className="timeline-dot" />
            <span className="timeline-date">MAY 2026 — JULY 2026</span>
            <h3 className="timeline-title">Data Science Intern</h3>
            <h4 className="timeline-company">Celebal Technologies • Remote (Jaipur, Rajasthan)</h4>
            <ul className="timeline-bullets">
              <li>
                Built <strong>RetailSense AI</strong> — an enterprise XGBoost demand forecasting pipeline on 5 years of historical sales data, reducing MAE by 41.4% and projecting <strong>$2.45M in annual ROI</strong>.
              </li>
              <li>
                Engineered country socio-economic clustering models with K-Means, DBSCAN, and PCA across 167 global regions.
              </li>
              <li>
                Developed a 100% offline RAG Document Question-Answering chatbot in Streamlit using TF-IDF indexing and BM25 ranking for local, confidential querying.
              </li>
              <li>
                Maintained production-grade MLOps standards with Pytest unit testing and modular object-oriented Python architecture.
              </li>
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="timeline-item">
            <div className="timeline-dot" style={{ borderColor: "var(--accent-cyan)" }} />
            <span className="timeline-date">MAY 2025 — JULY 2025</span>
            <h3 className="timeline-title">IoT & Systems Intern</h3>
            <h4 className="timeline-company">Jawaharlal Nehru University (JNU) • Delhi, India</h4>
            <ul className="timeline-bullets">
              <li>
                Designed hardware-to-cloud IoT automation setups, recording sensor telemetry streams for smart irrigation and environmental metrics.
              </li>
              <li>
                Created automated Python scripts using PySerial to read edge sensor logs over serial ports and filter background noise.
              </li>
              <li>
                Integrated alert triggers and cooldown protocols to detect offline devices and dispatch instant notifications.
              </li>
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="timeline-item">
            <div className="timeline-dot" style={{ borderColor: "var(--accent-amber)" }} />
            <span className="timeline-date">2023 — 2027</span>
            <h3 className="timeline-title">B.Tech in Computer Science Engineering</h3>
            <h4 className="timeline-company">JK Lakshmipat University • Jaipur, Rajasthan</h4>
            <ul className="timeline-bullets">
              <li>
                Core subjects: Data Structures & Algorithms, Computer Networks, Operating Systems, Database Management Systems, and Cryptography.
              </li>
              <li>
                Hands-on labs in Linux administration (RHEL), network vulnerability auditing, and full-stack software development.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <div className="section-header">
          <span className="section-tag">
            <Code2 size={14} /> Proven Work
          </span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of production software, security scanners, full-stack web applications, and machine learning pipelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-container">
          {projectCategories.map((cat, i) => (
            <button
              key={i}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="glass-panel project-card"
              >
                <div className="project-card-header">
                  <div className="project-icon-box">{project.icon}</div>
                  <span className="project-category-tag">{project.category}</span>
                </div>

                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.desc}</p>

                <div className="project-tags">
                  {project.tags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="tag">+{project.tags.length - 4} more</span>
                  )}
                </div>

                <div className="project-links-row">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="project-btn-link"
                  >
                    <Eye size={15} /> Details
                  </button>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn-link"
                    >
                      <FaGithub size={15} /> Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn-link"
                      style={{ color: "var(--accent-emerald)" }}
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                <X size={18} />
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                <span className="project-category-tag">{selectedProject.category}</span>
              </div>

              <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem", color: "white" }}>
                {selectedProject.title}
              </h3>

              <p style={{ color: "var(--text-secondary)", fontSize: "1.02rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                {selectedProject.longDesc}
              </p>

              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "0.8rem" }}>
                Key Technical Highlights
              </h4>
              <ul className="timeline-bullets" style={{ marginBottom: "1.8rem" }}>
                {selectedProject.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>

              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "0.8rem" }}>
                Technologies Used
              </h4>
              <div className="project-tags" style={{ marginBottom: "2rem" }}>
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="tag" style={{ borderColor: "rgba(16, 185, 129, 0.3)", color: "var(--accent-emerald)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
                {selectedProject.githubLink && (
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "0.6rem 1.3rem" }}>
                    <FaGithub size={16} /> View Source Code
                  </a>
                )}
                {selectedProject.liveLink && (
                  <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "0.6rem 1.3rem" }}>
                    <ExternalLink size={16} /> Launch Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="section-container">
        <div className="section-header">
          <span className="section-tag">
            <Mail size={14} /> Direct Connection
          </span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Open for software engineering roles, cybersecurity internships, and technical development projects.
          </p>
        </div>

        <div className="contact-grid">
          <div className="glass-panel contact-card">
            <div className="contact-icon-box">
              <Mail size={22} />
            </div>
            <div className="contact-label">Email Address</div>
            <a href="mailto:ayushchoudhary18481@gmail.com" className="contact-value">
              ayushchoudhary18481@gmail.com
            </a>
            <button onClick={handleCopyEmail} className="copy-btn">
              {copiedEmail ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
              {copiedEmail ? "Copied to Clipboard!" : "Copy Email"}
            </button>
          </div>

          <div className="glass-panel contact-card">
            <div className="contact-icon-box">
              <FaLinkedin size={22} />
            </div>
            <div className="contact-label">LinkedIn Profile</div>
            <a
              href="https://linkedin.com/in/ayush-choudhary-767080285/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-value"
            >
              linkedin.com/in/ayush-choudhary
            </a>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Let's connect professionally
            </span>
          </div>

          <div className="glass-panel contact-card">
            <div className="contact-icon-box">
              <FaGithub size={22} />
            </div>
            <div className="contact-label">GitHub Repositories</div>
            <a
              href="https://github.com/ayushchoudhary22"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-value"
            >
              github.com/ayushchoudhary22
            </a>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Inspect live codebases & commits
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>
          © {new Date().getFullYear()} Ayush Choudhary. Crafted with React & modern CSS.
        </p>
      </footer>
    </div>
  );
}
