"use client";

import { useEffect, useRef, useState } from 'react';

export default function Education() {
  const canvasRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  const educationData = [
    {
      id: 1,
      institution: "Jindal Vidya Mandir",
      degree: "Secondary Education – CBSE",
      grade: "10th Grade Percentage: 87%",
      date: "July 2021",
      location: "Bellary, India",
      description: "My secondary education built the foundation of my academic journey and sparked my interest in problem solving and technology.",
      align: "left"
    },
    {
      id: 2,
      institution: "Jindal Vidya Mandir",
      degree: "Higher Secondary Education – CBSE (PCMPhe)",
      grade: "12th Grade Percentage: 88%",
      date: "March 2023",
      location: "Bellary, India",
      description: "My higher secondary education strengthened my analytical and mathematical thinking through subjects such as Physics, Chemistry, and Mathematics.",
      align: "right"
    },
    {
      id: 3,
      institution: "B.M.S College of Engineering",
      degree: "B.E. in Artificial Intelligence and Data Science",
      grade: "CGPA: 8.23 (Till 5th Semester)",
      date: "Aug 2023 – Present",
      location: "Bengaluru, India",
      description: "I am currently pursuing my Bachelor's degree in Artificial Intelligence and Data Science at B.M.S College of Engineering. My studies focus on machine learning, data analytics, artificial intelligence, and intelligent system design.",
      align: "left"
    }
  ];

  // Canvas Neural Brain Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 120;
    const maxDistance = 130;

    class Particle {
      constructor() {
        // Bias starting positions towards the center to create a "brain" cluster shape
        const angle = Math.random() * Math.PI * 2;
        const radius = (Math.random() * Math.min(width, height)) / 2.5;
        this.x = width / 2 + Math.cos(angle) * radius;
        this.y = height / 2 + Math.sin(angle) * radius;
        
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'; // Neon blue & purple
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Keep particles somewhat tethered to their base to maintain the brain shape
        const dx = this.baseX - this.x;
        const dy = this.baseY - this.y;
        this.x += dx * 0.005;
        this.y += dy * 0.005;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particleCount; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - distance / maxDistance;
            
            // Highlight connections if interacting with a node (simulated brain activity)
            const isPulse = Math.random() > 0.99; 
            ctx.strokeStyle = isPulse ? `rgba(6, 182, 212, ${opacity + 0.5})` : `rgba(139, 92, 246, ${opacity * 0.3})`;
            ctx.lineWidth = isPulse ? 1.5 : 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="education-container">
      <style>{`
        .education-container {
          position: relative;
          min-height: 100vh;
          padding: 80px 20px;
          background-color: #0b0b0b;
          color: white;
          font-family: 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }

        .brain-canvas {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: 0.7;
        }

        .gradient-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at center, transparent 0%, #0b0b0b 80%);
          z-index: 1;
          pointer-events: none;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 1000px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 80px;
          animation: fadeInDown 1s ease forwards;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Neural Timeline Structure */
        .neural-timeline {
          position: relative;
          padding: 40px 0;
        }

        /* The central glowing spine (Axon) */
        .neural-spine {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          background: rgba(139, 92, 246, 0.2);
          transform: translateX(-50%);
          border-radius: 4px;
          overflow: hidden;
        }

        .neural-spine::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 30%;
          background: linear-gradient(to bottom, transparent, #06b6d4, #8b5cf6, transparent);
          animation: energy-flow 3s linear infinite;
        }

        @keyframes energy-flow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }

        /* Timeline Items */
        .timeline-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 60px;
          position: relative;
          opacity: 0;
          animation: slideUpFade 0.8s ease forwards;
        }

        .timeline-item:nth-child(1) { animation-delay: 0.2s; }
        .timeline-item:nth-child(2) { animation-delay: 0.4s; }
        .timeline-item:nth-child(3) { animation-delay: 0.6s; }

        @keyframes slideUpFade {
          to { opacity: 1; transform: translateY(0); }
        }

        /* The Neuron Node */
        .neuron-node {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          width: 24px;
          height: 24px;
          background: #0b0b0b;
          border: 3px solid #06b6d4;
          border-radius: 50%;
          z-index: 20;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
        }

        .neuron-node::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(139, 92, 246, 0.6);
          animation: neuron-pulse 2s infinite;
        }

        @keyframes neuron-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        .timeline-item.active .neuron-node, .neuron-node:hover {
          background: #06b6d4;
          transform: translate(-50%, 0) scale(1.3);
          box-shadow: 0 0 30px #06b6d4, 0 0 50px #8b5cf6;
          border-color: #ffffff;
        }

        /* The Content Cards */
        .card-wrapper {
          width: 45%;
          perspective: 1000px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .timeline-item.active .glass-card {
          border-color: rgba(6, 182, 212, 0.4);
          box-shadow: 0 20px 40px rgba(0,0,0, 0.5), 0 0 30px rgba(6, 182, 212, 0.15);
          transform: translateY(-5px) scale(1.02);
          background: rgba(255, 255, 255, 0.05);
        }

        .date-badge {
          display: inline-block;
          background: rgba(139, 92, 246, 0.15);
          color: #c4b5fd;
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 16px;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }

        .degree { font-size: 1.4rem; font-weight: 700; color: white; margin: 0 0 8px 0; letter-spacing: -0.5px; }
        .institution { font-size: 1.1rem; color: #06b6d4; font-weight: 500; margin: 0 0 16px 0; }
        .grade { display: inline-block; background: rgba(6, 182, 212, 0.1); color: #67e8f9; padding: 4px 10px; border-radius: 6px; font-size: 0.9rem; font-weight: 600; margin-bottom: 16px; }
        .desc { color: #a3a3a3; font-size: 0.95rem; line-height: 1.7; margin: 0; }

        /* Responsive Design */
        @media (max-width: 768px) {
          .neural-spine { left: 30px; }
          .neuron-node { left: 30px; }
          .timeline-item { justify-content: flex-end; }
          .card-wrapper { width: calc(100% - 70px); }
          .timeline-item.active .neuron-node, .neuron-node:hover { transform: translate(-50%, 0) scale(1.2); }
        }
      `}</style>

      {/* Background Animations */}
      <canvas ref={canvasRef} className="brain-canvas"></canvas>
      <div className="gradient-overlay"></div>

      {/* Foreground Content */}
      <div className="content-wrapper">
        <div className="page-header">
          <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '0 0 12px 0', letterSpacing: '-1.5px', background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Academic Synapses
          </h1>
          <p style={{ color: '#a3a3a3', fontSize: '1.1rem', margin: '0 auto', maxWidth: '600px' }}>
            Tracing the neural pathways of my education. Hover over the nodes to activate the memory sectors.
          </p>
        </div>

        <div className="neural-timeline">
          <div className="neural-spine"></div>

          {educationData.map((data) => (
            <div 
              key={data.id} 
              className={`timeline-item ${activeNode === data.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveNode(data.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* Left Side (Empty on Right-aligned, Card on Left-aligned) */}
              {data.align === 'left' ? (
                <div className="card-wrapper">
                  <div className="glass-card">
                    <div className="date-badge">{data.date}</div>
                    <h2 className="degree">{data.degree}</h2>
                    <h3 className="institution">{data.institution} • {data.location}</h3>
                    <div className="grade">{data.grade}</div>
                    <p className="desc">{data.description}</p>
                  </div>
                </div>
              ) : <div className="card-wrapper" style={{ visibility: 'hidden' }}></div>}

              {/* The Central Neuron */}
              <div className="neuron-node"></div>

              {/* Right Side (Card on Right-aligned, Empty on Left-aligned) */}
              {data.align === 'right' ? (
                <div className="card-wrapper">
                  <div className="glass-card">
                    <div className="date-badge">{data.date}</div>
                    <h2 className="degree">{data.degree}</h2>
                    <h3 className="institution">{data.institution} • {data.location}</h3>
                    <div className="grade">{data.grade}</div>
                    <p className="desc">{data.description}</p>
                  </div>
                </div>
              ) : <div className="card-wrapper" style={{ visibility: 'hidden' }}></div>}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}