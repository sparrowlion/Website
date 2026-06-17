import { useCallback, useRef } from 'react';

export default function BorderGlow({
  children,
  className = '',
  glowColor = '40 80 80',
  backgroundColor = 'rgba(255,255,255,0.03)',
  borderRadius = 8,
  colors = ['#e6ddee', '#9fc7d2', '#f0c77a'],
}) {
  const ref = useRef(null);

  const move = useCallback((event) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const edgeX = Math.abs(dx) / cx;
    const edgeY = Math.abs(dy) / cy;
    const edge = Math.min(1, Math.max(edgeX, edgeY));
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    card.style.setProperty('--edge-proximity', `${edge}`);
    card.style.setProperty('--cursor-angle', `${angle}deg`);
    card.style.setProperty('--cursor-x', `${x}px`);
    card.style.setProperty('--cursor-y', `${y}px`);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => ref.current?.style.setProperty('--edge-proximity', '0')}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--border-radius': `${borderRadius}px`,
        '--glow-color': glowColor,
        '--gradient-one': colors[0],
        '--gradient-two': colors[1],
        '--gradient-three': colors[2],
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
