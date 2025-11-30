import React, { useState } from "react";
import styled from "styled-components";
import Preloader from '../home/comp/preloader';
import HeroSection from '../home/comp/herosection';
import ScrollPathSection from '../home/comp/scrollpathsection';
import FocusSection from '../home/comp/focussection';
import ListenSection from "./comp/ListenSection";

export default function Home({ setShowApp }) {
  const [showHome, setShowHome] = useState(false);

  const handlePreloaderComplete = () => {
    setShowHome(true);
    if (setShowApp) setShowApp(true);
  };

  return (
    <>
      {/* SECTION 1: Preloader */}
      {!showHome && <Preloader onComplete={handlePreloaderComplete} />}

      {/* SECTION 2: Main Home Content */}
      <HomeContent $show={showHome}>
        {/* All sections now snap perfectly — no gaps */}
        <HeroSection show={showHome} />
        <ScrollPathSection />
        <FocusSection />
        <ListenSection />
        {/* Add more sections here — they will auto-snap */}
      </HomeContent>
    </>
  );
}

// ONLY THESE CHANGES BELOW — everything else untouched
const HomeContent = styled.div`
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.8s ease-out;

  /* THIS IS THE ONLY NEW PART — makes every section full-screen + snap */
  > * {
    min-height: 100vh;
    min-height: 100dvh;        /* better on mobile */
    scroll-snap-align: start;
  }
`;

// Optional: Remove or keep this — it's not used anymore
// const NextSectionPlaceholder = styled.div`
//   min-height: 100vh;
//   background-color: #F5F2FA;
//   padding: 80px 20px;
// `;