"use client";

import { useEffect, useRef } from "react";

const portraitPath = "/images/WhatsApp%20Image%202026-11-22%20at%205.59.44%20PM.jpeg";

export default function PixelPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1, y: -1, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();
    image.src = portraitPath;
    image.onload = () => {
      let frame = 0;
      const render = () => {
        const bounds = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.floor(bounds.width * window.devicePixelRatio));
        const height = Math.max(1, Math.floor(bounds.height * window.devicePixelRatio));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        const scale = Math.max(width / image.width, height / image.height);
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;
        const offsetX = (width - drawWidth) / 2;
        const offsetY = height - drawHeight;

        context.clearRect(0, 0, width, height);
        context.save();
        context.filter = "grayscale(1) contrast(1.16) brightness(1.08)";
        context.beginPath();
        context.moveTo(width * 0.3, height * 0.44);
        context.lineTo(width * 0.44, height * 0.39);
        context.lineTo(width * 0.61, height * 0.45);
        context.lineTo(width * 0.72, height * 0.68);
        context.lineTo(width * 0.78, height);
        context.lineTo(width * 0.2, height);
        context.lineTo(width * 0.25, height * 0.7);
        context.closePath();
        context.clip();
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        context.restore();

        if (pointer.current.active) {
          const x = pointer.current.x * window.devicePixelRatio;
          const y = pointer.current.y * window.devicePixelRatio;
          const radius = Math.min(width, height) * 0.2;
          const intensity = Math.min(1, 0.38 + Math.abs(Math.sin(frame * 0.045)) * 0.16);
          context.save();
          context.globalCompositeOperation = "screen";
          for (let index = 0; index < 180; index += 1) {
            const angle = index * 2.39996;
            const distance = radius * (0.25 + ((index * 17) % 100) / 100);
            const size = (2 + (index % 5)) * window.devicePixelRatio;
            const particleX = x + Math.cos(angle) * distance;
            const particleY = y + Math.sin(angle) * distance * 0.72;
            const alpha = intensity * (1 - distance / (radius * 1.3));
            if (alpha <= 0) continue;
            context.fillStyle = `rgba(${255 - (index % 3) * 24}, ${205 + (index % 4) * 10}, ${220 + (index % 5) * 7}, ${alpha})`;
            context.fillRect(particleX, particleY, size, size);
          }
          context.restore();
        }
        frame += 1;
        requestAnimationFrame(render);
      };
      render();
    };
  }, []);

  const updatePointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, active: true };
  };

  return (
    <div className="pixel-portrait">
      <canvas ref={canvasRef} onPointerMove={updatePointer} onPointerEnter={updatePointer} onPointerLeave={() => { pointer.current.active = false; }} aria-label="Interactive monochrome portrait of Sayyad Malik" />
      <span className="pixel-portrait__hint">MOVE THROUGH THE IMAGE / DISRUPT THE ARCHIVE</span>
    </div>
  );
}
