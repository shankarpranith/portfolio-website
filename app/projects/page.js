"use client";

export default function Projects() {
  const myProjects = [
    {
      title: 'YeahTurf!',
      link: 'https://yeahturf-app.onrender.com/',
      image: '/yeahturf.png',
      tech: ['Node.js', 'Express', 'Firebase', 'EJS', 'CSS'],
      description: [
        'Developed a full-stack web application connecting local sports enthusiasts, allowing users to host matches and join rosters.',
        'Implemented secure authentication using Firebase Auth and architected a Firestore NoSQL database for real-time data.',
        'Integrated WhatsApp API for team communication and Google Maps Smart Links for precise turf location.',
        'Designed a personalized user dashboard to track game history and upcoming schedules.'
      ]
    },
    {
      title: 'Unsubscribeifyoucan',
      link: 'https://fabulous-pika-48fb98.netlify.app/',
      image: '/unsubscribe.jpg',
      tech: ['JavaScript', 'CSS', 'Three.js', 'Vanta.js'],
      description: [
        'Developed an interactive web application designed to subvert standard user experiences using raw JavaScript DOM manipulation and event listeners.',
        'Engineered complex UI mechanics including dynamic element evasion via CSS transforms, Regex-based input interception, and default behavior overrides.',
        'Designed a modern Glassmorphism interface overlaid on a responsive, 3D WebGL neural net background integrated using Three.js and Vanta.js.'
      ]
    }
  ];

  // 3D Tilt Math (Applied dynamically to the hovered card)
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5; // Max rotation 5 degrees for larger cards
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="projects-container">
      {/* Injecting Custom CSS */}
      <style>{`
        .projects-container {
          position: relative;
          min-height: 100vh;
          padding: 60px 20px;
          color: white;
          font-family: 'Inter', sans-serif;
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

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 40px;
          width: 100%;
          max-width: 1100px;
        }

        /* Glassmorphism Project Cards */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s ease, border-color 0.2s ease;
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(40px);
        }
        
        /* Staggered load effect */
        .glass-card:nth-child(1) { animation-delay: 0.1s; }
        .glass-card:nth-child(2) { animation-delay: 0.3s; }

        .glass-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(79, 70, 229, 0.15);
        }

        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Image Styling */
        .img-container {
          width: 100%;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }
        
        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.5s ease;
        }
        
        .glass-card:hover .project-img {
          transform: scale(1.05);
        }

        /* Tech Pills */
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        .tech-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #d4d4d8;
          transition: all 0.3s ease;
        }
        .glass-card:hover .tech-pill {
          background: rgba(79, 70, 229, 0.1);
          border-color: rgba(79, 70, 229, 0.3);
          color: white;
        }

        /* Live Demo Link */
        .live-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(90deg, #4f46e5, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        .live-link:hover {
          opacity: 0.8;
        }
        .link-icon {
          width: 16px; 
          height: 16px;
          fill: url(#gradient);
        }
      `}</style>

      {/* SVG Gradient Definition for the arrow icon */}
      <svg width="0" height="0">
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stopColor="#4f46e5" offset="0%" />
          <stop stopColor="#ec4899" offset="100%" />
        </linearGradient>
      </svg>

      {/* Floating Background */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="page-header">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 12px 0', letterSpacing: '-1px' }}>
          Selected Works.
        </h1>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem', margin: 0 }}>
          A showcase of my recent full-stack and interactive frontend projects.
        </p>
      </div>

      <div className="projects-grid">
        {myProjects.map((project, index) => (
          <div 
            key={index} 
            className="glass-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Image Section */}
            <div className="img-container">
              <img src={project.image} alt={project.title} className="project-img" />
            </div>

            {/* Title & Link */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '700' }}>{project.title}</h2>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="live-link">
                Live Demo
                <svg className="link-icon" viewBox="0 0 24 24">
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                </svg>
              </a>
            </div>

            {/* Tech Stack Pills */}
            <div className="tech-tags">
              {project.tech.map((t, i) => (
                <span key={i} className="tech-pill">{t}</span>
              ))}
            </div>

            {/* Description list */}
            <ul style={{ color: '#a3a3a3', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, paddingLeft: '20px', flexGrow: 1 }}>
              {project.description.map((bullet, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}