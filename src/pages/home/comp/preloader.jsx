
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gsap, Expo } from "gsap";

export default function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(0);

  // Progress counter animation
  useEffect(() => {
    const count = setInterval(() => {
      setCounter((counter) =>
        counter < 100
          ? counter + 1
          : (clearInterval(count), setCounter(100), reveal())
      );
    }, 25);
  }, []);

  // GSAP reveal animation sequence
  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    t1.to(".follow", {
      width: "100%",
      ease: Expo.easeInOut,
      duration: 1.5,
      delay: 0.5,
    })      
      .to(".hide", { opacity: 0, duration: 0.3 })
      .to(".hide", { display: "none", duration: 0.1 })
      .to(".follow", {
        height: "100%",
        ease: Expo.easeInOut,
        duration: 0.6,
        delay: 0.3,
      })
      .to(".content", { width: "100%", ease: Expo.easeInOut, duration: 0.2 })
      .to(".title-lines", { display: "block", duration: 0.1 })
      .to(".title-lines", {
        opacity: 1,
        stagger: 0.15,
        ease: Expo.easeInOut,
        duration: 0.2,
      })
      .to({}, { duration: 0.8 })
      .to(".title-lines", {
        opacity: 0,
        stagger: 0.1,
        ease: Expo.easeInOut,
        duration: 0.1,
      })
      .to(".content", {
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 0.5,
      })
      .to(".loading", {
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 0.5,
      }, "-=0.5")
      .set(".loading", { display: "none" })
      .set(".content", { display: "none" });
  };

  return (
    <>
      {/* Progress bar with counter */}
      <Loading className="loading">
        <Follow className="follow"></Follow>
        <ProgressBar
          className="hide"
          style={{ width: counter + "%" }}
        ></ProgressBar>
        <Count className="hide">{counter}%</Count>
      </Loading>

      {/* Inspirational messages */}
      <Content className="content">
        <TitleLine className="title-lines">Take a deep breath.</TitleLine>
        <TitleLine className="title-lines">You are not alone.</TitleLine>
        <TitleLine className="title-lines">Your mental health matters.</TitleLine>
        <TitleLine className="title-lines">Let's begin your journey.</TitleLine>
      </Content>
    </>
  );
}

// Styled Components for Preloader
const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #F5F2FA;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
`;

const Follow = styled.div`
  position: absolute;
  background-color: #A991D4;
  height: 2px;
  width: 0;
  left: 0;
  z-index: 2;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  background-color: #88C9B9;
  height: 2px;
  width: 0;
  transition: 0.4s ease-out;
`;

const Count = styled.p`
  position: absolute;
  font-size: 130px;
  color: #A991D4;
  transform: translateY(-15px);
  font-weight: 500;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const Content = styled.div`
  height: 100vh;
  width: 0;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #F5F2FA;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  color: #A991D4;
`;

const TitleLine = styled.p`
  text-align: center;
  font-size: 54px;
  opacity: 0;
  display: none;
  font-weight: 500;
  margin: 15px 0;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;