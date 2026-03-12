import Link from 'next/link';

export const metadata = {
  title: 'Shankar Pranith | Portfolio',
  description: 'Software Developer Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: '#0a0a0a', 
        color: '#ffffff', 
        fontFamily: 'system-ui, -apple-system, sans-serif' 
      }}>
        
        {/* CSS for the floating navbar */}
        <style>{`
          .floating-nav {
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 32px;
            padding: 14px 40px;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 100px;
            z-index: 1000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translate(-50%, -20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }

          .nav-brand {
            color: #ffffff;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 700;
            margin-right: 16px;
            letter-spacing: -0.5px;
          }

          .nav-link {
            color: #a3a3a3;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .nav-link:hover {
            color: #ffffff;
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
          }
        `}</style>

        {/* The Navigation Bar */}
        <nav className="floating-nav">
          <Link href="/" className="nav-brand">SP.</Link>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/education" className="nav-link">Education</Link>
          <Link href="/skills" className="nav-link">Skills</Link>
          <Link href="/certifications" className="nav-link">Certifications</Link>
          <Link href="/projects" className="nav-link">Projects</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Page Content */}
        <main style={{ paddingTop: '80px', minHeight: '100vh', overflowX: 'hidden' }}>
          {children}
        </main>

      </body>
    </html>
  );
}