"use client";

import { useState, useRef } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // NEW: State to hold form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Refs for the 3D tilt effect
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  // 3D Tilt Math
  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8; // Max rotation 8 degrees
    const rotateY = ((x - centerX) / centerX) * 8;
    
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (ref) => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // NEW: Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // UPDATED: Functional Web3Forms Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // PASTE YOUR WEB3FORMS ACCESS KEY HERE:
          access_key: "df7fee47-c268-41ef-9b1c-a2ddb751d96e",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Contact from Portfolio!"
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' }); // Clear the form
        setTimeout(() => setIsSuccess(false), 5000); // Reset after 5 seconds
      }  else {
        console.log("Web3Forms Error:", result); // This logs the exact error to your console
        alert(`Web3Forms says: ${result.message}`); // This shows the real error in the popup
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Injecting Custom CSS for Animations & Glassmorphism */}
      <style>{`
        .contact-container {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: 'Inter', sans-serif;
          z-index: 1;
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
          opacity: 0.5;
          animation: blob-float 10s infinite alternate ease-in-out;
        }
        .blob-1 { top: 10%; left: 20%; width: 300px; height: 300px; background: #4f46e5; }
        .blob-2 { bottom: 10%; right: 20%; width: 400px; height: 400px; background: #ec4899; animation-delay: -5s; }
        .blob-3 { top: 40%; left: 50%; width: 250px; height: 250px; background: #06b6d4; animation-delay: -2s; }

        @keyframes blob-float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -50px) scale(1.1); }
        }

        /* Page Entrance Animation */
        .glass-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          width: 100%;
          max-width: 1000px;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(40px);
        }

        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Glassmorphism Cards */
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s ease;
          transform-style: preserve-3d;
        }
        .glass-card:hover {
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(79, 70, 229, 0.2);
        }

        /* Profile Picture Glowing Border */
        .profile-wrapper {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin-bottom: 24px;
          animation: gentle-float 4s ease-in-out infinite;
        }
        .profile-wrapper::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(45deg, #4f46e5, #ec4899, #06b6d4);
          z-index: -1;
          filter: blur(12px);
          opacity: 0.8;
          animation: spin 6s linear infinite;
        }
        .profile-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.2);
        }

        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        /* Form Inputs */
        .modern-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .modern-input:focus {
          border-color: #4f46e5;
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 15px rgba(79, 70, 229, 0.3);
        }

        /* Glowing Button */
        .glow-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, #4f46e5, #ec4899);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .glow-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(236, 72, 153, 0.4);
        }
        .glow-btn:active { transform: translateY(0); }

        /* Social Icons */
        .social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #a3a3a3;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
          background: rgba(255,255,255,0.03);
        }
        .social-link:hover {
          color: white;
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }
        .icon { width: 20px; height: 20px; fill: currentColor; }
      `}</style>

      {/* Floating Background */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="glass-grid">
        
        {/* LEFT COLUMN: Profile Card */}
        <div 
          className="glass-card"
          ref={leftCardRef}
          onMouseMove={(e) => handleMouseMove(e, leftCardRef)}
          onMouseLeave={() => handleMouseLeave(leftCardRef)}
        >
          <div className="profile-wrapper">
            <img src="/profile.jpg" alt="Shankar Pranith" className="profile-img" />
          </div>
          
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.5px' }}>
            Let's build something amazing.
          </h1>
          <p style={{ color: '#a3a3a3', lineHeight: '1.6', marginBottom: '32px' }}>
            I'm currently available for freelance work and full-time opportunities. Drop me a message and let's chat about your next project.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="mailto:shankarpranith.ad23@bmsce.ac.in" className="social-link">
              <svg className="icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              shankarpranith.ad23@bmsce.ac.in
            </a>
            <a href="tel:+919449772563" className="social-link">
              <svg className="icon" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              +91 9449772563
            </a>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <a href="https://www.linkedin.com/in/gollapalli-shankar-pranith-a48384320/" target="_blank" className="social-link">
                <svg className="icon" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.16-3.8c-1.1 0-1.8.6-2.12 1.2v-1h-3v9h3V13.6a1.68 1.68 0 0 1 1.6-1.9c.9 0 1.2.7 1.2 1.9v4.9h2.98zM7.3 8.3a1.5 1.5 0 1 0-1.49-1.5A1.5 1.5 0 0 0 7.3 8.3zM5.8 9.8h3v9h-3v-9z"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/shankarpranith" target="_blank" className="social-link">
                <svg className="icon" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Card */}
        <div 
          className="glass-card"
          ref={rightCardRef}
          onMouseMove={(e) => handleMouseMove(e, rightCardRef)}
          onMouseLeave={() => handleMouseLeave(rightCardRef)}
        >
          {isSuccess ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', animation: 'slideUp 0.5s ease' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <svg style={{ width: '30px', fill: 'white' }} viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Message Sent!</h2>
              <p style={{ color: '#a3a3a3' }}>Thanks for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="name" style={{ fontSize: '0.9rem', color: '#e5e5e5', fontWeight: '500' }}>Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" // NEW
                  value={formData.name} // NEW
                  onChange={handleChange} // NEW
                  className="modern-input" 
                  placeholder="John Doe" 
                  required 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="email" style={{ fontSize: '0.9rem', color: '#e5e5e5', fontWeight: '500' }}>Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" // NEW
                  value={formData.email} // NEW
                  onChange={handleChange} // NEW
                  className="modern-input" 
                  placeholder="john@example.com" 
                  required 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="message" style={{ fontSize: '0.9rem', color: '#e5e5e5', fontWeight: '500' }}>Message</label>
                <textarea 
                  id="message" 
                  name="message" // NEW
                  value={formData.message} // NEW
                  onChange={handleChange} // NEW
                  rows="4" 
                  className="modern-input" 
                  placeholder="How can I help you?" 
                  style={{ resize: 'vertical' }} 
                  required
                ></textarea>
              </div>

              <button type="submit" className="glow-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}