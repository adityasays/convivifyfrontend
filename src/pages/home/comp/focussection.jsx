import React, { useEffect, useRef, useCallback, useMemo , useState} from 'react';
import { gsap } from 'gsap';

// TargetCursor Component
const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef(null);
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);

  const isMobile = useMemo(() => {
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    let activeTarget = null;
    let currentLeaveHandler = null;
    let resumeTimeout = null;

    const cleanupTarget = target => {
      if (currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };

    createSpinTimeline();

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }

      const strength = activeStrengthRef.current;
      if (strength === 0) return;

      const cursorX = gsap.getProperty(cursorRef.current, 'x');
      const cursorY = gsap.getProperty(cursorRef.current, 'y');

      const corners = Array.from(cornersRef.current);
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, 'x');
        const currentY = gsap.getProperty(corner, 'y');

        const targetX = targetCornerPositionsRef.current[i].x - cursorX;
        const targetY = targetCornerPositionsRef.current[i].y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto'
        });
      });
    };

    tickerFnRef.current = tickerFn;

    const moveHandler = e => moveCursor(e.clientX, e.clientY);
    window.addEventListener('mousemove', moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      const mouseX = gsap.getProperty(cursorRef.current, 'x');
      const mouseY = gsap.getProperty(cursorRef.current, 'y');
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
      if (!isStillOverTarget) {
        if (currentLeaveHandler) {
          currentLeaveHandler();
        }
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    const enterHandler = e => {
      const directTarget = e.target;
      const allTargets = [];
      let current = directTarget;
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement;
      }
      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || !cornersRef.current) return;
      if (activeTarget === target) return;
      if (activeTarget) {
        cleanupTarget(activeTarget);
      }
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;
      const corners = Array.from(cornersRef.current);
      corners.forEach(corner => gsap.killTweensOf(corner));

      gsap.killTweensOf(cursorRef.current, 'rotation');
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      const rect = target.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;
      const cursorX = gsap.getProperty(cursorRef.current, 'x');
      const cursorY = gsap.getProperty(cursorRef.current, 'y');

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
        { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
      ];

      isActiveRef.current = true;
      gsap.ticker.add(tickerFnRef.current);

      gsap.to(activeStrengthRef, {
        current: 1,
        duration: hoverDuration,
        ease: 'power2.out'
      });

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current[i].x - cursorX,
          y: targetCornerPositionsRef.current[i].y - cursorY,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      const leaveHandler = () => {
        gsap.ticker.remove(tickerFnRef.current);

        isActiveRef.current = false;
        targetCornerPositionsRef.current = null;
        gsap.set(activeStrengthRef, { current: 0, overwrite: true });
        activeTarget = null;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);
          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
          ];
          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: 'power3.out'
              },
              0
            );
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(cursorRef.current, 'rotation');
            const normalizedRotation = currentRotation % 360;
            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: 'none',
              onComplete: () => {
                spinTl.current?.restart();
              }
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener('mouseleave', leaveHandler);
    };

    window.addEventListener('mouseover', enterHandler, { passive: true });

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }

      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;

      isActiveRef.current = false;
      targetCornerPositionsRef.current = null;
      activeStrengthRef.current = 0;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

  useEffect(() => {
    if (isMobile || !cursorRef.current || !spinTl.current) return;
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    }
  }, [spinDuration, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div ref={cursorRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      pointerEvents: 'none',
      zIndex: 9999,
      mixBlendMode: 'difference',
      transform: 'translate(-50%, -50%)'
    }}>
      <div ref={dotRef} style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '4px',
        height: '4px',
        background: '#fff',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform'
      }} />
      <div className="target-cursor-corner" style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '12px',
        height: '12px',
        border: '3px solid #fff',
        willChange: 'transform',
        transform: 'translate(-150%, -150%)',
        borderRight: 'none',
        borderBottom: 'none'
      }} />
      <div className="target-cursor-corner" style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '12px',
        height: '12px',
        border: '3px solid #fff',
        willChange: 'transform',
        transform: 'translate(50%, -150%)',
        borderLeft: 'none',
        borderBottom: 'none'
      }} />
      <div className="target-cursor-corner" style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '12px',
        height: '12px',
        border: '3px solid #fff',
        willChange: 'transform',
        transform: 'translate(50%, 50%)',
        borderLeft: 'none',
        borderTop: 'none'
      }} />
      <div className="target-cursor-corner" style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '12px',
        height: '12px',
        border: '3px solid #fff',
        willChange: 'transform',
        transform: 'translate(-150%, 50%)',
        borderRight: 'none',
        borderTop: 'none'
      }} />
    </div>
  );
};

// Main Focus Section Component
export default function FocusSection() {
  const sectionRef = useRef(null);
const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.15 } // cursor appears when 15% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div ref={sectionRef} style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #ffffff 0%, #E8E3F3 100%)',
      padding: '120px 20px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {isSectionVisible && (
        <TargetCursor 
          targetSelector=".focus-cursor-target"
          spinDuration={2.5}
          hideDefaultCursor={false}
          parallaxOn={true}
        />
      )}
      
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 24px',
            background: 'rgba(124, 58, 237, 0.1)',
            borderRadius: '50px',
            marginBottom: '24px',
            border: '1px solid rgba(124, 58, 237, 0.2)'
          }}>
            <span style={{
              color: '#7C3AED',
              fontSize: '0.9rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>How We Help You</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: '800',
            color: '#2D1B4E',
            marginBottom: '24px',
            letterSpacing: '-0.03em',
            lineHeight: '1.1'
          }}>
            Find Your <span className="focus-cursor-target" style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer',
              position: 'relative',
              display: 'inline-block'
            }}>Focus</span>
          </h2>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: '#5B4A6F',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontWeight: '400'
          }}>
            Your mind deserves clarity. We provide a safe, anonymous space designed specifically for teens to discover mental peace and build lasting focus.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginTop: '64px',
          padding: '0 20px'
        }}>
          {/* Card 1 */}
          <div className="focus-cursor-target" style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%)',
            borderRadius: '24px',
            padding: '48px 36px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 20px 60px rgba(124, 58, 237, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(124, 58, 237, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2) inset';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(124, 58, 237, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{
              fontSize: '3.5rem',
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))'
            }}>🎯</div>
            
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}>Targeted Support</h3>
            
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.7',
              fontSize: '1.05rem',
              fontWeight: '400'
            }}>
              Personalized mental health strategies tailored to your unique journey. Get the precise support you need, when you need it.
            </p>

            <div style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'inline-block'
            }}>
              <span style={{
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>Learn More →</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="focus-cursor-target" style={{
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.95) 0%, rgba(219, 39, 119, 0.95) 100%)',
            borderRadius: '24px',
            padding: '48px 36px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 20px 60px rgba(236, 72, 153, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(236, 72, 153, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2) inset';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(236, 72, 153, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{
              fontSize: '3.5rem',
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))'
            }}>📋</div>
            
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}>Health Assessments</h3>
            
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.7',
              fontSize: '1.05rem',
              fontWeight: '400'
            }}>
              Interactive quizzes designed to help you understand your mental health better. Get insights that matter, completely free.
            </p>

            <div style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'inline-block'
            }}>
              <span style={{
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>Take Quiz →</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="focus-cursor-target" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)',
            borderRadius: '24px',
            padding: '48px 36px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2) inset';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{
              fontSize: '3.5rem',
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))'
            }}>🔒</div>
            
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}>100% Anonymous</h3>
            
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.7',
              fontSize: '1.05rem',
              fontWeight: '400'
            }}>
              Your privacy is sacred. Share your thoughts and feelings in a completely anonymous, judgment-free environment.
            </p>

            <div style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'inline-block'
            }}>
              <span style={{
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>Stay Safe →</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="focus-cursor-target" style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95) 0%, rgba(217, 119, 6, 0.95) 100%)',
            borderRadius: '24px',
            padding: '48px 36px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 20px 60px rgba(245, 158, 11, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(245, 158, 11, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2) inset';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(245, 158, 11, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{
              fontSize: '3.5rem',
              marginBottom: '24px',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))'
            }}>🌟</div>
            
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}>Dedicated to Teens</h3>
            
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.7',
              fontSize: '1.05rem',
              fontWeight: '400'
            }}>
              Built specifically for teenagers facing modern challenges. We understand you, your struggles, and your generation.
            </p>

            <div style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'inline-block'
            }}>
              <span style={{
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>Join Us →</span>
            </div>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '80px'
        }}>
          <button className="focus-cursor-target" style={{
            padding: '20px 56px',
            fontSize: '1.15rem',
            fontWeight: '700',
            color: '#fff',
            background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            border: 'none',
            borderRadius: '60px',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(124, 58, 237, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(124, 58, 237, 0.4)';
          }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Start Your Journey Today</span>
          </button>
          
          <p style={{
            marginTop: '20px',
            color: '#7C3AED',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}>
            No credit card required • Free forever • Anonymous
          </p>
        </div>
      </div>
    </div>
  );
}