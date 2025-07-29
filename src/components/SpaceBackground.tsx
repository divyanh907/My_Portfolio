import React, { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

const NebulaWavesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const colors = isDark
      ? ["#8ec5fc", "#e0c3fc", "#ff9a9e"]
      : ["#4158D0", "#C850C0", "#FFCC70"];

    // Create glowing particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        d: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: Math.random() - 0.5,
        dy: Math.random() - 0.5,
      });
    }

    let time = 0;
    const animate = () => {
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, isDark ? "#00010d" : "#e0f7fa");
      grad.addColorStop(1, isDark ? "#0c0032" : "#f1f5f9");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Trippy wave pattern
      for (let i = 0; i < canvas.height; i += 10) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        for (let j = 0; j < canvas.width; j += 20) {
          const wave =
            Math.sin(j * 0.01 + time * 0.002 + i * 0.002) * 3 +
            Math.cos(i * 0.02 + time * 0.001) * 2;
          ctx.lineTo(j, i + wave);
        }
        ctx.strokeStyle = `rgba(255,255,255,0.02)`;
        ctx.stroke();
      }

      // Floating particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.globalAlpha = 0.5;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 20;
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx * 0.5;
        p.y += p.dy * 0.5;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      time++;
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default React.memo(NebulaWavesBackground);
