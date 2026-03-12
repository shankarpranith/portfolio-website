"use client";

import { useState } from 'react';

// Certification Data
const certifications = [
  {
    id: 1,
    title: "AWS Cloud Practitioner Essentials",
    org: "AWS Training & Certification",
    logo: "AWS", 
    date: "January 2026",
    desc: "This certification introduced the fundamentals of cloud computing and Amazon Web Services. I gained an understanding of AWS global infrastructure, core cloud services, security principles, and cost management.",
    skills: ["Cloud Computing Fundamentals", "AWS Infrastructure", "EC2, S3, Lambda basics", "Cloud Security", "Cost Optimization"],
    verifyUrl: "#", // Add actual verification URL here
    image: "/aws-cert.png" // This points to the image in your public folder
  },
  {
    id: 2,
    title: "Data Analytics Job Simulation",
    org: "Deloitte (Forage)",
    logo: "DEL",
    date: "July 2025",
    desc: "Completed a hands-on data analytics simulation where I worked on practical tasks involving data analysis and forensic technology concepts. The experience focused on solving business problems using analytical thinking and data-driven insights.",
    skills: ["Data Analysis", "Analytical Thinking", "Forensic Technology", "Data Interpretation", "Business Insights"],
    verifyUrl: "#", // Add actual verification URL here
    image: "/deloitte-cert.png" // This points to the image in your public folder
  }
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (cert) => {
    setSelectedCert(cert);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden'; 
    }
  };

  const closeModal = () => {
    setSelectedCert(null);
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'auto'; 
    }
  };

  return (
    <div className="certs-container">
      <style>{`
        .certs-container {
          position: relative;
          min-height: 100vh;
          color: white;
          font-family: 'Inter', sans-serif;

          padding: 80px 20px;
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
          filter: blur(80px);
          opacity: 0.4;
          animation: blob-float 15s infinite alternate ease-in-out;
        }
        .blob-1 { width: 400px; height: 400px; background: #00f2fe; top: -10%; left: -10%; }
        .blob-2 { width: 500px; height: 500px; background: #ec4899; bottom: -20%; right: -10%; animation-delay: -5s; }
        .blob-3 { width: 300px; height: 300px; background: #4f46e5; top: 40%; left: 50%; animation-delay: -10s; opacity: 0.2; }

        @keyframes blob-float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, 50px) scale(1.1); }
        }

        /* Page Layout */
        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(40px);
        }

        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .page-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .page-intro {
          max-width: 800px;
          margin: 0 auto;
          font-size: 1.1rem;
          line-height: 1.6;
          color: #a3a3a3;
        }

        /* Grid & Cards */
        .cert-grid {
          display: grid;
          gap: 30px;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 30px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .glass-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 242, 254, 0.4);
          box-shadow: 0 20px 40px rgba(0, 242, 254, 0.1);
        }

        /* Hover Overlay inside Card */
        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
        }

        .glass-card:hover .card-overlay {
          opacity: 1;
        }

        .view-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
          border: none;
          border-radius: 30px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }

        .glass-card:hover .view-btn {
          transform: translateY(0);
        }

        /* Card Elements */
        .cert-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .org-logo {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #fff;
          font-size: 0.8rem;
        }

        .cert-title {
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .cert-org {
          color: #a3a3a3;
          font-size: 0.9rem;
          margin-top: 4px;
        }

        .cert-date {
          font-size: 0.85rem;
          color: #00f2fe;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .cert-desc {
          font-size: 0.95rem;
          color: #a3a3a3;
          line-height: 1.5;
          margin-bottom: 25px;
          flex-grow: 1;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-tag {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          color: #e5e7eb;
          transition: background 0.2s ease;
        }

        .glass-card:hover .skill-tag {
          background: rgba(0, 242, 254, 0.1);
          border-color: rgba(0, 242, 254, 0.3);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeInModal 0.3s ease;
        }

        @keyframes fadeInModal {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: scaleUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
        }

        @keyframes scaleUpModal {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10;
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        /* Updated Image Container Styles */
        .modal-image-container {
          width: 100%;
          height: 350px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .modal-image-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 20px;
        }

        .modal-body {
          padding: 40px;
        }

        .verify-link {
          display: inline-block;
          margin-top: 30px;
          padding: 12px 28px;
          background: transparent;
          border: 2px solid #00f2fe;
          color: #00f2fe;
          text-decoration: none;
          border-radius: 30px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .verify-link:hover {
          background: #00f2fe;
          color: #000;
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
        }

        /* Custom Scrollbar for Modal */
        .modal-content::-webkit-scrollbar { width: 8px; }
        .modal-content::-webkit-scrollbar-track { background: transparent; }
        .modal-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>

      {/* Floating Background Blobs */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="content-wrapper">
        <header className="page-header">
          <h1 className="page-title">Certifications & Credentials</h1>
          <p className="page-intro">
            These certifications represent my continuous learning journey in cloud computing, data analytics, and modern technology tools. They demonstrate my commitment to developing practical skills that support building intelligent and data-driven systems.
          </p>
        </header>

        <div className="cert-grid">
          {certifications.map((cert) => (
            <div key={cert.id} className="glass-card" onClick={() => openModal(cert)}>
              <div className="card-overlay">
                <button className="view-btn">View Certificate</button>
              </div>
              <div className="cert-header">
                <div className="org-logo">{cert.logo}</div>
                <div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-org">{cert.org}</p>
                </div>
              </div>
              <p className="cert-date">{cert.date}</p>
              <p className="cert-desc">{cert.desc}</p>
              <div className="skills-container">
                {cert.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup with Images */}
      {selectedCert && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            
            <div className="modal-image-container">
              <img 
                src={selectedCert.image} 
                alt={`${selectedCert.title} Certificate`} 
              />
            </div>

            <div className="modal-body">
              <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{selectedCert.title}</h2>
              <p style={{ fontSize: '1.1rem', color: '#a3a3a3', marginBottom: '20px' }}>{selectedCert.org}</p>
              <p className="cert-date">{selectedCert.date}</p>
              <p style={{ fontSize: '1.05rem', color: '#a3a3a3', lineHeight: '1.6' }}>{selectedCert.desc}</p>
              
              <div className="skills-container" style={{ marginTop: '20px' }}>
                {selectedCert.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
              
              <a href={selectedCert.verifyUrl} target="_blank" rel="noopener noreferrer" className="verify-link">
                Verify Certificate
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}