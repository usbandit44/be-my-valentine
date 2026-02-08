import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import "./router-BE2jLHor.js";
import { useState, useEffect, useRef } from "react";
import "@tanstack/react-router";
const Card = ({
  frontContent,
  backContent,
  flipped,
  setFlipped,
  slideOut
}) => {
  const [animateIn, setAnimateIn] = useState(false);
  useEffect(() => {
    setAnimateIn(true);
  }, []);
  const handleFlip = () => setFlipped(!flipped);
  return /* @__PURE__ */ jsx("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `flip-card ${animateIn ? "slide-in" : ""} ${slideOut ? "slide-out" : ""}`,
      onClick: handleFlip,
      children: /* @__PURE__ */ jsxs("div", { className: `flip-card-inner ${flipped ? "flipped" : ""}`, children: [
        /* @__PURE__ */ jsx("div", { className: "flip-card-front", children: frontContent }),
        /* @__PURE__ */ jsx("div", { className: "flip-card-back", children: backContent })
      ] })
    }
  ) });
};
const SOUND_URL = "./public/Hecha Pa' Mí - Grupo Frontera.mp3";
const Fireworks = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const fireworksRef = useRef([]);
  const particlesPerFirework = 100;
  const randomColor = () => `hsl(${Math.random() * 360}, 100%, 50%)`;
  const startFireworks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const fireworks = fireworksRef.current;
    const createFirework = () => {
      const x = Math.random() * width;
      const targetY = Math.random() * height * 0.5 + height * 0.1;
      const color = randomColor();
      fireworks.push({
        x,
        y: height,
        targetY,
        exploded: false,
        particles: [],
        color
      });
    };
    const updateFireworks = () => {
      ctx.clearRect(0, 0, width, height);
      if (Math.random() < 0.03) createFirework();
      fireworks.forEach((fw) => {
        if (!fw.exploded) {
          fw.y -= 8;
          if (fw.y <= fw.targetY) {
            fw.exploded = true;
            for (let i = 0; i < particlesPerFirework; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 6 + 2;
              fw.particles.push({
                x: fw.x,
                y: fw.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: fw.color
              });
            }
          }
        } else {
          fw.particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.alpha -= 0.02;
          });
          fw.particles = fw.particles.filter((p) => p.alpha > 0);
        }
      });
      fireworks.forEach((fw) => {
        if (!fw.exploded) {
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = fw.color;
          ctx.fill();
        } else {
          fw.particles.forEach((p) => {
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          });
          ctx.globalAlpha = 1;
        }
      });
      for (let i = fireworks.length - 1; i >= 0; i--) {
        if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
          fireworks.splice(i, 1);
        }
      }
      animationFrameIdRef.current = requestAnimationFrame(updateFireworks);
    };
    updateFireworks();
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked or failed.");
      });
    }
    startFireworks();
    return () => {
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current);
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { style: { position: "relative", width: "100vw", height: "100vh" }, children: [
    /* @__PURE__ */ jsx(
      "canvas",
      {
        ref: canvasRef,
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          background: "transparent"
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.5
        },
        disabled: true,
        children: /* @__PURE__ */ jsx("h4", { children: "I Love You!" })
      }
    ),
    /* @__PURE__ */ jsx("audio", { ref: audioRef, src: SOUND_URL })
  ] });
};
function App() {
  const quotesArray = ["Will you be my Valentines?", "Wrong Button", "Accidents Happen", "This is not funny", "Yo lock in", "I am going to ask again"];
  const [flipCard, setFlipCard] = useState(false);
  const [quote, setQuote] = useState(0);
  const [slideOut, setSlideOut] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const frontCard = () => {
    return /* @__PURE__ */ jsxs("div", { className: "w-full h-full justify-center items-center flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("img", { className: "w-full h-[65%] object-contain", src: "./public/Remove Background Image.png" }),
      /* @__PURE__ */ jsx("h4", { className: "decoration-black", children: "Click Me!" })
    ] });
  };
  const backCard = () => {
    return /* @__PURE__ */ jsxs("div", { className: "w-full h-full justify-center items-center flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("img", { className: "w-[15%] object-contain absolute top-5 right-5", src: "./public/Cartoon Heart Drawing copy.png" }),
      /* @__PURE__ */ jsx("img", { className: "w-[15%] object-contain absolute top-5 left-5", src: "./public/Cartoon Heart Drawing.png" }),
      /* @__PURE__ */ jsx("h4", { children: quotesArray[quote] })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen w-screen justify-center items-center flex-col", children: [
    /* @__PURE__ */ jsx(Card, { frontContent: frontCard(), backContent: backCard(), flipped: flipCard, setFlipped: setFlipCard, slideOut }),
    flipCard ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("button", { style: {
        marginTop: "20px",
        padding: "10px 20px",
        cursor: "pointer"
      }, onClick: () => {
        setQuote((prevQuote) => {
          const nextIndex = prevQuote + 1;
          return nextIndex >= quotesArray.length ? 0 : nextIndex;
        });
      }, children: /* @__PURE__ */ jsx("h4", { children: "No" }) }),
      /* @__PURE__ */ jsx("button", { style: {
        marginTop: "20px",
        padding: "10px 20px",
        cursor: "pointer"
      }, onClick: () => {
        setFlipCard(!flipCard);
        setSlideOut(true);
        setShowEnding(true);
      }, children: /* @__PURE__ */ jsx("h4", { children: "Yes" }) })
    ] }) : null,
    showEnding ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex justify-center items-center", children: /* @__PURE__ */ jsx("img", { src: "./public/Heart Drawing.png", alt: "Pulsing", className: "w-32 h-32 animate-pulse-custom" }) }),
      /* @__PURE__ */ jsx(Fireworks, {})
    ] }) : null
  ] });
}
export {
  App as component
};
