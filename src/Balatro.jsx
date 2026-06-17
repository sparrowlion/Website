import { useEffect, useRef } from 'react';

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

export default function Balatro({
  color1 = '#8c8888',
  color2 = '#000000',
  color3 = '#3f4141',
  pixelFilter = 880,
  isRotate = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const c3 = hexToRgb(color3);
    let frame;
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

    const render = (now) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const t = (now - start) / 1000;
      const cx = w / 2;
      const cy = h / 2;
      const step = Math.max(3, Math.round(Math.sqrt((w * h) / pixelFilter) * 0.72));
      const spin = isRotate ? t * 0.26 : 0;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, w, h);

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const nx = (x - cx) / Math.max(w, h);
          const ny = (y - cy) / Math.max(w, h);
          const radius = Math.sqrt(nx * nx + ny * ny);
          const angle = Math.atan2(ny, nx) + spin + radius * 9.5;
          const wave = Math.sin(angle * 3.0 + t * 2.6) + Math.cos((nx - ny) * 26 - t * 1.8);
          const paint = Math.max(0, Math.min(1, 0.5 + wave * 0.22 - radius * 0.9));
          const glow = Math.max(0, 1 - radius * 2.35);
          const r = mix(mix(c2[0], c3[0], paint), c1[0], glow * 0.55);
          const g = mix(mix(c2[1], c3[1], paint), c1[1], glow * 0.55);
          const b = mix(mix(c2[2], c3[2], paint), c1[2], glow * 0.55);
          const alpha = Math.max(0.08, paint * 0.55 + glow * 0.36);

          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fillRect(x, y, step + 0.4, step + 0.4);
        }
      }

      const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.58);
      radial.addColorStop(0, 'rgba(255,255,255,0.16)');
      radial.addColorStop(0.38, 'rgba(177,198,204,0.08)');
      radial.addColorStop(1, 'rgba(0,0,0,0.72)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);

      frame = requestAnimationFrame(render);
    };

    resize();
    frame = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [color1, color2, color3, isRotate, pixelFilter]);

  return <canvas className="balatro-canvas" ref={canvasRef} />;
}
