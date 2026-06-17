import { useEffect, useRef } from 'react';

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const value = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function mixColor(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

export default function MagicRings({
  color = '#e6ddee',
  colorTwo = '#0c0c0e',
  ringCount = 7,
  speed = 1,
  lineThickness = 2,
  baseRadius = 0.25,
  radiusStep = 0.1,
  scaleRate = 0.1,
  opacity = 1,
  rotation = 0,
  followMouse = true,
  mouseInfluence = 0.18,
  parallax = 0.05,
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    const primary = hexToRgb(color);
    const secondary = hexToRgb(colorTwo);
    let frameId;
    let start = performance.now();

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (event.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const leave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    const drawNoise = (w, h, time) => {
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = `rgba(255,255,255,${0.018 + Math.sin(time) * 0.004})`;
      for (let i = 0; i < 160; i += 1) {
        const x = (Math.sin(i * 91.7 + time * 0.8) * 0.5 + 0.5) * w;
        const y = (Math.cos(i * 53.2 + time * 0.6) * 0.5 + 0.5) * h;
        ctx.fillRect(x, y, 1, 1);
      }
    };

    const render = (now) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const time = ((now - start) / 1000) * speed;
      const min = Math.min(w, h);

      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.06;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      const cx = w * 0.5 + (followMouse ? smoothRef.current.x * min * mouseInfluence : 0);
      const cy = h * 0.5 + (followMouse ? smoothRef.current.y * min * mouseInfluence : 0);
      const angle = (rotation * Math.PI) / 180 + Math.sin(time * 0.18) * 0.08;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < ringCount; i += 1) {
        const t = (time + i * 0.42) % 3.45;
        const fadeIn = Math.min(1, t / 0.7);
        const fadeOut = 1 - Math.max(0, (t - 2.1) / 1.1);
        const alpha = Math.max(0, Math.min(fadeIn, fadeOut)) * opacity;
        const radius = min * (baseRadius + i * radiusStep + (t / 3.45) * scaleRate);
        const c = mixColor(primary, secondary, i / Math.max(1, ringCount - 1));
        const px = (smoothRef.current.x + smoothRef.current.y) * min * parallax * i;

        ctx.save();
        ctx.translate(px, -px * 0.45);
        ctx.lineWidth = lineThickness + i * 0.16;
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${0.22 * alpha})`;
        ctx.shadowColor = `rgba(${c.r},${c.g},${c.b},${0.42 * alpha})`;
        ctx.shadowBlur = 18 + i * 3;
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * (1.28 + i * 0.018), radius * (0.48 + i * 0.01), 0, Math.PI * 0.08, Math.PI * (1.82 - i * 0.045));
        ctx.stroke();

        ctx.lineWidth = Math.max(0.6, lineThickness * 0.55);
        ctx.strokeStyle = `rgba(255,255,255,${0.18 * alpha})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.26, radius * 0.47, 0, Math.PI * 1.08, Math.PI * 1.5);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
      drawNoise(w, h, time);
      frameId = requestAnimationFrame(render);
    };

    resize();
    frameId = requestAnimationFrame(render);
    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('pointermove', move, { passive: true });
    canvas.parentElement.addEventListener('pointerleave', leave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('pointermove', move);
      canvas.parentElement?.removeEventListener('pointerleave', leave);
    };
  }, [baseRadius, color, colorTwo, followMouse, lineThickness, mouseInfluence, opacity, parallax, radiusStep, ringCount, rotation, scaleRate, speed]);

  return <canvas className="magic-rings-canvas" ref={canvasRef} />;
}
