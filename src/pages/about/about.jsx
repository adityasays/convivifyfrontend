// src/pages/about/about.jsx
import React from 'react';
import PixelBlast from './PixelBlast';

export default function About() {
  return (
    <div style={{
      minHeight: '100vh',
      
      position: 'relative',
      background: '#0a001f',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      scrollSnapAlign: 'start'
    }}>
      {/* FULLSCREEN INTERACTIVE PIXELBLAST BACKGROUND */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1
      }}>
        <PixelBlast
          variant="circle"
          pixelSize={8}
          color="#C77DFF"
          patternScale={3.5}
          patternDensity={1.3}
          pixelSizeJitter={0.6}
          enableRipples={true}
          rippleSpeed={0.5}
          rippleThickness={0.15}
          rippleIntensityScale={2.2}
          liquid={true}
          liquidStrength={0.18}
          liquidRadius={1.4}
          liquidWobbleSpeed={6}
          speed={0.7}
          edgeFade={0.3}
          transparent={true}
        />
      </div>

      {/* DARK PURPLE OVERLAY FOR TEXT READABILITY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, rgba(10, 0, 31, 0.85) 100%)',
        zIndex: 2
      }} />

      {/* CONTENT */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '140px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center'
      }}>
        {/* LEFT - TEXT */}
        <div>
          <h1 style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 900,
            lineHeight: '0.9',
            letterSpacing: '-0.05em',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #E0AAFF 0%, #C77DFF 50%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            We Are<br />Convivify
          </h1>

          <p style={{
            fontSize: '1.5rem',
            lineHeight: '1.8',
            opacity: 0.95,
            marginBottom: '32px',
            maxWidth: '600px'
          }}>
            A mental wellness platform built <strong>by teens, for teens</strong>. We believe healing starts with connection, understanding, and zero judgment.
          </p>

          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.9',
            opacity: 0.8,
            maxWidth: '600px'
          }}>
            In a world that moves too fast, we’re here to slow it down — just for you. Anonymous. Safe. Always open.
          </p>

          <div style={{ marginTop: '60px', display: 'flex', gap: '24px' }}>
            <Stat number="50+" label="Teens Helped" />
            <Stat number="24/7" label="Support Available" />
            <Stat number="100%" label="Anonymous" />
          </div>
        </div>

        {/* RIGHT - FLOATING CARD GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          {[
            { title: "Built by Teens", icon: "Teenager", desc: "We know what you're going through — because we've been there." },
            { title: "No Adults Watching", icon: "Lock", desc: "Your thoughts are yours. No parents. No teachers. No data sold." },
            { title: "Real Tools That Work", icon: "Tools", desc: "Science-backed assessments, mood tracking, and coping strategies." },
            { title: "Community That Gets It", icon: "People", desc: "Connect anonymously with others who truly understand." }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(199, 125, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(199, 125, 255, 0.3)',
                borderRadius: '28px',
                padding: '32px',
                transition: 'all 0.4s ease',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.05)';
                e.currentTarget.style.background = 'rgba(199, 125, 255, 0.25)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'rgba(199, 125, 255, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>
                {item.title}
              </h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '120px 40px 80px'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          marginBottom: '32px'
        }}>
          Ready to heal with us?
        </h2>
        <button style={{
          padding: '20px 60px',
          fontSize: '1.3rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '60px',
          cursor: 'pointer',
          boxShadow: '0 10px 40px rgba(124, 58, 237, 0.5)',
          transition: 'all 0.4s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px) scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
        >
          Join Convivify Today
        </button>
      </div>
    </div>
  );
}

// Reusable stat component
const Stat = ({ number, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{
      fontSize: '3.5rem',
      fontWeight: 900,
      background: 'linear-gradient(135deg, #C77DFF, #7C3AED)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
      {number}
    </div>
    <div style={{ fontSize: '1rem', opacity: 0.8, marginTop: '8px' }}>{label}</div>
  </div>
);