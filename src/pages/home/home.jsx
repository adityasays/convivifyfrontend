
import React, { useState } from "react";
import styled from "styled-components";
import Preloader from '../home/comp/preloader';
import HeroSection from '../home/comp/herosection';
import ScrollPathSection from '../home/comp/scrollpathsection';

export default function Home({ setShowApp }) {
  const [showHome, setShowHome] = useState(false);

  const handlePreloaderComplete = () => {
    setShowHome(true);
    if (setShowApp) setShowApp(true);
  };

  return (
    <>
      {/* SECTION 1: Preloader - Shows first, then animates away */}
      {!showHome && <Preloader onComplete={handlePreloaderComplete} />}

      {/* SECTION 2: Main Home Content */}
      <HomeContent $show={showHome}>
        {/* Hero Section - Full screen with iridescence background */}
        <HeroSection show={showHome} />
        
        {/* SECTION 3: Scroll Path Animation Section */}
        <ScrollPathSection />
        
        {/* SECTION 4: Additional Content - Add your sections below */}
        <NextSectionPlaceholder>
          {/* 
            Add your next sections here:
            - Services section
            - Testimonials
            - Contact form
            etc.
          */}
        </NextSectionPlaceholder>
      </HomeContent>
    </>
  );
}

// Styled Components
const HomeContent = styled.div`
  min-height: 100vh;
  background-color: #F5F2FA;
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.8s ease-out;
`;

const NextSectionPlaceholder = styled.div`
  min-height: 100vh;
  background-color: #F5F2FA;
  padding: 80px 20px;
`;