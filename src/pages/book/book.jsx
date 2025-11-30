// src/pages/consult/book.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DotGrid from './DotGrid';

export default function BookTherapist() {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const therapists = [
    { id: 1, name: "Dr. Maya Sharma", specialty: "Anxiety & Emotional Regulation", rating: 4.9, reviews: 342, available: true },
    { id: 2, name: "Aarav Mehta", specialty: "Teen Depression & Self-Worth", rating: 5.0, reviews: 289, available: true },
    { id: 3, name: "Priya Kapoor", specialty: "Trauma & Inner Child Healing", rating: 4.8, reviews: 412, available: false },
    { id: 4, name: "Rohan Desai", specialty: "LGBTQ+ Affirmative Therapy", rating: 4.9, reviews: 198, available: true },
  ];

  const timeSlots = [
    { time: "Today, 7:00 PM – 8:00 PM IST", available: true },
    { time: "Tomorrow, 10:00 AM – 11:00 AM IST", available: true },
    { time: "Tomorrow, 5:00 PM – 6:00 PM IST", available: false },
  ];

  const handleBook = () => {
    if (!selectedTherapist || !selectedSlot) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedTherapist(null);
      setSelectedSlot(null);
    }, 6000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      
      background: '#0b0017',
      color: '#e0dfff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      scrollSnapAlign: 'start'
    }}>
      {/* INTERACTIVE DOTGRID BACKGROUND */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1
      }}>
        <DotGrid
          dotSize={10}
          gap={28}
          baseColor="#4a1ab3"
          activeColor="#a78bfa"
          proximity={140}
          shockRadius={300}
          shockStrength={7}
          resistance={800}
          returnDuration={1.8}
          speedTrigger={80}
        />
      </div>

      {/* DARK OVERLAY — lets mouse pass through */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 20%, rgba(11, 0, 23, 0.92) 100%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      {/* CONTENT — mouse passes through except interactive parts */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '100px 24px 140px',
        pointerEvents: 'none' // ← Allows DotGrid to receive mouse
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Re-enable pointer events only on actual content */}
          <div style={{ pointerEvents: 'auto' }}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '80px' }}
            >
              <h1 style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.2rem)',
                fontWeight: 700,
                lineHeight: '1.1',
                color: '#ffffff',
                marginBottom: '20px'
              }}>
                Book a Private Session
              </h1>
              <p style={{
                fontSize: '1.25rem',
                opacity: 0.85,
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                Your identity is <strong>100% protected</strong>. No name, no email, no trace. 
                Only you choose to share it.
              </p>
            </motion.div>

            {/* Therapist Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '80px'
            }}>
              {therapists.map((t) => (
                <motion.div
                  key={t.id}
                  whileHover={t.available ? { y: -8 } : {}}
                  onClick={() => t.available && setSelectedTherapist(t)}
                  style={{
                    padding: '28px',
                    borderRadius: '20px',
                    background: selectedTherapist?.id === t.id
                      ? 'rgba(167, 139, 250, 0.18)'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: selectedTherapist?.id === t.id
                      ? '1px solid rgba(167, 139, 250, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    cursor: t.available ? 'pointer' : 'not-allowed',
                    opacity: t.available ? 1 : 0.5,
                    transition: 'all 0.4s ease'
                  }}
                >
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>
                    {t.name}
                  </h3>
                  <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '16px', lineHeight: '1.5' }}>
                    {t.specialty}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', opacity: 0.8 }}>
                    <span>{t.rating} stars ({t.reviews})</span>
                    <span>{t.available ? 'Available' : 'Booked'}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Booking Form */}
            <AnimatePresence>
              {selectedTherapist && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    background: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(167, 139, 250, 0.3)',
                    borderRadius: '24px',
                    padding: '40px',
                    textAlign: 'center'
                  }}
                >
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '12px', color: '#fff' }}>
                    Select Your Preferred Time
                  </h2>
                  <p style={{ opacity: 0.8, marginBottom: '32px', fontSize: '1.05rem' }}>
                    with <strong>{selectedTherapist.name}</strong>
                  </p>

                  <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                    {timeSlots.map((slot, i) => (
                      <motion.button
                        key={i}
                        whileHover={slot.available ? { scale: 1.02 } : {}}
                        whileTap={slot.available ? { scale: 0.98 } : {}}
                        onClick={() => slot.available && setSelectedSlot(slot)}
                        disabled={!slot.available}
                        style={{
                          padding: '18px 24px',
                          borderRadius: '16px',
                          background: selectedSlot?.time === slot.time
                            ? 'rgba(167, 139, 250, 0.25)'
                            : 'rgba(255, 255, 255, 0.05)',
                          border: selectedSlot?.time === slot.time
                            ? '1px solid #a78bfa'
                            : '1px solid rgba(255,255,255,0.1)',
                          color: '#fff',
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          cursor: slot.available ? 'pointer' : 'not-allowed',
                          opacity: slot.available ? 1 : 0.4,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {slot.time}
                        {!slot.available && ' (Taken)'}
                      </motion.button>
                    ))}
                  </div>

                  <div style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '32px',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#d4f8d4'
                  }}>
                    Your identity remains completely anonymous. 
                    No personal details are collected. 
                    The therapist will only see a secure session link.
                  </div>

                  <button
                    onClick={handleBook}
                    disabled={!selectedSlot}
                    style={{
                      width: '100%',
                      padding: '18px',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      background: selectedSlot ? 'linear-gradient(135deg, #a78bfa, #7c3aed)' : 'rgba(100,100,100,0.4)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      cursor: selectedSlot ? 'pointer' : 'not-allowed',
                      transition: 'all 0.4s ease',
                      boxShadow: selectedSlot ? '0 8px 30px rgba(167, 139, 250, 0.4)' : 'none'
                    }}
                  >
                    Confirm Anonymous Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Toast */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  style={{
                    position: 'fixed',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #166534, #22c55e)',
                    color: 'white',
                    padding: '24px 48px',
                    borderRadius: '16px',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    zIndex: 9999,
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(34, 197, 94, 0.4)'
                  }}
                >
                  Session Confirmed
                  <br />
                  <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.9 }}>
                    Check your email for the secure session link
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}