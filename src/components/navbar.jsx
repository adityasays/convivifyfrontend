import React, { useState } from "react";
import styled from "styled-components";

function NavBar() {
  const [activeLink, setActiveLink] = useState("home");

  return (
    <NavContainer>
      <NavWrapper>
        <Logo onClick={() => setActiveLink("home")}>
          Convivify
        </Logo>
        
        <NavLinks>
          <NavLink
            $active={activeLink === "home"}
            onClick={() => setActiveLink("home")}
          >
            Home
          </NavLink>
          <NavLink
            $active={activeLink === "about"}
            onClick={() => setActiveLink("about")}
          >
            About
          </NavLink>
          <NavLink
            $active={activeLink === "consult"}
            onClick={() => setActiveLink("consult")}
          >
            Consult
          </NavLink>
          <NavLink
            $active={activeLink === "contact"}
            onClick={() => setActiveLink("contact")}
          >
            Contact
          </NavLink>
          <NavLink
            $active={activeLink === "assessment"}
            onClick={() => setActiveLink("assessment")}
          >
            Assessment
          </NavLink>
        </NavLinks>

        <CTAButton>Book Now</CTAButton>
      </NavWrapper>
    </NavContainer>
  );
}

export default NavBar;

const NavContainer = styled.nav`
  position: fixed;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 85%;
  max-width: 950px;
  display: flex;
  justify-content: center;
  
  @media (max-width: 1024px) {
    width: 92%;
    max-width: 850px;
  }
  
  @media (max-width: 768px) {
    top: 12px;
    width: 95%;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 28px;
  background: rgba(252, 252, 252, 0.50);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  border-radius: 40px;
  border: 1px solid rgba(169, 145, 212, 0.18);
  box-shadow: 0 4px 24px rgba(169, 145, 212, 0.12),
              0 2px 8px rgba(136, 201, 185, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.9);
  width: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 6px 32px rgba(169, 145, 212, 0.18),
                0 4px 12px rgba(136, 201, 185, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 1);
    border-color: rgba(169, 145, 212, 0.25);
    background: rgba(252, 252, 252, 0.75);
  }

  @media (max-width: 768px) {
    padding: 9px 18px;
    border-radius: 28px;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #A991D4;
  letter-spacing: -0.3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: pointer;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #88C9B9, #A991D4);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 2px;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    transform: translateY(-1px);
    color: #9780c4;
    filter: drop-shadow(0 0 12px rgba(169, 145, 212, 0.35));
  }

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 2px;
  }
`;

const NavLink = styled.div`
  padding: 7px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$active ? '#A991D4' : '#4A4A4A'};
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  cursor: pointer;
  letter-spacing: -0.2px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, rgba(169, 145, 212, 0.12), rgba(136, 201, 185, 0.08))' 
    : 'transparent'};

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    padding: 1px;
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, rgba(169, 145, 212, 0.5), rgba(136, 201, 185, 0.4))' 
      : 'linear-gradient(135deg, rgba(169, 145, 212, 0), rgba(136, 201, 185, 0))'};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: ${props => props.$active ? 1 : 0};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: radial-gradient(circle at center, rgba(169, 145, 212, 0.15), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: #A991D4;
    background: linear-gradient(135deg, rgba(169, 145, 212, 0.1), rgba(136, 201, 185, 0.06));
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(169, 145, 212, 0.15);
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 1024px) {
    padding: 6px 13px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

const CTAButton = styled.button`
  padding: 8px 22px;
  font-size: 14px;
  font-weight: 600;
  color: #FCFCFC;
  background: linear-gradient(135deg, #A991D4 0%, #9780c4 100%);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 12px rgba(169, 145, 212, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  letter-spacing: -0.1px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.25) 50%, 
      transparent);
    transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(136, 201, 185, 0.3), rgba(169, 145, 212, 0.3));
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    left: 100%;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(169, 145, 212, 0.35),
                0 3px 10px rgba(136, 201, 185, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
    background: linear-gradient(135deg, #9780c4 0%, #A991D4 100%);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 7px 18px;
    font-size: 13px;
  }
`;