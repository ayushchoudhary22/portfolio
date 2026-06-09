import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Download, ExternalLink, Code2, Shield, Database,
  Terminal, Award, Server, Cpu, Eye, X, BookOpen, Layers,
  Globe, Filter, MapPin, Briefcase, GraduationCap
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './index.css';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const projectCategories = ["All", "Web & Full-Stack", "Cybersecurity", "AI/ML & Big Data", "IoT & Python"];

const projectsData = [
  {
    title: "JKLU Cafeteria Portal",
    category: "Web & Full-Stack",
    icon: <Globe size={24} />,
    desc: "MERN check-in and booking engine with Azure AD SSO integration, Razorpay verification, and dynamic QR entry.",
    longDesc: "A production-ready cafeteria digitized check-in and billing portal for JKLU students. Replacing slow and manual paper tracking, this application secures user onboarding with Microsoft SSO and enables fast dynamic QR-code scans for entry verification.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Azure AD SSO", "Razorpay", "Tailwind CSS"],
    githubLink: "https://github.com/JKLU-MessPortal/Mess-Portal-",
    liveLink: "https://mess-portal-frontend.vercel.app/",
    achievements: [
      "Engineered dynamic check-in module generating encrypted QR codes for instant cafeteria entry.",
      "Integrated Microsoft Azure AD SSO for domain-restricted student login with role-based access control.",
      "Embedded Razorpay Payment Gateway backed by HMAC-SHA256 signature verification for meal booking safety.",
      "Built clean Tailwind UI with animated blur-modals, real-time scanning feed, and dietary preferences selector."
    ]
  },
  {
    title: "AI Penetration Testing Suite",
    category: "Cybersecurity",
    icon: <Shield size={24} />,
    desc: "Automated vulnerability scanner combining multi-threaded crawlers, SQLi/XSS detectors, and Gemini AI advice.",
    longDesc: "A modular, full-stack cybersecurity audit tool written in Python & Flask. Featuring high-speed network diagnostics, spider crawling, and active vulnerability verification, the app relies on the Google Gemini API to analyze threats and output detailed code fixes.",
    tags: ["Python", "Flask", "WebSockets", "Google Gemini API", "Nmap", "SQLMap", "Web Crawler"],
    githubLink: "https://github.com/ayushchoudhary22/Pentration-Tool",
    liveLink: "",
    achievements: [
      "Built custom multi-threaded crawler to index targets, extract headers, cookies, and discover hidden endpoints.",
      "Designed active detection engines for error-based SQL Injection and reflective Cross-Site Scripting (XSS).",
      "Integrated Google Gemini API to review vulnerability payloads and output actionable, step-by-step code remediations.",
      "Created a real-time terminal stream to the UI using Socket.io and compiled beautiful downloadable HTML/PDF reports."
    ]
  },
  {
    title: "Smart City Streaming Pipeline",
    category: "AI/ML & Big Data",
    icon: <Cpu size={24} />,
    desc: "Real-time traffic & pollution analytics pipeline using Apache Spark, Kafka streams, and PostgreSQL database.",
    longDesc: "A scalable data streaming engine designed to simulate and process city telemetry. Reads real-time data feeds from Kafka topics, aggregates records through time-window bounds in Spark, and writes output to a database for analytical charts.",
    tags: ["Apache Spark", "Kafka", "PySpark", "PostgreSQL", "Data Streaming", "Python"],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Simulated continuous telemetry feeds using Kafka producers with 10-second-rounded timestamps.",
      "Aggregated vehicle speeds and PM2.5/PM10 metrics using 10s tumbling windows with 60s watermarks in Spark.",
      "Performed windowed stream-stream joins to align traffic patterns with environmental data.",
      "Persisted joined analytical records to PostgreSQL database using optimized foreachBatch Spark handlers."
    ]
  },
  {
    title: "Distributed News Recommender",
    category: "AI/ML & Big Data",
    icon: <Database size={24} />,
    desc: "MapReduce recommendation engine running on Python mrjob to compute Document-Term Matrix (DTM) and Cosine Similarity.",
    longDesc: "A distributed big data pipeline designed to recommend news articles based on user histories. Employs MapReduce algorithms to build text vectors, aggregate user reading logs, and calculate vector similarities.",
    tags: ["MapReduce", "Python", "mrjob", "TF-IDF", "Cosine Similarity", "Algorithms"],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Tokenized and computed Document-Term Matrix frequencies over thousands of text records in MapReduce mapper/reducer tasks.",
      "Aggregated user reading logs to build customized preference weights for individual user profiles.",
      "Precomputed document magnitudes to quickly calculate Cosine Similarity scores for recommended candidate lists.",
      "Utilized Python heapq to return the top N matching articles per user with minimal memory overhead."
    ]
  },
  {
    title: "Oil-Mil E-Commerce System",
    category: "Web & Full-Stack",
    icon: <Layers size={24} />,
    desc: "Organic store portal with interactive shopping cart checkout and secure, JWT-based admin inventory console.",
    longDesc: "A specialized MERN e-commerce application serving organic oil customers. It offers a catalog view, cart checkout processes, and a secure dashboard for administrative managers to monitor bookings and update stock lists.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bcrypt", "Tailwind CSS"],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Engineered clean shopping interface with real-time cart subtotal calculations and product filters.",
      "Restricted admin operations using JWT cookie verify protocols and cryptographic Bcrypt password hashing.",
      "Created structured Order schemas storing client addresses, contact logs, and items quantities.",
      "Secured API endpoints with CORS configurations and Helmet security headers integration."
    ]
  },
  {
    title: "Spam Detection Ensemble",
    category: "AI/ML & Big Data",
    icon: <Terminal size={24} />,
    desc: "Hybrid voting classifier and CNN deep learning models comparing email spam classification accuracy.",
    longDesc: "An advanced machine learning and deep learning project analyzing SMS and email data. Contrasts standard algorithms using TF-IDF feature mapping against an 1D Convolutional Neural Network (CNN) to achieve high-performance text classification.",
    tags: ["Python", "Scikit-Learn", "TensorFlow", "Keras", "NLP", "Streamlit", "CNN"],
    githubLink: "https://github.com/ayushchoudhary22/Spam-Email-Detection",
    liveLink: "",
    achievements: [
      "Developed a Hybrid VotingClassifier (Naive Bayes + Linear SVM + Random Forest) hitting a solid 97.66% accuracy.",
      "Trained a Keras CNN (Embedding, Conv1D, MaxPooling, Dropout) achieving 98.83% spam detection accuracy.",
      "Cleaned data strings through tokenization, stopwords stripping, and text vectorization preprocessing.",
      "Created a Streamlit web portal allowing users to type and evaluate email snippets dynamically."
    ]
  },
  {
    title: "Desktop E-Voting System",
    category: "IoT & Python",
    icon: <Briefcase size={24} />,
    desc: "Python Tkinter GUI application with role-based logins and persistent JSON databases.",
    longDesc: "A local GUI application built to simulate electronic elections. It features distinct panels for voters and administrators. Users can cast votes for registered candidates, while admins manage candidates and reset election data.",
    tags: ["Python", "Tkinter", "Pillow (PIL)", "JSON DB", "Desktop GUI"],
    githubLink: "https://github.com/ayushchoudhary22/voting-Machine-using-python",
    liveLink: "",
    achievements: [
      "Designed a robust role-based login system separating standard voters from administrative operators.",
      "Utilized JSON file storage to persistently track candidate records, vote metrics, and login credentials.",
      "Rendered custom university branding logos and candidate avatars using Python Pillow (PIL).",
      "Enforced voter verification to prevent multiple vote casting in the same session."
    ]
  },
  {
    title: "SDG-7 Clean Energy Analysis",
    category: "AI/ML & Big Data",
    icon: <BookOpen size={24} />,
    desc: "Data Science research on global electrification access and clean energy trends using linear regression.",
    longDesc: "An analytical study investigating global progress towards United Nations Sustainable Development Goal 7 (Affordable and Clean Energy). Processes decades of energy consumption datasets using regression algorithms to output sustainability predictions.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Linear Regression", "Data Science"],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Parsed decades of renewable energy consumption databases across G20 nations using Pandas.",
      "Built linear regression models predicting electricity access and renewable energy shares for 2030.",
      "Performed hypothesis testing to check significance levels of regional efficiency improvements.",
      "Produced clean Seaborn and Matplotlib visualization charts tracing India's energy transition."
    ]
  },
  {
    title: "IoT WhatsApp Alert System",
    category: "IoT & Python",
    icon: <Cpu size={24} />,
    desc: "Serial interface script listening to Arduino sensors and automating instant alerts via pywhatkit.",
    longDesc: "A bridge script linking hardware automation with user notification. Reads COM port telemetry from Arduino systems (e.g. soil moisture, automated valves) and automatically forwards notifications to WhatsApp.",
    tags: ["Arduino", "Python", "Serial (pyserial)", "pywhatkit", "IoT", "Automation"],
    githubLink: "",
    liveLink: "",
    achievements: [
      "Created continuous serial connection (COM3/9600 baud) using pyserial to listen for hardware updates.",
      "Parsed incoming sensor telemetry strings to filter out background logs from action triggers.",
      "Integrated pywhatkit library to dispatch automated WhatsApp alert messages to phone numbers.",
      "Implemented alert cooldowns to avoid message spam and preserve system stability."
    ]
  }
];

const certificationsData = [
  {
    title: "Red Hat System Administration I (RH124)",
    desc: "Completed RH124 course verifying foundational Linux systems administration, permission structures, command line, and process controls.",
    tags: ["Linux", "Red Hat", "SysAdmin"],
    link: "/certificates/red-hat.png",
    isImage: true
  },
  {
    title: "Google Cybersecurity Certification",
    desc: "Multi-course certification covering network configurations, Linux systems, SQL operations, and security risk mitigations.",
    tags: ["Cybersecurity", "Google", "SQL", "Network Security"],
    link: "/certificates/coursera-google-1.pdf",
    isImage: false
  },
  {
    title: "Python for Data Science, AI & Development",
    desc: "Coursera certification by IBM validating core Python coding, library usage (Pandas, NumPy), and web APIs interaction.",
    tags: ["Python", "Data Science", "AI", "IBM"],
    link: "/certificates/python-ds-ai.pdf",
    isImage: false
  },
  {
    title: "Ethical Hacking Foundation",
    desc: "Security training confirming knowledge of penetration testing phases, network vulnerability scanning, and defense practices.",
    tags: ["Cybersecurity", "Ethical Hacking", "InfoSec"],
    link: "/certificates/ehf.pdf",
    isImage: false
  },
  {
    title: "Big Data & Apache Spark",
    desc: "Academic credential demonstrating mastery of parallel data structures, Spark DataFrames, and distributed compute concepts.",
    tags: ["Big Data", "Apache Spark", "Distributed Computing"],
    link: "/certificates/big-data.pdf",
    isImage: false
  }
];

function InteractiveBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;

        // Match theme colors: primary (#45f3ff), secondary (#ff2a70), accent (#bd93f9)
        const rand = Math.random();
        if (rand < 0.5) {
          this.color = 'rgba(69, 243, 255, 0.45)';
        } else if (rand < 0.8) {
          this.color = 'rgba(255, 42, 112, 0.45)';
        } else {
          this.color = 'rgba(189, 147, 249, 0.45)';
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Smooth mouse attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 0.25;
            this.y += (dy / dist) * force * 0.25;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 22000));
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 100) {
            const alpha = ((100 - dist) / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(69, 243, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const alpha = ((mouse.radius - dist) / mouse.radius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 42, 112, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-bg-canvas" />;
}

const typewriterRoles = [
  'Full-Stack Developer',
  'Security Engineer',
  'Data Science Engineer'
];

function TypewriterText() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = typewriterRoles[roleIndex];
    let timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % typewriterRoles.length);
    } else {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="typewriter-wrapper">
      {text}
      <span className="typewriter-cursor" />
    </span>
  );
}

const skillBubblesData = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'C/C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
];

function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(proj => proj.category === activeFilter);

  return (
    <div className="app">
      {/* Animated Cyber Background */}
      <div className="bg-animation-container">
        <div className="cyber-grid"></div>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <InteractiveBg />

      {/* Navigation */}
      <nav>
        <a href="#" className="nav-logo">Ayush<span>.</span></a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certificates">Certificates</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="about" className="section-container" style={{ minHeight: '100vh', paddingTop: '8.5rem', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem', width: '100%' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ flex: '1.2', minWidth: '320px' }}
          >
            <motion.h2 variants={fadeIn} style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              B.Tech CSE Cybersecurity Student
            </motion.h2>
            <motion.h1 variants={fadeIn} style={{ fontSize: '4.2rem', lineHeight: '1.1', marginBottom: '1.2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Ayush Choudhary
            </motion.h1>
            <motion.h3 variants={fadeIn} style={{ fontSize: '1.8rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '1.5rem' }}>
              <TypewriterText />
            </motion.h3>

            <motion.div variants={fadeIn} className="role-badges">
              {['MERN Stack', 'Cybersecurity', 'Big Data', 'IoT', 'Python'].map((role, i) => (
                <span key={i} className="role-badge">{role}</span>
              ))}
            </motion.div>

            <motion.p variants={fadeIn} style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '620px', lineHeight: '1.7' }}>
              I study at <strong style={{ color: 'white' }}>JK Lakshmipat University</strong>. I build robust full-stack applications with the MERN stack and write secure, automated code. From AI-powered security crawlers to Kafka-based big data pipelines, I enjoy architecting reliable systems.
            </motion.p>

            <motion.div variants={fadeIn} className="info-cards-row">
              <div className="info-card">
                <span className="info-card-icon">📍</span>
                <div>
                  <div className="info-card-label">Location</div>
                  <div className="info-card-value">Jaipur, Rajasthan</div>
                </div>
              </div>
              <div className="info-card">
                <span className="info-card-icon">💼</span>
                <div>
                  <div className="info-card-label">Expertise</div>
                  <div className="info-card-value">Full-Stack & Security</div>
                </div>
              </div>
              <div className="info-card">
                <span className="info-card-icon">📧</span>
                <div>
                  <div className="info-card-label">Contact</div>
                  <div className="info-card-value">ayushchoudhary18481@gmail.com</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <a href="/Ayush_Choudhary_Resume.pdf" download className="btn btn-primary">
                <Download size={18} /> Get Resume
              </a>
              <a href="#projects" className="btn btn-secondary">
                Explore Projects
              </a>
            </motion.div>

            <motion.div variants={fadeIn} style={{ display: 'flex', gap: '1.5rem', marginTop: '3.5rem' }}>
              <a href="https://github.com/ayushchoudhary22" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: 'var(--text-muted)' }}>
                <FaGithub size={26} />
              </a>
              <a href="https://linkedin.com/in/ayush-choudhary-767080285/" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: 'var(--text-muted)' }}>
                <FaLinkedin size={26} />
              </a>
              <a href="mailto:ayushchoudhary18481@gmail.com" className="social-icon" style={{ color: 'var(--text-muted)' }}>
                <Mail size={26} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            style={{ flex: '0.8', display: 'flex', justifyContent: 'center', minWidth: '300px' }}
          >
            <div style={{ position: 'relative', width: '330px', height: '330px' }}>
              <div className="avatar-glow"></div>
              <div className="glass-panel" style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img
                  src="/profile.jpg"
                  alt="Ayush Avatar"
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="section-title"
        >
          Technical Competence
        </motion.h2>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="skill-bubbles-section"
        >
          <div className="skill-bubbles">
            {skillBubblesData.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="skill-bubble"
              >
                <img src={skill.icon} alt={skill.name} />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="skills-grid">
          {[
            {
              title: 'Web Technologies',
              icon: <Code2 size={24} color="var(--primary)" />,
              skills: ['React.js & Tailwind CSS', 'Node.js & Express.js', 'MongoDB (MERN)', 'JWT & Bcrypt Auth', 'Razorpay & Azure AD Integration']
            },
            {
              title: 'Programming Languages',
              icon: <Terminal size={24} color="var(--secondary)" />,
              skills: ['Python (Scripting & OOP)', 'C / C++ Development', 'SQL (MySQL & Postgres)', 'Data Structures & Algorithms']
            },
            {
              title: 'Cybersecurity & Tools',
              icon: <Shield size={24} color="var(--primary)" />,
              skills: ['Linux (Ubuntu, Kali)', 'Vulnerability Testing', 'Wireshark & Nmap', 'Git & GitHub Version Control', 'Google Gemini API Integration']
            },
            {
              title: 'Data & Machine Learning',
              icon: <Database size={24} color="var(--secondary)" />,
              skills: ['Apache Spark / PySpark', 'Apache Kafka Streaming', 'MapReduce (mrjob)', 'Scikit-Learn (ML Models)', 'Pandas, NumPy & Seaborn']
            }
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: idx * 0.08 } } }}
              className="glass-panel skill-category"
            >
              <div className="skill-category-title">
                {cat.icon}
                <h4>{cat.title}</h4>
              </div>
              <ul className="skills-list">
                {cat.skills.map((skill, i) => (
                  <li key={i} className="skill-item">
                    <span className="skill-dot"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-container">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="section-title"
        >
          Education & Experience
        </motion.h2>
        <div className="timeline">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="timeline-item"
          >
            <div className="timeline-dot"></div>
            <span className="timeline-date">MAY 2025 - JUL 2025</span>
            <h3 className="timeline-title">IoT Intern</h3>
            <h4 className="timeline-company">Jawaharlal Nehru University (JNU) • Delhi, India</h4>
            <ul className="timeline-bullets">
              <li>Designed and developed IoT automation projects, including smart water supply and soil absorption networks.</li>
              <li>Integrated hardware components using Arduino, serial decoders, and cloud databases for real-time sensor updates.</li>
              <li>Analyzed sensor data pipelines to boost automated water valve responsiveness and system reliability.</li>
              <li>Wrote Python bridging scripts to automate instant hardware status warnings via WhatsApp notifications.</li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="timeline-item"
          >
            <div className="timeline-dot" style={{ borderColor: 'var(--secondary)' }}></div>
            <span className="timeline-date">2023 - 2027</span>
            <h3 className="timeline-title">B.Tech in Computer Science Engineering (Cybersecurity)</h3>
            <h4 className="timeline-company">JK Lakshmipat University • Jaipur, Rajasthan</h4>
            <ul className="timeline-bullets">
              <li>Core studies: Data Structures & Algorithms, Cryptography, Database Management Systems, Computer Networks.</li>
              <li>Applied hands-on labs in Linux administration, ethical hacking modules, and secure web application development.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="section-title"
        >
          Academic & Personal Projects
        </motion.h2>

        {/* Filter Controls */}
        <div className="filter-container">
          {projectCategories.map((cat, i) => (
            <button
              key={i}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-panel project-card"
              >
                <div className="project-card-header">
                  <div className="project-icon">{project.icon}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{project.category}</span>
                </div>

                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.desc}</p>

                <div className="project-tags">
                  {project.tags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="tag">+{project.tags.length - 4} more</span>
                  )}
                </div>

                <div className="project-links">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="project-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Eye size={16} /> Details
                  </button>
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaGithub size={16} /> Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      <ExternalLink size={16} /> Live
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
              className="glass-panel modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                <span className="project-icon" style={{ color: 'var(--secondary)' }}>{selectedProject.icon}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {selectedProject.category}
                </span>
              </div>

              <h3 style={{ fontSize: '2rem', marginBottom: '1.2rem', fontWeight: 800 }}>{selectedProject.title}</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {selectedProject.longDesc}
              </p>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem', color: 'white' }}>Key Implementations & Features</h4>
              <ul className="timeline-bullets" style={{ marginBottom: '2rem' }}>
                {selectedProject.achievements.map((ach, i) => (
                  <li key={i} style={{ fontSize: '0.95rem' }}>{ach}</li>
                ))}
              </ul>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem', color: 'white' }}>Technologies Used</h4>
              <div className="project-tags" style={{ marginBottom: '2rem' }}>
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="tag" style={{ borderColor: 'rgba(69, 243, 255, 0.15)', color: 'var(--primary)' }}>{tag}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem' }}>
                {selectedProject.githubLink && (
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                    <FaGithub size={18} /> View Source Code
                  </a>
                )}
                {selectedProject.liveLink && (
                  <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1.4rem' }}>
                    <ExternalLink size={18} /> Launch Live Site
                  </a>
                )}
                {!selectedProject.githubLink && !selectedProject.liveLink && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    Corporate/Academic environment restricted access. Files details can be requested.
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certifications Section */}
      <section id="certificates" className="section-container">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="section-title"
        >
          Academic Certifications
        </motion.h2>
        <div className="certs-grid">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={index}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { delay: index * 0.08 } } }}
              className="glass-panel cert-card"
              style={{ padding: '2rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(255, 42, 112, 0.05)', borderRadius: '10px', color: 'var(--secondary)', border: '1px solid rgba(255, 42, 112, 0.1)' }}>
                  <Award size={26} />
                </div>
                <h3 className="cert-title">{cert.title}</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', flexGrow: 1, marginBottom: '1.8rem' }}>
                {cert.desc}
              </p>
              <div>
                <div className="project-tags" style={{ marginBottom: '1.2rem' }}>
                  {cert.tags.map((tag, i) => (
                    <span key={i} className="tag" style={{ borderColor: 'rgba(255, 42, 112, 0.15)', color: 'var(--secondary)' }}>{tag}</span>
                  ))}
                </div>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {cert.isImage ? "View Certificate" : "Open PDF Credential"} <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="section-title"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}
        >
          Open for software development internships, cybersecurity audits, and academic coding projects. Let's build something great together.
        </motion.p>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="contact-grid"
        >
          <motion.div variants={fadeIn} className="contact-card">
            <div className="contact-card-icon">
              <Mail size={24} color="var(--primary)" />
            </div>
            <span className="contact-card-label">Email</span>
            <a href="mailto:ayushchoudhary18481@gmail.com">ayushchoudhary18481@gmail.com</a>
          </motion.div>
          <motion.div variants={fadeIn} className="contact-card">
            <div className="contact-card-icon">
              <FaGithub size={24} color="var(--primary)" />
            </div>
            <span className="contact-card-label">GitHub</span>
            <a href="https://github.com/ayushchoudhary22" target="_blank" rel="noopener noreferrer">github.com/ayushchoudhary22</a>
          </motion.div>
          <motion.div variants={fadeIn} className="contact-card">
            <div className="contact-card-icon">
              <FaLinkedin size={24} color="var(--primary)" />
            </div>
            <span className="contact-card-label">LinkedIn</span>
            <a href="https://linkedin.com/in/ayush-choudhary-767080285/" target="_blank" rel="noopener noreferrer">linkedin.com/in/ayush-choudhary</a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5, 5, 8, 0.4)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Ayush Choudhary. Built with React, CSS variables & Framer Motion.
        </p>
      </footer>
    </div>
  );
}

export default App;
