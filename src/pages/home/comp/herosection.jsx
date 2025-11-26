import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Iridescence from './iridescence';
import BlurText from './blurtect';

export default function HeroSection({ show }) {
  const [startAnimation, setStartAnimation] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // Wait for preloader to finish, then start text animation
      setTimeout(() => setStartAnimation(true), 800);
      // Delay button appearance until after text animation
      setTimeout(() => setButtonVisible(true), 3500);
    }
  }, [show]);

  return (
    <HeroContainer>
      {/* Background - Animated gradient (NOW INTERACTIVE!) */}
      <IridescenceWrapper>
        <Iridescence
          color={[0.66, 0.57, 0.83]} // Purple tone
          mouseReact={true} // Changed to true for interaction
          amplitude={0.1}
          speed={0.8}
        />
      </IridescenceWrapper>

      {/* Main Content - Title, subtitle, button */}
      <ContentOverlay>
        {startAnimation && (
          <>
            <TitleWrapper>
              <BlurText
                text="Your mind deserves care"
                delay={120}
                animateBy="words"
                direction="top"
                stepDuration={0.4}
                className="hero-title"
              />
            </TitleWrapper>
            
            <SubtitleWrapper>
              <BlurText
                text="Compassionate support for your mental wellness journey"
                delay={80}
                animateBy="words"
                direction="top"
                stepDuration={0.4}
                className="hero-subtitle"
              />
            </SubtitleWrapper>
          </>
        )}
        
        <CTAButton $visible={buttonVisible}>Begin Your Journey</CTAButton>
      </ContentOverlay>

      {/* Scroll Indicator - Bottom arrow */}
      <ScrollIndicator $visible={buttonVisible}>
        <span>Scroll to explore</span>
        <ArrowDown>↓</ArrowDown>
      </ScrollIndicator>
    </HeroContainer>
  );
}

// Styled Components for HeroSection
const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IridescenceWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 30px;
  pointer-events: none; /* Allow mouse events to pass through to background */
  
  /* Re-enable pointer events only for interactive elements */
  button {
    pointer-events: auto;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 24px;
  
  .hero-title {
    font-size: 72px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    letter-spacing: -1px;
    margin: 0;
    transform: translateZ(0); /* Hardware acceleration */
    -webkit-font-smoothing: antialiased;
    
    @media (max-width: 768px) {
      font-size: 42px;
    }
  }
`;

const SubtitleWrapper = styled.div`
  margin-bottom: 48px;
  display: flex;
  justify-content: center;
  
  .hero-subtitle {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.95);
    max-width: 700px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-weight: 400;
    margin: 0;
    transform: translateZ(0); /* Hardware acceleration */
    -webkit-font-smoothing: antialiased;
    
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
`;

const CTAButton = styled.button`
  padding: 20px 50px;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #A991D4;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  opacity: ${props => props.$visible ? 1 : 0};
  transform: ${props => props.$visible ? 'translateY(0)' : 'translateY(20px)'};
  
  &:hover {
    background-color: #ffffff;
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 1.2s ease-out;
  pointer-events: none; /* Allow mouse events to pass through */
  
  span {
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ArrowDown = styled.div`
  font-size: 24px;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;