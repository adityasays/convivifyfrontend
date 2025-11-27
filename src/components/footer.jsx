import { useState, useEffect } from 'react';

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const styles = {
    footer: {
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    orbContainer: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    orb1: {
      position: 'absolute',
      width: '280px',
      height: '280px',
      borderRadius: '50%',
      opacity: 0.15,
      filter: 'blur(60px)',
      background: 'radial-gradient(circle, #d3d3ff 0%, transparent 70%)',
      top: '15%',
      left: '8%',
      animation: 'floatOrb 8s ease-in-out infinite',
    },
    orb2: {
      position: 'absolute',
      width: '240px',
      height: '240px',
      borderRadius: '50%',
      opacity: 0.12,
      filter: 'blur(50px)',
      background: 'radial-gradient(circle, #d3d3ff 0%, transparent 70%)',
      bottom: '10%',
      right: '12%',
      animation: 'floatOrbReverse 10s ease-in-out infinite',
    },
    orb3: {
      position: 'absolute',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      opacity: 0.08,
      filter: 'blur(40px)',
      background: 'radial-gradient(circle, #d3d3ff 0%, transparent 70%)',
      top: '50%',
      left: '50%',
      transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
      transition: 'transform 0.3s ease-out',
    },
    gradientLine: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(to right, transparent, rgba(211, 211, 255, 0.3), transparent)',
      opacity: 0.6,
    },
    container: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 32px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '40px',
      alignItems: 'start',
    },
    brandSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    brandLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
      width: 'fit-content',
    },
    logoWrapper: {
      position: 'relative',
    },
    logoGlow: {
      position: 'absolute',
      inset: 0,
      background: '#d3d3ff',
      borderRadius: '10px',
      filter: 'blur(12px)',
      opacity: 0.4,
      transition: 'opacity 0.3s',
    },
    logo: {
      position: 'relative',
      background: 'linear-gradient(135deg, #d3d3ff 0%, #a8a8ff 100%)',
      padding: '8px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s',
    },
    logoIcon: {
      width: '20px',
      height: '20px',
      color: '#1a1a2e',
    },
    brandName: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#d3d3ff',
      letterSpacing: '-0.01em',
    },
    brandDescription: {
      color: 'rgba(211, 211, 255, 0.7)',
      lineHeight: '1.5',
      maxWidth: '380px',
      fontSize: '14px',
    },
    socialLinks: {
      display: 'flex',
      gap: '10px',
    },
    socialLink: {
      position: 'relative',
      padding: '8px',
      borderRadius: '8px',
      background: 'rgba(211, 211, 255, 0.05)',
      border: '1px solid rgba(211, 211, 255, 0.15)',
      transition: 'all 0.3s',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(211, 211, 255, 0.1)',
      borderRadius: '8px',
      opacity: 0,
      transition: 'opacity 0.3s',
    },
    socialIcon: {
      position: 'relative',
      width: '18px',
      height: '18px',
      color: 'rgba(211, 211, 255, 0.7)',
      transition: 'color 0.3s',
    },
    navGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '32px',
    },
    navColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    navTitle: {
      fontSize: '11px',
      fontWeight: '600',
      color: '#d3d3ff',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      opacity: 0.9,
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    navLink: {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'rgba(211, 211, 255, 0.6)',
      textDecoration: 'none',
      transition: 'color 0.3s',
      position: 'relative',
      fontSize: '14px',
    },
    navDot: {
      width: 0,
      height: '5px',
      background: '#d3d3ff',
      borderRadius: '50%',
      marginRight: 0,
      transition: 'all 0.3s',
    },
    bottomBar: {
      marginTop: '48px',
      paddingTop: '24px',
      borderTop: '1px solid rgba(211, 211, 255, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
    },
    copyright: {
      color: 'rgba(211, 211, 255, 0.5)',
      fontSize: '13px',
    },
    bottomLinks: {
      display: 'flex',
      gap: '20px',
      fontSize: '13px',
    },
    bottomLink: {
      color: 'rgba(211, 211, 255, 0.5)',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(8px); }
        }
        @keyframes floatOrbReverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(15px) translateX(-8px); }
        }
        .brand-link:hover .logo-glow { opacity: 0.6; }
        .brand-link:hover .logo { transform: scale(1.05); }
        .social-link:hover { 
          border-color: rgba(211, 211, 255, 0.3);
          background: rgba(211, 211, 255, 0.08);
        }
        .social-link:hover .social-overlay { opacity: 1; }
        .social-link:hover .social-icon { color: #d3d3ff; }
        .nav-link:hover { color: #d3d3ff; }
        .nav-link:hover .nav-dot { width: 5px; margin-right: 6px; }
        .bottom-link:hover { color: #d3d3ff; }
        @media (min-width: 640px) {
          .bottom-bar { flex-direction: row; justify-content: space-between; }
        }
        @media (min-width: 1024px) {
          .grid { grid-template-columns: 2fr 3fr; gap: 56px; }
        }
      `}} />
      
      <footer style={styles.footer}>
        {/* Animated Background Orbs */}
        <div style={styles.orbContainer}>
          <div style={styles.orb1} />
          <div style={styles.orb2} />
          <div style={styles.orb3} />
        </div>

        {/* Gradient Line */}
        <div style={styles.gradientLine} />

        <div style={styles.container}>
          <div style={styles.grid} className="grid">
            {/* Brand Section */}
            <div style={styles.brandSection}>
              <a href="#" style={styles.brandLink} className="brand-link">
                <div style={styles.logoWrapper}>
                  <div style={styles.logoGlow} className="logo-glow" />
                  <div style={styles.logo} className="logo">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      style={styles.logoIcon}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </div>
                <span style={styles.brandName}>Convivify</span>
              </a>
              
              <p style={styles.brandDescription}>
                A safe space for teens to explore mental wellness through personalized support, assessments, and caring conversations.
              </p>

              {/* Social Links */}
              <div style={styles.socialLinks}>
                {[
                  { icon: "M19.633 7.997c.013.176.013.353.013.53 0 5.387-4.099 11.605-11.604 11.605A11.561 11.561 0 010 18.29c.373.044.734.074 1.12.074a8.189 8.189 0 005.065-1.737 4.102 4.102 0 01-3.834-2.85c.25.04.5.065.765.065.37 0 .734-.049 1.08-.147A4.092 4.092 0 01.8 8.582v-.05a4.119 4.119 0 001.853.522A4.099 4.099 0 01.812 5.847c0-.02 0-.042.002-.062a11.653 11.653 0 008.457 4.287A4.62 4.62 0 0122 5.924a8.215 8.215 0 002.018-.559 4.108 4.108 0 01-1.803 2.268 8.233 8.233 0 002.368-.648 8.897 8.897 0 01-2.062 2.112z", label: "Twitter" },
                  { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", label: "Instagram" },
                  { icon: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z", label: "Discord" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    aria-label={social.label}
                    style={styles.socialLink}
                    className="social-link"
                  >
                    <div style={styles.socialOverlay} className="social-overlay" />
                    <svg style={styles.socialIcon} className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <nav style={styles.navGrid}>
              {[
                { title: "Platform", links: ["Health Quiz", "AI Chatbot", "Book Sessions"] },
                { title: "Company", links: ["About Us", "Contact", "Privacy"] },
                { title: "Resources", links: ["Blog", "Support", "Crisis Help"] },
              ].map((column, idx) => (
                <div key={idx} style={styles.navColumn}>
                  <h3 style={styles.navTitle}>{column.title}</h3>
                  <ul style={styles.navList}>
                    {column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a href="#" style={styles.navLink} className="nav-link">
                          <span style={styles.navDot} className="nav-dot" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Bar */}
          <div style={styles.bottomBar} className="bottom-bar">
            <p style={styles.copyright}>
              &copy; 2025 Convivify. Supporting teen mental wellness.
            </p>
            <div style={styles.bottomLinks}>
              <a href="#" style={styles.bottomLink} className="bottom-link">Terms</a>
              <a href="#" style={styles.bottomLink} className="bottom-link">Privacy</a>
              <a href="#" style={styles.bottomLink} className="bottom-link">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}