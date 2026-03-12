"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  // --- HERO SECTION REFS & STATE ---
  const [typedText, setTypedText] = useState('');
  const canvasRef = useRef(null); // Hero neural background
  const profileCardRef = useRef(null);

  // --- KNOWLEDGE MAP REFS ---
  const mapContainerRef = useRef(null);
  const mapMainCanvasRef = useRef(null);
  const mapBgCanvasRef = useRef(null);
  const tooltipRef = useRef(null);
  const tooltipTitleRef = useRef(null);
  const tooltipDescRef = useRef(null);

  // ----------------------------------------------------
  // 1. HERO SECTION: TYPING ANIMATION
  // ----------------------------------------------------
  useEffect(() => {
    const phrases = [
      "Machine Learning Enthusiast",
      "AI Developer",
      "Data Analytics Explorer",
      "Intelligent Systems Builder"
    ];
    const typingSpeed = 70;
    const eraseSpeed = 40;
    const delayBetweenPhrases = 2500;

    let phraseIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    let typingTimer;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (!isErasing) {
        setTypedText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isErasing = true;
          typingTimer = setTimeout(type, delayBetweenPhrases);
        } else {
          typingTimer = setTimeout(type, typingSpeed);
        }
      } else {
        setTypedText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isErasing = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingTimer = setTimeout(type, 500);
        } else {
          typingTimer = setTimeout(type, eraseSpeed);
        }
      }
    };
    type();
    return () => clearTimeout(typingTimer);
  }, []);

  // ----------------------------------------------------
  // 2. HERO SECTION: BACKGROUND NEURAL NETWORK
  // ----------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 180;
    const maxDistance = 150;
    let mouse = { x: -100, y: -100 };
    let animationFrameId;

    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8; 
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2.5;
        this.color = Math.random() > 0.5 ? '#4f46e5' : '#06b6d4';
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        const parallaxFactor = this.radius * 0.05;
        this.x += (mouse.x - width / 2) * parallaxFactor * 0.1;
        this.y += (mouse.y - height / 2) * parallaxFactor * 0.1;
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ----------------------------------------------------
  // 3. KNOWLEDGE MAP: INTERACTIVE CANVAS
  // ----------------------------------------------------
  useEffect(() => {
    const container = mapContainerRef.current;
    const mainCanvas = mapMainCanvasRef.current;
    const bgCanvas = mapBgCanvasRef.current;
    const tooltip = tooltipRef.current;
    const tooltipTitle = tooltipTitleRef.current;
    const tooltipDesc = tooltipDescRef.current;

    if (!container || !mainCanvas || !bgCanvas) return;

    const mainCtx = mainCanvas.getContext('2d');
    const bgCtx = bgCanvas.getContext('2d');
    let width, height;
    let animationFrameId;
    const isMobile = () => window.innerWidth < 768;

    const colors = {
      center: '#06b6d4', interest: '#8b5cf6', line: 'rgba(139, 92, 246, 0.2)',
      glow: 'rgba(6, 182, 212, 0.4)', glowInterest: 'rgba(139, 92, 246, 0.4)'
    };

    const centerNodeData = { id: 0, label: "Shankar Pranith", type: 'center', desc: "AI & Data Science Student | Aspiring ML Engineer" };
    const nodeData = [
      { id: 1, label: "Machine Learning", type: 'interest', desc: "Building predictive models that learn patterns from data." },
      { id: 2, label: "Data Analytics", type: 'interest', desc: "Transforming raw data into meaningful insights." },
      { id: 3, label: "Artificial Intelligence", type: 'interest', desc: "Developing systems that simulate intelligent decision making." },
      { id: 4, label: "Python", type: 'interest', desc: "Primary programming language for data science and AI development." },
      { id: 5, label: "Intelligent Systems", type: 'interest', desc: "Designing applications that combine algorithms and real-world problem solving." },
      { id: 6, label: "Data Visualization", type: 'interest', desc: "Communicating insights through clear and interactive visualizations." }
    ];

    class Node {
      constructor(data, x, y, radius, color, glowColor) {
        this.id = data.id; this.label = data.label; this.desc = data.desc; this.type = data.type;
        this.x = x; this.y = y; this.baseX = x; this.baseY = y;
        this.radius = radius; this.color = color; this.glowColor = glowColor;
        this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5;
        this.pulse = 0; this.pulseDirection = 1;
      }
      update() {
        if (isMobile() && this.type !== 'center') return;
        this.x += this.vx; this.y += this.vy;
        const dx = this.baseX - this.x; const dy = this.baseY - this.y;
        this.x += dx * 0.01; this.y += dy * 0.01;
      }
      draw(ctx, isHovered) {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = isHovered ? 30 : 15;
        ctx.shadowColor = isHovered ? this.color : this.glowColor;
        ctx.fillStyle = this.color; ctx.fill(); ctx.closePath(); ctx.shadowBlur = 0;
        if (isHovered) {
          ctx.beginPath(); ctx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1; ctx.stroke(); ctx.closePath();
        }
        ctx.fillStyle = 'white'; ctx.font = `${this.type === 'center' ? '700 1rem' : '500 0.85rem'} Inter, sans-serif`;
        ctx.textAlign = 'center'; ctx.fillText(this.label, this.x, this.y + this.radius + (this.type === 'center' ? 22 : 18));
      }
    }

    class Connection {
      constructor(nodeA, nodeB) { this.nodeA = nodeA; this.nodeB = nodeB; this.pulseAlpha = 0; }
      draw(ctx, isHighlighted, isPulsing) {
        ctx.beginPath(); ctx.moveTo(this.nodeA.x, this.nodeA.y); ctx.lineTo(this.nodeB.x, this.nodeB.y);
        if (isPulsing) this.pulseAlpha = 0.8;
        if (isHighlighted || this.pulseAlpha > 0.01) {
          ctx.strokeStyle = isHighlighted ? colors.center : `rgba(236, 72, 153, ${this.pulseAlpha})`;
          ctx.lineWidth = isHighlighted ? 2 : 1.5; this.pulseAlpha *= 0.95;
        } else { ctx.strokeStyle = colors.line; ctx.lineWidth = 0.5; }
        ctx.stroke(); ctx.closePath();
      }
    }

    const nodes = []; const connections = []; const backgroundParticles = [];
    let centerNode; let hoveredNode = null; let selectedNode = null;

    function resize() {
      width = container.offsetWidth; height = container.offsetHeight;
      mainCanvas.width = bgCanvas.width = width; mainCanvas.height = bgCanvas.height = height;
      initializeGraph();
    }

    function initializeGraph() {
      nodes.length = connections.length = backgroundParticles.length = 0;
      centerNode = new Node(centerNodeData, width / 2, height / 2, isMobile() ? 25 : 35, colors.center, colors.glow);
      nodes.push(centerNode);

      const radiusDist = isMobile() ? (width * 0.1) : 250;
      for (let i = 0; i < nodeData.length; i++) {
        let x, y;
        if (isMobile()) { x = 80; y = (height / (nodeData.length + 2)) * (i + 2); } 
        else { const angle = (i / nodeData.length) * Math.PI * 2; x = centerNode.x + Math.cos(angle) * radiusDist; y = centerNode.y + Math.sin(angle) * radiusDist; }
        const node = new Node(nodeData[i], x, y, 10, colors.interest, colors.glowInterest);
        nodes.push(node); connections.push(new Connection(centerNode, node));
      }

      connections.push(new Connection(nodes[1], nodes[3]));
      connections.push(new Connection(nodes[2], nodes[6]));
      connections.push(new Connection(nodes[4], nodes[1]));

      const particleCount = isMobile() ? 50 : 100;
      for (let i = 0; i < particleCount; i++) {
        backgroundParticles.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5, color: Math.random() > 0.5 ? colors.center : colors.interest, opacity: Math.random() * 0.4 });
      }
    }

    function animate() {
      if (backgroundParticles.length > 0) {
        bgCtx.clearRect(0, 0, width, height);
        for (let p of backgroundParticles) {
          bgCtx.beginPath(); bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          bgCtx.fillStyle = `rgba(100, 100, 100, ${p.opacity})`; bgCtx.fill(); bgCtx.closePath();
        }
        backgroundParticles.length = 0;
      }
      mainCtx.clearRect(0, 0, width, height);
      for (let c of connections) {
        const isHighlighted = (hoveredNode && (c.nodeA.id === hoveredNode.id || c.nodeB.id === hoveredNode.id));
        const isPulsing = (selectedNode && (c.nodeA.id === selectedNode.id || c.nodeB.id === selectedNode.id));
        c.draw(mainCtx, isHighlighted, isPulsing);
      }
      for (let n of nodes) n.draw(mainCtx, hoveredNode && n.id === hoveredNode.id);
      
      for (let n of nodes) n.update();
      animationFrameId = requestAnimationFrame(animate);
    }

    function getMousePos(e) { const rect = mainCanvas.getBoundingClientRect(); return { x: e.clientX - rect.left, y: e.clientY - rect.top }; }
    function checkNodeHover(mousePos) {
      for (let n of nodes) {
        const dx = mousePos.x - n.x; const dy = mousePos.y - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.radius + 15) return n;
      }
      return null;
    }

    const handleMouseMoveMap = (e) => {
      const mousePos = getMousePos(e);
      const nodeOver = checkNodeHover(mousePos);
      if (nodeOver) {
        hoveredNode = nodeOver;
        tooltipTitle.textContent = nodeOver.label; tooltipDesc.textContent = nodeOver.desc;
        tooltip.style.opacity = '1'; tooltip.style.transform = 'translateY(0)';
        let left = mousePos.x + 20; let top = mousePos.y - (tooltip.offsetHeight / 2);
        if (left + tooltip.offsetWidth > width) left = mousePos.x - tooltip.offsetWidth - 20;
        tooltip.style.left = `${left}px`; tooltip.style.top = `${top}px`;
      } else {
        hoveredNode = null;
        tooltip.style.opacity = '0'; tooltip.style.transform = 'translateY(10px)';
      }
    };

    const handleMapClick = (e) => {
      const nodeClicked = checkNodeHover(getMousePos(e));
      if (nodeClicked) { selectedNode = nodeClicked; setTimeout(() => selectedNode = null, 500); }
    };

    mainCanvas.addEventListener('mousemove', handleMouseMoveMap);
    mainCanvas.addEventListener('click', handleMapClick);
    window.addEventListener('resize', resize);
    
    resize(); animate();

    return () => {
      mainCanvas.removeEventListener('mousemove', handleMouseMoveMap);
      mainCanvas.removeEventListener('click', handleMapClick);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ----------------------------------------------------
  // HERO PROFILE TILT LOGIC
  // ----------------------------------------------------
  const handleProfileMouseMove = (e) => {
    const card = profileCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top) - rect.height / 2) / (rect.height / 2)) * -10; 
    const rotateY = (((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2)) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  const handleProfileMouseLeave = () => {
    if (profileCardRef.current) profileCardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="homepage-container">
      {/* ---------------- CSS ---------------- */}
      <style>{`
        .homepage-container { position: relative; min-height: 100vh; color: white; font-family: 'Inter', system-ui, sans-serif; background-color: #0b0b0b; overflow-x: hidden; letter-spacing: -0.015em; }
        
        /* Hero Styling */
        .ai-background { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; opacity: 0.6; pointer-events: none; }
        .gradient-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 40%); z-index: 1; pointer-events: none; }
        .hero-section { position: relative; z-index: 10; display: flex; align-items: center; justify-content: center; min-height: 95vh; padding: 80px 40px; animation: page-fade-in 1.2s ease forwards; }
        @keyframes page-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .hero-grid { display: flex; align-items: center; gap: 60px; width: 100%; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 900px) { .hero-grid { flex-direction: column-reverse; text-align: center; } }
        .text-column { flex: 1; }
        .hero-heading { font-size: 4rem; fontWeight: 800; margin: 0 0 16px 0; letter-spacing: -2.5px; }
        .hero-subtitle { font-size: 1.1rem; color: #a3a3a3; margin: 0 0 24px 0; lineHeight: 1.6; }
        .hero-description { font-size: 1.1rem; color: #d4d4d8; margin: 0 0 32px 0; lineHeight: 1.8; max-width: 600px; }
        @media (max-width: 900px) { .hero-heading { font-size: 3rem; } .hero-description { margin-left: auto; margin-right: auto; } }
        .typing-container { font-size: 1.2rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; background: linear-gradient(90deg, #4f46e5, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 40px; position: relative; display: inline-block; min-height: 1.5em; }
        .typed-text { display: inline; }
        .cursor { display: inline-block; width: 2px; height: 1em; background: white; margin-left: 2px; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .skills-bar { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 40px; }
        @media (max-width: 900px) { .skills-bar { justify-content: center; } }
        .skill-icon { padding: 8px 16px; border-radius: 100px; background: rgba(255,255,255, 0.04); border: 1px solid rgba(255,255,255, 0.08); font-size: 0.8rem; font-weight: 600; color: #d4d4d8; transition: all 0.3s ease; }
        .skill-icon:hover { background: rgba(255,255,255, 0.1); border-color: rgba(255,255,255, 0.2); transform: translateY(-3px); color: white; }
        .profile-column { display: flex; justify-content: center; position: relative; }
        .profile-card-wrapper { position: relative; width: 320px; height: 320px; animation: gentle-float 6s ease-in-out infinite; transform-style: preserve-3d; transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        @keyframes gentle-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .profile-frame { position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(255,255,255, 0.1); padding: 6px; overflow: hidden; background: rgba(10,10,10, 0.6); backdrop-filter: blur(8px); box-shadow: 0 40px 80px rgba(0,0,0, 0.6), 0 0 60px rgba(79, 70, 229, 0.15); }
        .profile-frame::before { content: ''; position: absolute; inset: -4px; z-index: -1; border-radius: 50%; background: linear-gradient(45deg, #4f46e5, #ec4899, #06b6d4); filter: blur(20px); opacity: 0.9; animation: spin-glow 8s linear infinite; }
        @keyframes spin-glow { 100% { transform: rotate(360deg); } }
        .profile-img-real { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 1px solid rgba(255,255,255,0.2); }
        
        /* I ADDED flex-wrap: wrap; HERE SO THE LEETCODE BUTTON FITS ON SMALL SCREENS! */
        .hero-btns { display: flex; gap: 20px; flex-wrap: wrap; align-items: center; } 
        @media (max-width: 900px) { .hero-btns { justify-content: center; } }
        
        .btn { padding: 16px 32px; font-size: 1rem; font-weight: 600; border-radius: 100px; text-decoration: none; transition: all 0.3s ease; position: relative; overflow: hidden; }
        .btn-projects { background: linear-gradient(90deg, #4f46e5, #a855f7); color: white; border: none; box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3); }
        .btn-projects:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(79, 70, 229, 0.5), 0 0 20px rgba(168, 85, 247, 0.2); }
        .btn-contact { background: rgba(255,255,255, 0.05); color: white; border: 1px solid rgba(255,255,255, 0.1); backdrop-filter: blur(5px); }
        .btn-contact:hover { background: rgba(255,255,255, 0.1); border-color: rgba(255,255,255, 0.3); }

        /* Knowledge Map Styling */
        .knowledge-map-section { position: relative; z-index: 10; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 20px; background-color: #0b0b0b; overflow: hidden; }
        .page-header-map { text-align: center; margin-bottom: 60px; }
        .knowledge-map-container { position: relative; width: 100%; max-width: 1200px; height: 80vh; border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.08); background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(16px); box-shadow: 0 40px 80px rgba(0,0,0, 0.4); overflow: hidden; }
        .map-bg-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; opacity: 0.4; pointer-events: none; }
        .map-main-canvas { position: relative; z-index: 10; width: 100%; height: 100%; cursor: crosshair; }
        .glass-tooltip { position: absolute; z-index: 100; pointer-events: none; opacity: 0; transform: translateY(10px); transition: opacity 0.3s ease, transform 0.3s ease; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 16px 20px; box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5); max-width: 250px; }
        .tooltip-title { font-size: 1rem; font-weight: 700; margin: 0 0 8px 0; color: white; letter-spacing: -0.5px; }
        .tooltip-desc { font-size: 0.85rem; color: #a3a3a3; line-height: 1.6; margin: 0; }
      `}</style>

      {/* ---------------- HERO SECTION ---------------- */}
      <canvas ref={canvasRef} className="ai-background"></canvas>
      <div className="gradient-overlay"></div>

      <section className="hero-section">
        <div className="hero-grid">
          <div className="text-column">
            <h1 className="hero-heading">Hi, I'm Shankar Pranith.</h1>
            <h2 className="hero-subtitle">3rd Year Artificial Intelligence and Data Science Student | Aspiring ML Engineer</h2>
            <p className="hero-description">I enjoy building intelligent systems that transform raw data into meaningful insights. My interests include machine learning, data analytics, and developing innovative AI-powered applications.</p>
            <div className="typing-container">&gt; <div className="typed-text">{typedText}</div><div className="cursor"></div></div>
            <div className="skills-bar">
              <div className="skill-icon">Python</div><div className="skill-icon">Machine Learning</div><div className="skill-icon">Artificial Intelligence</div><div className="skill-icon">Data Analytics</div><div className="skill-icon">Deep Learning</div>
            </div>
            
            <div className="hero-btns">
              <Link href="/projects" className="btn btn-projects">View Projects</Link>
              
              {/* --- LEETCODE BADGE CARD ADDED HERE --- */}
              <a 
                href="https://leetcode.com/u/shankarpranith/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '100px', // Matches your other buttons!
                  padding: '8px 24px 8px 8px', // Slightly asymmetrical to fit the icon nicely
                  textDecoration: 'none',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 161, 22, 0.5)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 161, 22, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  background: 'rgba(255, 161, 22, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFA116',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  &lt;/&gt;
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', lineHeight: '1.2' }}>LeetCode</h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#a3a3a3', lineHeight: '1' }}>Profile</p>
                </div>
              </a>
              {/* -------------------------------------- */}

              <Link href="/contact" className="btn btn-contact">Contact Me</Link>
            </div>

          </div>
          <div className="profile-column">
            <div className="profile-card-wrapper" ref={profileCardRef} onMouseMove={handleProfileMouseMove} onMouseLeave={handleProfileMouseLeave}>
              <div className="profile-frame"><img src="/profile.jpg" alt="Shankar Pranith" className="profile-img-real" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- KNOWLEDGE MAP SECTION ---------------- */}
      <section className="knowledge-map-section">
        <div className="page-header-map">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 12px 0', letterSpacing: '-1.5px' }}>My Technical Universe</h2>
          <p style={{ color: '#a3a3a3', fontSize: '1.1rem', margin: '0 auto', maxWidth: '600px' }}>An interactive neural visualization of my core competencies, interests, and skill clusters.</p>
        </div>
        
        <div className="knowledge-map-container" ref={mapContainerRef}>
          <canvas ref={mapBgCanvasRef} className="map-bg-canvas"></canvas>
          <canvas ref={mapMainCanvasRef} className="map-main-canvas"></canvas>
          <div ref={tooltipRef} className="glass-tooltip">
            <h4 ref={tooltipTitleRef} className="tooltip-title"></h4>
            <p ref={tooltipDescRef} className="tooltip-desc"></p>
          </div>
        </div>
      </section>

    </div>
  );
}