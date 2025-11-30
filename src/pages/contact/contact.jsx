import React from 'react';
import Aurora from './Aurora';

export default function Contact() {
  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      position: 'relative',
      background: '#000',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
      color: 'white',
      scrollSnapAlign: 'start'
    }}>
      {/* FULLSCREEN AURORA BACKGROUND */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1
      }}>
        <Aurora
          colorStops={["#5E17EB", "#FF6B6B", "#4ECDC4"]}
          amplitude={1.3}
          blend={0.6}
          speed={0.4}
        />
      </div>

      {/* DARK OVERLAY OVERLAY FOR READABILITY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
        zIndex: 2
      }} />

      {/* CONTENT */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '140px 32px 100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Heading */}
        <h1 style={{
          fontSize: 'clamp(3.5rem, 10vw, 7rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: '1',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #f472b6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Get in Touch
        </h1>

        <p style={{
          fontSize: '1.5rem',
          maxWidth: '700px',
          opacity: 0.9,
          lineHeight: '1.7',
          marginBottom: '60px'
        }}>
          Have a question? Want to collaborate? Or just say hi? We’d love to hear from you.
        </p>

        {/* Contact Form */}
        <form style={{
          width: '100%',
          maxWidth: '600px',
          display: 'grid',
          gap: '24px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </div>

          <Input placeholder="Email Address" type="email" />
          <Input placeholder="Subject" />

          <textarea
            placeholder="Your Message"
            rows={8}
            style={{
              padding: '20px 24px',
              fontSize: '1.1rem',
              borderRadius: '20px',
              border: 'none',
              outline: 'none',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              color: 'white',
              resize: 'none',
              '::placeholder': { color: 'rgba(255,255,255,0.6)' }
            }}
          />

          <button
            type="submit"
            style={{
              padding: '20px 48px',
              fontSize: '1.2rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '60px',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: '0 10px 30px rgba(124, 58, 237, 0.4)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(124, 58, 237, 0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 58, 237, 0.4)';
            }}
          >
            Send Message
          </button>
        </form>

        {/* Social Links */}
        <div style={{
          marginTop: '100px',
          display: 'flex',
          gap: '32px',
          fontSize: '1.5rem'
        }}>
          {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map(social => (
            <a
              key={social}
              href="#"
              style={{
                color: 'rgba(255,255,255,0.7)',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            >
              {social === 'Twitter' && 'Twitter'}
              {social === 'Instagram' && 'Instagram'}
              {social === 'LinkedIn' && 'LinkedIn'}
              {social === 'GitHub' && 'GitHub'}
            </a>
          ))}
        </div>

        <p style={{
          marginTop: '40px',
          opacity: 0.6,
          fontSize: '1rem'
        }}>
          © 2025 Convivify. Made with love & auroras.
        </p>
      </div>
    </div>
  );
}

// Reusable glassy input
const Input = ({ placeholder, type = 'text' }) => (
  <input
    type={type}
    placeholder={placeholder}
    style={{
      padding: '20px 24px',
      fontSize: '1.1rem',
      borderRadius: '16px',
      border: 'none',
      outline: 'none',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(12px)',
      color: 'white',
      '::placeholder': { color: 'rgba(255,255,255,0.6)' }
    }}
  />
);