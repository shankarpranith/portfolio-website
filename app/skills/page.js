"use client";

import { useRef } from 'react';

export default function Skills() {
  // Grouping your skills into logical categories
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />,
      skills: ["Python", "C++", "C", "R", "JavaScript", "SQL", "HTML", "CSS"]
    },
    {
      title: "AI & Data Science",
      icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />,
      skills: ["Artificial Intelligence", "Machine Learning", "Data Analytics", "Tableau"]
    },
    {
      title: "Web Technologies",
      icon: <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H5V8h14v10z" />,
      skills: ["ReactJS", "NextJS", "Node.js", "Express.js", "EJS"]
    },
    {
      title: "Core CS Fundamentals",
      icon: <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />,
      skills: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "DBMS"]
    },
    {
      title: "Cloud & Databases",
      icon: <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z" />,
      skills: ["Firebase", "Google Cloud Platform (GCP)", "SQL"]
    },
    {
      title: "Tools & Version Control",
      icon: <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.1L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />,
      skills: ["Git", "GitHub", "VS Code"]
    }
  ];

  // 3D Tilt Effect Logic
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="skills-container">
      {/* GLOBAL CSS INJECTION */}
      <style>{`
        .skills-container {
          position: relative;
          min-height: 100vh;
          padding: 60px 20px;
          color: white;
          font-family: 'Inter', system-ui, sans-serif;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Animated Background Blobs */
        .background-blobs {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          overflow: hidden;
          z-index: -1;
          background-color: #0a0a0a;
        }
        .blob {
          position: absolute;
          filter: blur(90px);
          opacity: 0.4;
          animation: blob-float 12s infinite alternate ease-in-out;
        }
        .blob-1 { top: -10%; left: 10%; width: 400px; height: 400px; background: #4f46e5; }
        .blob-2 { bottom: 0%; right: 10%; width: 500px; height: 500px; background: #ec4899; animation-delay: -4s; }
        .blob-3 { top: 30%; left: 60%; width: 350px; height: 350px; background: #06b6d4; animation-delay: -8s; }

        @keyframes blob-float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -60px) scale(1.1); }
        }

        /* Header Animation */
        .page-header {
          text-align: center;
          margin-bottom: 60px;
          animation: fadeInDown 0.8s ease forwards;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Skills Grid */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          width: 100%;
          max-width: 1100px;
        }

        /* Glassmorphism Cards */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s ease, border-color 0.2s ease;
          transform-style: preserve-3d;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(40px);
          display: flex;
          flex-direction: column;
        }
        
        /* Staggered load effect */
        .glass-card:nth-child(1) { animation-delay: 0.1s; }
        .glass-card:nth-child(2) { animation-delay: 0.2s; }
        .glass-card:nth-child(3) { animation-delay: 0.3s; }
        .glass-card:nth-child(4) { animation-delay: 0.4s; }
        .glass-card:nth-child(5) { animation-delay: 0.5s; }
        .glass-card:nth-child(6) { animation-delay: 0.6s; }

        .glass-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(6, 182, 212, 0.15);
        }

        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Card Header */
        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .card-icon {
          width: 28px;
          height: 28px;
          fill: url(#cyan-purple-grad);
        }
        .card-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.5px;
        }

        /* Skill Pills Container */
        .pills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* Individual Skill Pill */
        .skill-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 14px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #d4d4d8;
          transition: all 0.3s ease;
          cursor: default;
        }
        
        .glass-card:hover .skill-pill {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .skill-pill:hover {
          background: linear-gradient(90deg, rgba(79, 70, 229, 0.2), rgba(236, 72, 153, 0.2));
          border-color: #ec4899;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.2);
        }
      `}</style>

      {/* SVG Gradient Definition for Icons */}
      <svg width="0" height="0">
        <linearGradient id="cyan-purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#06b6d4" offset="0%" />
          <stop stopColor="#4f46e5" offset="100%" />
        </linearGradient>
      </svg>

      {/* Floating Background */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Header */}
      <div className="page-header">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 12px 0', letterSpacing: '-1px' }}>
          Technical Arsenal.
        </h1>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem', margin: 0, maxWidth: '600px' }}>
          A comprehensive breakdown of the languages, frameworks, and tools I use to build intelligent systems and robust applications.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className="glass-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-header">
              <svg className="card-icon" viewBox="0 0 24 24">
                {category.icon}
              </svg>
              <h2 className="card-title">{category.title}</h2>
            </div>
            
            <div className="pills-container">
              {category.skills.map((skill, i) => (
                <span key={i} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}