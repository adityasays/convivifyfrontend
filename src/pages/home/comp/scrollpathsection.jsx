
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";

export default function ScrollPathSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  return (
    <SectionContainer ref={ref}>
      <ContentWrapper>
        <TextContent>
          <MainHeading>
            Your Journey <br /> 
            To Healing <br />
            Starts Within
          </MainHeading>
          <SubText>
            Scroll down to follow the path of your mental wellness journey
          </SubText>

          <LinePath
            scrollYProgress={scrollYProgress}
          />
        </TextContent>
      </ContentWrapper>

      <BottomCard>
        <CardTitle>Convivify</CardTitle>
        <CardDetails>
          <DetailGroup>
            <DetailItem>
              <DetailLabel>SUPPORT</DetailLabel>
              <DetailValue>24/7 Available<br />Online & In-person</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>SESSIONS</DetailLabel>
              <DetailValue>Individual<br />Group Therapy</DetailValue>
            </DetailItem>
          </DetailGroup>
          <DetailGroup>
            <DetailItem>
              <DetailLabel>APPROACH</DetailLabel>
              <DetailValue>Evidence-based<br />Compassionate care</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>COMMITMENT</DetailLabel>
              <DetailValue>Your healing<br />Our priority</DetailValue>
            </DetailItem>
          </DetailGroup>
        </CardDetails>
      </BottomCard>
    </SectionContainer>
  );
}

// SVG Path Component
function LinePath({ scrollYProgress }) {
  const pathLength = useTransform(scrollYProgress, [0, 0.70], [0.5, 1]);

  return (
    <SvgWrapper>
      <svg
        width="1278"
        height="2319"
        viewBox="0 0 1278 2319"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
          stroke="#A991D4"
          strokeWidth="20"
          style={{
            pathLength,
            strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
          }}
        />
      </svg>
    </SvgWrapper>
  );
}

// Styled Components
const SectionContainer = styled.section`
  min-height: 270vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  
  padding: 0 5px;
  color: #2D2D2D;
`;

const ContentWrapper = styled.div`
  margin-top: 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-align: center;
  gap: 20px;
`;

const TextContent = styled.div`
  position: relative;
  z-index: 10;
`;

const MainHeading = styled.h1`
  position: relative;
  z-index: 10;
  font-size: 7rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: #6C8076;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const SubText = styled.p`
  position: relative;
  z-index: 10;
  max-width: 600px;
  font-size: 1.25rem;
  font-weight: 500;
  color: #2D2D2D;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SvgWrapper = styled.div`
  position: absolute;
  right: -40%;
  top: 0;
  z-index: 0;
  
  svg {
    width: 100%;
    height: auto;
    overflow: visible;
  }
  
  @media (max-width: 1024px) {
    right: -60%;
  }
  
  @media (max-width: 768px) {
    right: -80%;
    opacity: 0.5;
  }
`;

const BottomCard = styled.div`
  width: 90%;
  transform: translateY(125vh);
  background-color: #A991D4;
  border-radius: 40px;
  padding: 40px 20px;
  color: #F5F2FA;
  z-index: 2;
`;

const CardTitle = styled.h1`
  text-align: center;
  font-size: clamp(80px, 15.5vw, 200px);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.05em;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    font-size: 12vw;
  }
`;
const CardDetails = styled.div`
  display: flex;
  width: 90%;
  max-width: 1200px;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0 1.5rem;
  font-weight: 500;
  margin-top: 5rem;
  transition: all 0.3s ease;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 3rem;
    margin-top: 0;
    padding: 0 2rem;
  }
`;

const DetailGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  
  
  transition: all 0.2s ease;
  
  
 
  
  @media (min-width: 1024px) {
    width: fit-content;
    min-width: 200px;
    justify-content: center;
    border-bottom: none;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.02);
    
    
  }
`;

const DetailItem = styled.div`
  width: fit-content;
  
  @media (max-width: 768px) {
    &:nth-child(2) {
      text-align: right;
    }
  }
  
  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const DetailLabel = styled.p`
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 8px;
`;

const DetailValue = styled.p`
  font-size: 0.875rem;
  line-height: 1.4;
`;