import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

// CrowdCanvas Component (your animated canvas – unchanged except for src path)
const CrowdCanvas = ({ src, rows = 15, cols = 7 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
    };

    // UTILS
    const randomRange = (min, max) => min + Math.random() * (max - min);
    const randomIndex = (array) => randomRange(0, array.length) | 0;
    const removeFromArray = (array, i) => array.splice(i, 1)[0];
    const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX;
      let endX;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0,
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
        },
        0,
      );

      return tl;
    };

    const walks = [normalWalk];

    // PEEP CLASS
    class Peep {
      constructor({ image, rect }) {
        this.image = image;
        this.setRect(rect);

        this.x = 0;
        this.y = 0;
        this.anchorY = 0;
        this.scaleX = 1;
        this.walk = null;
      }

      setRect(rect) {
        this.rect = rect;
        this.width = rect[2];
        this.height = rect[3];
        this.drawArgs = [this.image, ...rect, 0, 0, this.width, this.height];
      }

      render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, 1);
        ctx.drawImage(...this.drawArgs);
        ctx.restore();
      }
    }

    // MAIN
    const img = new Image();
    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps = [];
    const availablePeeps = [];
    const crowd = [];

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          new Peep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          }),
        );
      }
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => {
        peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', bottom: 0, width: '100%', height: '90vh' }} />;
};

// Main Listen Section Component
export default function ListenSection() {
  return (
    <div style={{
    
      background: 'linear-gradient(180deg, #ffffff 0%, #E8E3F3 100%)', 
    
      position: 'relative',
      display: 'flex',
      paddingTop : '10em' ,
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        zIndex: 10 // Above canvas
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
          }}>Our Promise</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: '800',
          color: '#2D1B4E',
          marginBottom: '24px',
          letterSpacing: '-0.03em',
          lineHeight: '1.1'
        }}>
          We Listen to You in the Crowd
        </h2>

        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          color: '#5B4A6F',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.8',
          fontWeight: '400'
        }}>
          In a world full of noise, your voice stands out. We're here to hear your story, provide support, and guide you through it all.
        </p>
      </div>

      {/* The animated canvas */}
      <CrowdCanvas src="/images/peeps/open-peeps-sheet.png" rows={15} cols={7} />
    </div>
  );
}